const app = require('./app');
const winston = require('winston');

const port = process.env.PORT || 8000;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.listen(port, () => {
  logger.info(`Now listening on port ${port}`);
});
