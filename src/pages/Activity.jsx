import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, isToday, isYesterday } from 'date-fns';
import ApperIcon from '../components/ApperIcon';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate loading recent activities
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockActivities = [
        {
          id: '1',
          type: 'todo_completed',
          actor: 'John Doe',
          target: 'Update project timeline',
          project: 'Website Redesign',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'message_posted',
          actor: 'Sarah Chen',
          target: 'New design mockups ready',
          project: 'Website Redesign',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'file_uploaded',
          actor: 'Mike Johnson',
          target: 'Brand Guidelines.pdf',
          project: 'Marketing Campaign',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          type: 'project_created',
          actor: 'Emily Davis',
          target: 'Q1 Planning',
          project: 'Q1 Planning',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '5',
          type: 'todo_assigned',
          actor: 'Tom Wilson',
          target: 'Review budget proposal',
          project: 'Q1 Planning',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setActivities(mockActivities);
    } catch (err) {
      setError(err.message || 'Failed to load activity');
      toast.error('Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'todo_completed':
        return { name: 'CheckCircle', color: 'text-secondary' };
      case 'todo_assigned':
        return { name: 'UserPlus', color: 'text-primary' };
      case 'message_posted':
        return { name: 'MessageSquare', color: 'text-blue-500' };
      case 'file_uploaded':
        return { name: 'Upload', color: 'text-orange-500' };
      case 'project_created':
        return { name: 'FolderPlus', color: 'text-purple-500' };
      default:
        return { name: 'Activity', color: 'text-gray-500' };
    }
  };

  const getActivityMessage = (activity) => {
    switch (activity.type) {
      case 'todo_completed':
        return `completed "${activity.target}"`;
      case 'todo_assigned':
        return `assigned "${activity.target}"`;
      case 'message_posted':
        return `posted "${activity.target}"`;
      case 'file_uploaded':
        return `uploaded ${activity.target}`;
      case 'project_created':
        return `created project "${activity.target}"`;
      default:
        return activity.target;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
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
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="animate-pulse flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load activity</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadActivities}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
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
            <ApperIcon name="Activity" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No activity yet</h3>
          <p className="mt-2 text-gray-500">Team activity will appear here as things happen</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Activity</h1>
        <p className="text-gray-600">See what everyone is working on across all projects</p>
      </div>

      <div className="max-w-3xl">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const icon = getActivityIcon(activity.type);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${icon.color}`}>
                    <ApperIcon name={icon.name} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-900 break-words">
                          <span className="font-medium">{activity.actor}</span>{' '}
                          {getActivityMessage(activity)}{' '}
                          <span className="text-primary font-medium">in {activity.project}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatTimestamp(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;