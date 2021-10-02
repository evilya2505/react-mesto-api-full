const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// --- Описание схем карточки ---
// Получение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// Создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      }
    })
    .catch(next);
};

// Удаление карточки
const deleteCard = (req, res, next) => {
  const { _id } = req.user;

  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с данным id не найдена.'))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Нет прав для удаления карточки.');
      }

      Card.findByIdAndDelete(req.params.cardId)
        .then((data) => {
          res.send({ data });
        });
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Добавление лайка
const putLike = (req, res, next) => {
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Удаление лайка
const removeLike = (req, res, next) => {
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы неккоректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
