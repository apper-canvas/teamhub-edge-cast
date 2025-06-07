import todoListData from '../mockData/todoLists.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TodoListService {
  constructor() {
    this.data = [...todoListData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const todoList = this.data.find(tl => tl.id === id);
    if (!todoList) {
      throw new Error('Todo list not found');
    }
    return { ...todoList };
  }

  async create(todoListData) {
    await delay(400);
    const newTodoList = {
      id: Date.now().toString(),
      ...todoListData,
      createdAt: new Date().toISOString()
    };
    this.data.push(newTodoList);
    return { ...newTodoList };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.data.findIndex(tl => tl.id === id);
    if (index === -1) {
      throw new Error('Todo list not found');
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updates
    };
    
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(tl => tl.id === id);
    if (index === -1) {
      throw new Error('Todo list not found');
    }
    
    const deleted = this.data.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new TodoListService();