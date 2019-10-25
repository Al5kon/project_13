/* eslint-disable quote-props */
/* eslint-disable no-console */

const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const router = require('./routes/users.js');

const routerCards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Hi'))
  .catch((e) => console.log(e));

app.use(express.static(path.join(__dirname, 'public')));
app.post('/users', bodyParser.json(), router);
app.use('/users', router);
app.use('/cards', routerCards);
app.use((req, res) => {
  // eslint-disable-next-line quotes
  res.status(404).json({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
