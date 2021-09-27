const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
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
  .catch((err) => console.log(err));

app.post('/signup', validateUsersPost, createUser);
app.post('/signin', validateUserLogin, login);

app.use(auth); // Все роуты ниже защищены авторизацией

app.use(user);
app.use(card);

app.use(errors());

app.use(errorValidator);

app.listen(port, () => {
  console.log(`app listening port is running on port ${port}`);
});
