const express = require('express');
const faker = require('faker');

const CategoriesServices = require('./../services/categories.service');
const router = express.Router();
const services = require('./../services/categories.service');

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/categories.schema');

const categoriesAll = new CategoriesServices();

router.get('/', (req, res) => {
  res.json(categoriesAll.find());
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), (req, res) => {
  const { id } = req.params;

  const category = categoriesAll.findOne(id);
  res.status(200).json(category);
});

router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body;
  const newCategory = categoriesAll.create(body);
  res.status(201).json({
    message: 'created',
    newCategory,
  });
});

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const updated = categoriesAll.update(id, body);
    res.status(200).json({
      message: 'updated',
      updated,
    });
  }
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleted = categoriesAll.delete(id);
  res.json({
    message: 'deleted',
    deleted,
  });
});

module.exports = router;
