import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Activity,
  Users,
  Clock,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const MainFeature = ({ projectId, projectName }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock recent activity data
    setRecentActivity([
      {
        id: 1,
        type: 'message',
        user: 'Sarah Chen',
        action: 'posted a message in',
        target: 'General Discussion',
        time: '2 hours ago',
        avatar: 'SC'
      },
      {
        id: 2,
        type: 'todo',
        user: 'Mike Johnson',
        action: 'completed task',
        target: 'Review wireframes',
        time: '4 hours ago',
        avatar: 'MJ'
      },
      {
        id: 3,
        type: 'file',
        user: 'Lisa Park',
        action: 'uploaded file',
        target: 'design-mockups.zip',
        time: '6 hours ago',
        avatar: 'LP'
      }
    ]);
  }, [projectId]);

  const tools = [
    {
      id: 'messages',
      name: 'Message Board',
      description: 'Discuss ideas and share updates',
      icon: MessageSquare,
      color: 'bg-blue-500',
      count: 12,
      countLabel: 'new messages'
    },
    {
      id: 'todos',
      name: 'To-dos',
      description: 'Track tasks and deadlines',
      icon: CheckSquare,
      color: 'bg-green-500',
      count: 8,
      countLabel: 'pending tasks'
    },
    {
      id: 'schedule',
      name: 'Schedule',
      description: 'Important dates and milestones',
      icon: Calendar,
      color: 'bg-purple-500',
      count: 3,
      countLabel: 'upcoming events'
    },
    {
      id: 'files',
      name: 'Files & Documents',
      description: 'Share and organize project files',
      icon: FileText,
      color: 'bg-orange-500',
      count: 24,
      countLabel: 'files shared'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'todo': return CheckSquare;
      case 'file': return FileText;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{projectName}</h1>
                <p className="mt-1 text-gray-500">Project Dashboard</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {['SC', 'MJ', 'LP', 'AB'].map((initials, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                  <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 border-2 border-white hover:bg-gray-300 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tools Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveSection(tool.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`${tool.color} p-3 rounded-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                          <p className="text-sm text-blue-600 mt-2 font-medium">
                            {tool.count} {tool.countLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-gray-500">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-gray-500">Files Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-500">Team Members</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <div className="flex items-center mt-1">
                          <IconComponent className="w-3 h-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activity
              </button>
            </div>

            {/* Team Members */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Team</h3>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Sarah Chen', role: 'Project Manager', avatar: 'SC', online: true },
                  { name: 'Mike Johnson', role: 'Developer', avatar: 'MJ', online: true },
                  { name: 'Lisa Park', role: 'Designer', avatar: 'LP', online: false },
                  { name: 'Alex Brown', role: 'Developer', avatar: 'AB', online: false }
                ].map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {member.avatar}
                      </div>
                      {member.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;