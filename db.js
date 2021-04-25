class DB {
  db = {};

  findId(id) {
    return this.db[id];
  }

  findIdOrCreate(id, user) {
    const value = this.db[id];
    if (value) {
      return value;
    }
    this.db[id] = user;
    return user;
  }
}

export default new DB();
