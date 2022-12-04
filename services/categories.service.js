const boom = require('@hapi/boom');

class CategoriesServices {
  constructor() {
    this.categories = [
      { id: '1', name: 'clothes' },
      { id: '2', name: 'snickers' },
    ];
  }

  create(data) {
    const lastIndex = this.categories.length - 1;
    const lastId = (+this.categories[lastIndex].id + 1).toString();

    const newCategory = {
      id: lastId,
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  update(id, changes) {
    let index = this.categories.findIndex((item) => item.id === id);
    let category = this.categories.find((item) => item.id === id);

    this.categories[index] = {
      ...category,
      ...changes,
    };

    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('category not found');
    }

    const delCategory = this.categories.splice(index, 1);

    return delCategory;
  }
}

module.exports = CategoriesServices;
