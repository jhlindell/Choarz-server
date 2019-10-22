const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const passportSetup = require('./config/passport-setup');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const app = new express();

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      logger.info('Successfully connected to the database');
    })
    .catch(err => {
      logger.info(`could not connect to the database. Exiting now... ${err}`);
      process.exit();
    });
}

app.use('/auth', authRoutes);
app.use('/account', accountRoutes);

app.get('/', (req, res) => {
  res.send('home');
});

module.exports = app;
