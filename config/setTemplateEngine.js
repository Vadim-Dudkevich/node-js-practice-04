const { app } = require('./main');

function setTemplateEngine() {
  const { engine } = require('express-handlebars');

  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', './backend/views');
}

module.exports = setTemplateEngine;
