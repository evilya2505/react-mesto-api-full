const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const notFoundError = new NotFoundError('Запрашиваемый ресурс не найден.');

router.all('*', (req, res) => {
  Promise.reject(notFoundError)
    .catch((error) => res.status(error.statusCode).send({ message: `${error.name}: ${error.message}` }));
});

module.exports = router;
