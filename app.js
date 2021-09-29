const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const NotFoundError = require('./utils/NotFoundError');
const auth = require('./middlewares/auth');
const user = require('./routes/user');
const card = require('./routes/card');
const errorValidator = require('./middlewares/errorValidator');
const {
  login,
  createUser,
} = require('./controllers/user');
const {
  validateUserLogin,
  validateUsersPost,
} = require('./middlewares/inputRequestValidation');

const { port = 3000 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.post('/signup', validateUsersPost, createUser);
app.post('/signin', validateUserLogin, login);

app.use(auth); // Все роуты ниже защищены авторизацией

app.use(user);
app.use(card);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
}); // Несуществующий роут

app.use(errors());

app.use(errorValidator);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening port is running on port ${port}`);
});

// Благодарю Вас за отличное ревью!
