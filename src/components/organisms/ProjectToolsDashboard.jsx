import React from 'react';
import { useNavigate } => 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectToolCard from '@/components/molecules/ProjectToolCard';

const projectTools = [
    {
        id: 'messages',
        name: 'Message Board',
        description: 'Discuss project updates and collaborate',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-blue-600',
        path: 'messages'
    },
    {
        id: 'todos',
        name: 'To-dos',
        description: 'Track tasks and assignments',
        icon: 'CheckSquare',
        color: 'from-secondary to-green-600',
        path: 'todos'
    },
    {
        id: 'schedule',
        name: 'Schedule',
        description: 'View deadlines and milestones',
        icon: 'Calendar',
        color: 'from-purple-500 to-purple-600',
        path: 'schedule'
    },
    {
        id: 'files',
        name: 'Files & Docs',
        description: 'Share documents and resources',
        icon: 'FolderOpen',
        color: 'from-orange-500 to-orange-600',
        path: 'files'
    },
    {
        id: 'checkin',
        name: 'Check-in',
        description: 'Regular team updates',
        icon: 'Users',
        color: 'from-teal-500 to-teal-600',
        path: 'checkin'
    },
    {
        id: 'activity',
        name: 'Activity',
        description: 'See what everyone is working on',
        icon: 'Activity',
        color: 'from-accent to-red-600',
        path: 'activity'
    }
];

const ProjectToolsDashboard = ({ projectId, projectName }) => {
    const navigate = useNavigate();

    const handleToolClick = (tool) => {
        navigate(`/projects/${projectId}/${tool.path}`);
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                    {projectName || 'Project Dashboard'}
                </h1>
                <p className="text-gray-600">Choose a tool to get started with your project</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectTools.map((tool, index) => (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ProjectToolCard
                            tool={tool}
                            onClick={() => handleToolClick(tool)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectToolsDashboard;