// app.js
const express = require('express');
const path = require('path');
const app = express();

// ===== Middleware =====

// Serve static files (CSS, JS, images) from /public
app.use(express.static(path.join(__dirname, 'public')));

// ===== View Engine Setup =====

const exphbs = require('express-handlebars');

// Configure Handlebars view engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// ===== Routes =====

const travelerRouter = require('./app_server/routes/index');
app.use('/', travelerRouter);

// ===== Server Start =====

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Travlr app listening on http://localhost:${port}`);
});
