const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const E = require('./errors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '646a75d228f1be4abc9acbfd',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
