class Restaurant {
  constructor(id, name, address, openingHours, tables = []) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.openingHours = openingHours;
    this.tables = tables;
  }

  addTable(table) {
    this.tables.push(table);
  }

  removeTable(tableId) {
    this.tables = this.tables.filter(table => table.id !== tableId);
  }

  getAvailableTables() {
    return this.tables.filter(table => table.isAvailable());
  }

  getTableById(tableId) {
    return this.tables.find(table => table.id === tableId);
  }

  isOpen(date) {
    // TODO: Implementar lógica de horario
    return true;
  }

  static fromAPI(data) {
    return new Restaurant(
      data.id,
      data.name,
      data.address,
      data.opening_hours,
      data.tables
    );
  }

  toAPI() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      opening_hours: this.openingHours,
      tables: this.tables.map(table => table.toAPI())
    };
  }
}

export default Restaurant;
