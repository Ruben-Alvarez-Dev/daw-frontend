class Table {
  constructor(id, name, capacity, status = 'free') {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.status = status;
  }

  isAvailable() {
    return this.status === 'free';
  }

  schedule() {
    this.status = 'scheduled';
  }

  free() {
    this.status = 'free';
  }

  static fromAPI(data) {
    return new Table(data.id, data.name, data.capacity, data.status);
  }

  toAPI() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      status: this.status
    };
  }
}

export default Table;
