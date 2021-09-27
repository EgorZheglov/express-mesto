/* eslint-disable linebreak-style */
module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: 'Ошибка работы сервера' });
  next();
};
