class User {
  constructor(id, name, email, phone, role = 'customer') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role; // customer, staff, admin
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isStaff() {
    return this.role === 'staff' || this.isAdmin();
  }

  canManageReservations() {
    return this.isStaff();
  }

  canManageTables() {
    return this.isStaff();
  }

  static fromAPI(data) {
    return new User(
      data.id,
      data.name,
      data.email,
      data.phone,
      data.role
    );
  }

  toAPI() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role
    };
  }
}

export default User;
