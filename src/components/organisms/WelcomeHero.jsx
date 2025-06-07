import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WelcomeMessage from '@/components/molecules/WelcomeMessage';
import Button from '@/components/atoms/Button';

const WelcomeHero = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/projects');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
        >
            <WelcomeMessage
                title="Welcome to TeamHub"
                description="A simple, focused project management tool that helps teams stay organized without the complexity."
                iconName="Users"
                iconSize={32}
                iconClassName="text-white"
                iconBackgroundClassName="bg-primary"
            />
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={handleGetStarted}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
                >
                    Get Started
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeHero;