require('dotenv').config();
const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  registrationValidation, loginValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: [
    'https://mesto.react.nomoredomains.icu',
    'http://mesto.react.nomoredomains.icu',
    'localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(requestLogger);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', registrationValidation, createUser);

app.post('/signin', loginValidation, login);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Ошибка' });
  }

  next();
});

app.listen(PORT);
