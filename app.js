const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const user = require('./routes/user');
const card = require('./routes/card');
const {
  login,
  createUser,
} = require('./controllers/user');

const { port = 3000 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => console.log(err));

app.post('/signin', login);
app.post('/signup', createUser);

// app.use((req, res, next) => {
//   req.user = {
//     id: '613ff1e9a554e7ce69e32158', // вставьте сюда _id созданного
// в предыдущем пункте пользователя
//   };

//   next();
// });

app.use(auth);
app.use(user);
app.use(card);

app.listen(port, () => {
  console.log(`app listening port is running on port ${port}`);
});
