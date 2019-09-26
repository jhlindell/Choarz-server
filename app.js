require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const router = require('./router');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const app = new express();

app.use(cors());
app.use(bodyParser.json());

router(app);

module.exports = app;
