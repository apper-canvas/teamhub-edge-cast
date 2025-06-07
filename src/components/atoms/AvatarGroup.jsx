import React from 'react';

const AvatarGroup = ({ className, count = 3, remaining = 2 }) => {
    return (
        <div className={`flex -space-x-2 ${className}`}>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"
                />
            ))}
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+{remaining}</span>
            </div>
        </div>
    );
};

export default AvatarGroup;