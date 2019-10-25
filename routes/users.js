/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-useless-return */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
const router = require('express').Router();

const path = require('path');

const fs = require('fs');

const userPath = path.join(__dirname, '../data/users.json');
function errMessage(err) {
  if (err) {
    console.log(err);
    return;
  }
}

router.get('/:_id', (req, res) => {
   fs.readFile(userPath, { encoding: 'utf8' }, (err, data) => {
    errMessage(err);
    const users = JSON.parse(data);
    let success = false;
    for (let i = 0; i < users.length; i++) {
      if (req.params._id === users[i]._id) {
        success = true;
        res.send(JSON.stringify(users[i], null, 4));
      }
    }
    if (!success) {
      res.status(404).json({ "message": "Нет пользователя с таким id" });
    }
  });
});
const User = require('../models/user');

router.post('/', (req, res) => {
  const { name, about } = req.body;
  User.create({ name, about })
        .then((user) => res.send({ data: user }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/', (req, res) => {
  fs.readFile(userPath, { encoding: 'utf8' }, (err, data) => {
    errMessage(err);
    res.end(data);
  });
});

module.exports = router;
