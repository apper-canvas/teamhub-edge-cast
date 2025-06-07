import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Users" size={32} className="text-white" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Welcome to TeamHub
        </h1>
        
        <p className="text-gray-600 mb-8">
          A simple, focused project management tool that helps teams stay organized without the complexity.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;