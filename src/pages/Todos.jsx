import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import todoService from '../services/api/todoService';
import todoListService from '../services/api/todoListService';
import projectService from '../services/api/projectService';

const Todos = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [todoLists, setTodoLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [showCreateTodoForm, setShowCreateTodoForm] = useState(null);
  const [newList, setNewList] = useState({ name: '' });
  const [newTodo, setNewTodo] = useState({ title: '', assignee: '', dueDate: '' });

  useEffect(() => {
    loadProject();
    loadTodoLists();
    loadTodos();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const result = await projectService.getById(projectId);
      setProject(result);
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  };

  const loadTodoLists = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await todoListService.getAll();
      const projectLists = result.filter(list => list.projectId === projectId);
      setTodoLists(projectLists);
    } catch (err) {
      setError(err.message || 'Failed to load todo lists');
      toast.error('Failed to load todo lists');
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async () => {
    try {
      const result = await todoService.getAll();
      const projectTodos = result.filter(todo => todo.projectId === projectId);
      setTodos(projectTodos);
    } catch (err) {
      console.error('Failed to load todos:', err);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newList.name.trim()) return;

    try {
      const created = await todoListService.create({
        ...newList,
        projectId,
        todos: []
      });
      setTodoLists([...todoLists, created]);
      setNewList({ name: '' });
      setShowCreateListForm(false);
      toast.success('Todo list created successfully!');
    } catch (err) {
      toast.error('Failed to create todo list');
    }
  };

  const handleCreateTodo = async (e, listId) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const created = await todoService.create({
        ...newTodo,
        projectId,
        listId,
        completed: false,
        assignee: newTodo.assignee || 'Unassigned'
      });
      setTodos([...todos, created]);
      setNewTodo({ title: '', assignee: '', dueDate: '' });
      setShowCreateTodoForm(null);
      toast.success('Todo created successfully!');
    } catch (err) {
      toast.error('Failed to create todo');
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

  const getTodosForList = (listId) => {
    return todos.filter(todo => todo.listId === listId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded"></div>
                  ))}
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load todos</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadTodoLists}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (todoLists.length === 0 && !showCreateListForm) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            To-dos
          </h1>
          <p className="text-gray-600">
            {project ? `Track tasks and assignments for ${project.name}` : 'Loading project...'}
          </p>
        </div>

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
          <h3 className="mt-4 text-lg font-medium text-gray-900">No todo lists yet</h3>
          <p className="mt-2 text-gray-500">Create your first todo list to start tracking tasks</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateListForm(true)}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            Create Todo List
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            To-dos
          </h1>
          <p className="text-gray-600">
            {project ? `Track tasks and assignments for ${project.name}` : 'Loading project...'}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateListForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span>New List</span>
        </motion.button>
      </div>

      {showCreateListForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Todo List</h3>
          <form onSubmit={handleCreateList} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="List name"
                value={newList.name}
                onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium"
              >
                Create List
              </motion.button>
              <button
                type="button"
                onClick={() => setShowCreateListForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {todoLists.map((list, index) => {
          const listTodos = getTodosForList(list.id);
          const completedCount = listTodos.filter(todo => todo.completed).length;
          const completionRate = listTodos.length > 0 ? (completedCount / listTodos.length) * 100 : 0;

          return (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold text-gray-900 break-words">
                  {list.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <div
                      className="w-6 h-6 rounded-full bg-secondary"
                      style={{
                        background: `conic-gradient(#34C759 ${completionRate * 3.6}deg, #e5e7eb 0deg)`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {completedCount}/{listTodos.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {listTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleTodo(todo.id)}
                      className={`mt-1 w-5 h-5 border-2 rounded transition-all duration-200 ${
                        todo.completed
                          ? 'bg-secondary border-secondary'
                          : 'border-gray-300 hover:border-secondary'
                      }`}
                    >
                      {todo.completed && (
                        <ApperIcon name="Check" size={14} className="text-white" />
                      )}
                    </motion.button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium break-words ${
                        todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {todo.title}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{todo.assignee}</span>
                        {todo.dueDate && (
                          <span>Due {new Date(todo.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {showCreateTodoForm === list.id ? (
                <form onSubmit={(e) => handleCreateTodo(e, list.id)} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Todo title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Assignee"
                      value={newTodo.assignee}
                      onChange={(e) => setNewTodo({ ...newTodo, assignee: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-3 py-1 rounded text-sm font-medium"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateTodoForm(null)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowCreateTodoForm(list.id)}
                  className="w-full text-left text-gray-500 hover:text-primary transition-colors duration-200 flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <ApperIcon name="Plus" size={16} />
                  <span>Add todo</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Todos;