const mongoose = require('mongoose');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

before(done => {
  mongoose.connect('mongodb://localhost/choarz_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', err => {
      logger.info('Warning: ', err);
    });
});

beforeEach(done => {
  const { accounts } = mongoose.connection.collections;
  accounts.drop(() => {
    done();
  });
});
