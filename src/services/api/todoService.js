import todoData from '../mockData/todos.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TodoService {
  constructor() {
    this.data = [...todoData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const todo = this.data.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return { ...todo };
  }

  async create(todoData) {
    await delay(400);
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      createdAt: new Date().toISOString()
    };
    this.data.push(newTodo);
    return { ...newTodo };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.data.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updates
    };
    
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    const deleted = this.data.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new TodoService();