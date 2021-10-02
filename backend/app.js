require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://evilya.nomoredomains.club',
  'https://api.evilya.nomoredomains.club',
  'http://localhost:3000/',
  'http://evilya.nomoredomains.club',
  'http://api.evilya.nomoredomains.club',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Создание приложения
const app = express();

app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

// Подключение логгера запросов
app.use(requestLogger);

// Регистрация и логин
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), login);

// Авторизация
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// Подключение логгера ошибок
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { name, statusCode = 500, message } = err;

  res.status(statusCode).send({ message: `${name}: ${message}` });
});

app.all('*', require('./routes/notExisted'));

app.listen(PORT);
