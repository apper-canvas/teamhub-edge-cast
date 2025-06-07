import messageData from '../mockData/messages.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageService {
  constructor() {
    this.data = [...messageData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const message = this.data.find(m => m.id === id);
    if (!message) {
      throw new Error('Message not found');
    }
    return { ...message };
  }

  async create(messageData) {
    await delay(400);
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      createdAt: new Date().toISOString()
    };
    this.data.unshift(newMessage);
    return { ...newMessage };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.data.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updates
    };
    
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    const deleted = this.data.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new MessageService();