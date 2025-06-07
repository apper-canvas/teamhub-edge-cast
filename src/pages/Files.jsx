import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import fileService from '../services/api/fileService';
import projectService from '../services/api/projectService';

const Files = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProject();
    loadFiles();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const result = await projectService.getById(projectId);
      setProject(result);
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  };

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fileService.getAll();
      const projectFiles = result.filter(file => file.projectId === projectId);
      setFiles(projectFiles);
    } catch (err) {
      setError(err.message || 'Failed to load files');
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const fileData = {
          name: file.name,
          size: file.size,
          projectId,
          uploadedBy: 'John Doe',
          url: URL.createObjectURL(file) // Mock URL for demo
        };
        
        const created = await fileService.create(fileData);
        setFiles(prev => [created, ...prev]);
      }
      
      toast.success(`${fileList.length} file(s) uploaded successfully!`);
    } catch (err) {
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'doc':
      case 'docx':
        return 'FileText';
      case 'xls':
      case 'xlsx':
        return 'Sheet';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'Image';
      case 'mp4':
      case 'mov':
        return 'Video';
      case 'zip':
      case 'rar':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load files</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadFiles}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Files & Documents
        </h1>
        <p className="text-gray-600">
          {project ? `Share documents and resources for ${project.name}` : 'Loading project...'}
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-8 ${
          dragOver 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <motion.div
          animate={uploading ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: uploading ? Infinity : 0, duration: 1 }}
        >
          <ApperIcon 
            name={uploading ? "Loader" : "Upload"} 
            className={`w-12 h-12 mx-auto mb-4 text-gray-400 ${uploading ? 'animate-spin' : ''}`} 
          />
        </motion.div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {uploading ? 'Uploading files...' : 'Upload files'}
        </h3>
        
        <p className="text-gray-600 mb-4">
          Drag files here or click to browse
        </p>
        
        <input
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        
        <label
          htmlFor="file-upload"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-purple-700 transition-colors duration-200 inline-block"
        >
          Choose Files
        </label>
      </div>

      {files.length === 0 && !uploading ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="FolderOpen" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No files uploaded yet</h3>
          <p className="mt-2 text-gray-500">Upload your first file to get started</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 cursor-pointer border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <ApperIcon name={getFileIcon(file.name)} size={20} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate break-words" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded by {file.uploadedBy}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-primary transition-colors duration-200">
                    <ApperIcon name="Download" size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-primary transition-colors duration-200">
                    <ApperIcon name="Share" size={16} />
                  </button>
                </div>
                
                <ApperIcon name="MoreHorizontal" size={16} className="text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Files;