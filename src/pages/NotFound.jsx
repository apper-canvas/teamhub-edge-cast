import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-gray-500" />
        </motion.div>
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          Go to Projects
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;