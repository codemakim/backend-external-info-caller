const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const financeRouter = require('./routes/financialReport');
const stockInfo = require('./routes/stockInfo');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/financialReport', financeRouter);
app.use('/stockInfo', stockInfo);

module.exports = app;
