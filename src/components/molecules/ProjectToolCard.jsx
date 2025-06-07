import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import IconBox from '@/components/atoms/IconBox';
import AvatarGroup from '@/components/atoms/AvatarGroup';

const ProjectToolCard = ({ tool, onClick, className }) => {
    const { name, description, icon, color } = tool;
    
    return (
        <div onClick={onClick} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden ${className}`}>
            <div className="p-6">
                <IconBox
                    iconName={icon}
                    iconSize={24}
                    iconClassName="text-white"
                    backgroundClassName={`w-14 h-14 bg-gradient-to-br ${color} mb-4`}
                />
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <AvatarGroup />
                    <ApperIcon name="ArrowRight" size={16} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default ProjectToolCard;