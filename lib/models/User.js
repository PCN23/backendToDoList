module.exports = class User {
  #passwordHash;
  constructor(row) {
    this.id = row.id;
    this.firstName = row.firstName;
    this.lastName = row.lastName;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }
    
    
};
