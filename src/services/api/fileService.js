import fileData from '../mockData/files.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FileService {
  constructor() {
    this.data = [...fileData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const file = this.data.find(f => f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    return { ...file };
  }

  async create(fileData) {
    await delay(400);
    const newFile = {
      id: Date.now().toString(),
      ...fileData,
      uploadedAt: new Date().toISOString()
    };
    this.data.unshift(newFile);
    return { ...newFile };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.data.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('File not found');
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updates
    };
    
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('File not found');
    }
    
    const deleted = this.data.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new FileService();