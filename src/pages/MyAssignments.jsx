import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import todoService from '../services/api/todoService';

const MyAssignments = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMyTodos();
  }, []);

  const loadMyTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await todoService.getAll();
      // Filter todos assigned to current user
      const myTodos = result.filter(todo => todo.assignee === 'John Doe');
      setTodos(myTodos);
    } catch (err) {
      setError(err.message || 'Failed to load assignments');
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const todo = todos.find(t => t.id === todoId);
      const updated = await todoService.update(todoId, {
        completed: !todo.completed,
        completedAt: !todo.completed ? new Date().toISOString() : null
      });
      
      setTodos(todos.map(t => t.id === todoId ? updated : t));
      toast.success(updated.completed ? 'Task completed!' : 'Task reopened');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="animate-pulse flex items-center space-x-4">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load assignments</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMyTodos}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="CheckSquare" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No assignments yet</h3>
          <p className="mt-2 text-gray-500">Your assigned tasks will appear here</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Assignments</h1>
        <p className="text-gray-600">Track your tasks and stay on top of deadlines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Pending ({pendingTodos.length})
            </h2>
          </div>
          
          <div className="space-y-3">
            {pendingTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="mt-1 w-5 h-5 border-2 border-gray-300 rounded hover:border-secondary transition-colors duration-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium break-words">{todo.title}</p>
                  {todo.dueDate && (
                    <p className="text-sm text-gray-500">
                      Due {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            
            {pendingTodos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="CheckCircle" className="w-8 h-8 mx-auto mb-2" />
                <p>All caught up! 🎉</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Completed ({completedTodos.length})
            </h2>
          </div>
          
          <div className="space-y-3">
            {completedTodos.slice(0, 10).map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="mt-1 w-5 h-5 bg-secondary rounded flex items-center justify-center"
                >
                  <ApperIcon name="Check" size={14} className="text-white" />
                </motion.button>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 line-through break-words">{todo.title}</p>
                  {todo.completedAt && (
                    <p className="text-sm text-gray-400">
                      Completed {new Date(todo.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            
            {completedTodos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="Clock" className="w-8 h-8 mx-auto mb-2" />
                <p>No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssignments;