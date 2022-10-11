const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { authorization } = require('./middlewares/auth');
const {
  registrationValidation, loginValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const allowedCors = [
  'https://mesto.react.nomoredomains.icu',
  'http://mesto.react.nomoredomains.icu',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signup', registrationValidation, createUser);

app.post('/signin', loginValidation, login);

app.use('/users', authorization, routerUsers);

app.use('/cards', authorization, routerCards);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

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
