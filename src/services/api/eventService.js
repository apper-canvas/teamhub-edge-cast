import eventData from '../mockData/events.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EventService {
  constructor() {
    this.data = [...eventData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const event = this.data.find(e => e.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    return { ...event };
  }

  async create(eventData) {
    await delay(400);
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date().toISOString()
    };
    this.data.push(newEvent);
    return { ...newEvent };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updates
    };
    
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    const deleted = this.data.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new EventService();