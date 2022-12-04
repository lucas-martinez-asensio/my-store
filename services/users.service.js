const faker = require('faker');
const boom = require('@hapi/boom');

class UsersServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 200;

    for (let i = 0; i < limit; i++) {
      const idNum = i + 1;

      this.users.push({
        id: idNum.toString(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        avatar: faker.image.cats(),
      });
    }
  }

  create(data) {
    const lastIndex = this.users.length - 1;
    const lastId = (+this.users[lastIndex].id + 1).toString();

    const newUser = {
      id: lastId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    let user = this.users[index];

    if (index === -1) {
      throw new Error('product not found');
    }

    this.users[index] = {
      ...user,
      ...changes,
    };

    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('product not found');
    }

    const delUser = this.users.splice(index, 1);

    return delUser;
  }
}

module.exports = UsersServices;
