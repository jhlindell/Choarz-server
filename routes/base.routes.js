module.exports = app => {
  //establish a base route
  app.get('/', (req, res) => {
    res.send('hello world!');
  });
};
