import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import messageService from '../services/api/messageService';
import projectService from '../services/api/projectService';

const Messages = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMessage, setNewMessage] = useState({ title: '', content: '' });

  useEffect(() => {
    loadProject();
    loadMessages();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const result = await projectService.getById(projectId);
      setProject(result);
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await messageService.getAll();
      const projectMessages = result.filter(msg => msg.projectId === projectId);
      setMessages(projectMessages);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.title.trim() || !newMessage.content.trim()) return;

    try {
      const created = await messageService.create({
        ...newMessage,
        projectId,
        author: 'John Doe',
        replies: []
      });
      setMessages([created, ...messages]);
      setNewMessage({ title: '', content: '' });
      setShowCreateForm(false);
      toast.success('Message posted successfully!');
    } catch (err) {
      toast.error('Failed to post message');
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
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load messages</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMessages}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (messages.length === 0 && !showCreateForm) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Message Board
          </h1>
          <p className="text-gray-600">
            {project ? `Discuss and collaborate on ${project.name}` : 'Loading project...'}
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
            <ApperIcon name="MessageSquare" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No messages yet</h3>
          <p className="mt-2 text-gray-500">Start the conversation by posting the first message</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            Post Message
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
            Message Board
          </h1>
          <p className="text-gray-600">
            {project ? `Discuss and collaborate on ${project.name}` : 'Loading project...'}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span>New Message</span>
        </motion.button>
      </div>

      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Post New Message</h3>
          <form onSubmit={handleCreateMessage} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Message title"
                value={newMessage.title}
                onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Write your message..."
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                rows={6}
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
                Post Message
              </motion.button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {message.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{message.author}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 break-words">
                  {message.title}
                </h3>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                
                {message.replies && message.replies.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">
                      {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-4">
                  <button className="text-gray-500 hover:text-primary transition-colors duration-200 flex items-center space-x-1">
                    <ApperIcon name="MessageCircle" size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                  <button className="text-gray-500 hover:text-accent transition-colors duration-200 flex items-center space-x-1">
                    <ApperIcon name="Heart" size={16} />
                    <span className="text-sm">Like</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messages;