class Reservation {
  constructor(id, userId, tableIds = [], date, time, status = 'pending', paxNumber) {
    this.id = id;
    this.userId = userId;
    this.tableIds = tableIds;
    this.date = date;
    this.time = time;
    this.status = status; // pending, confirmed, cancelled
    this.paxNumber = paxNumber;
  }

  addTable(tableId) {
    if (!this.tableIds.includes(tableId)) {
      this.tableIds.push(tableId);
    }
  }

  removeTable(tableId) {
    this.tableIds = this.tableIds.filter(id => id !== tableId);
  }

  confirm() {
    this.status = 'confirmed';
  }

  cancel() {
    this.status = 'cancelled';
  }

  isPending() {
    return this.status === 'pending';
  }

  isConfirmed() {
    return this.status === 'confirmed';
  }

  isCancelled() {
    return this.status === 'cancelled';
  }

  static fromAPI(data) {
    return new Reservation(
      data.id,
      data.user_id,
      data.table_ids,
      data.date,
      data.time,
      data.status,
      data.pax_number
    );
  }

  toAPI() {
    return {
      id: this.id,
      user_id: this.userId,
      table_ids: this.tableIds,
      date: this.date,
      time: this.time,
      status: this.status,
      pax_number: this.paxNumber
    };
  }
}

export default Reservation;
