import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const IconBox = ({ iconName, iconSize, iconClassName, backgroundClassName }) => {
    return (
        <div className={`flex items-center justify-center rounded-xl ${backgroundClassName}`}>
            <ApperIcon name={iconName} size={iconSize} className={iconClassName} />
        </div>
    );
};

export default IconBox;