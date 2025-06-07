import React from 'react';
import IconBox from '@/components/atoms/IconBox';

const WelcomeMessage = ({ title, description, iconName, iconSize, iconClassName, iconBackgroundClassName }) => {
    return (
        <div className="text-center">
            <IconBox
                iconName={iconName}
                iconSize={iconSize}
                iconClassName={iconClassName}
                backgroundClassName={`w-16 h-16 mx-auto mb-6 ${iconBackgroundClassName}`}
            />
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                {title}
            </h1>
            <p className="text-gray-600 mb-8">
                {description}
            </p>
        </div>
    );
};

export default WelcomeMessage;