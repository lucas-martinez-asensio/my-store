const express = require('express');
const router = express.Router();

const UsersServices = require('./../services/users.service');
const service = new UsersServices();

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/users.schema');

router.get('/', (req, res) => {
  res.status(200).json(service.find());
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), (req, res) => {
  const { id } = req.params;

  const user = service.findOne(id);
  res.status(200).json(user);
});

router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body;

  const newUser = service.create(body);
  res.status(201).json({
    message: 'created',
    data: newUser,
  });
});

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const update = service.update(id, body);
    res.status(200).json({
      message: 'updated',
      update,
    });
  }
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleted = service.delete(id);
  res.json({
    message: 'deleted',
    deleted,
  });
});

module.exports = router;
