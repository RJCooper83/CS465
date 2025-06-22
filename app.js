const express = require('express');
const path = require('path');
const cors = require('cors'); 
const app = express();
const passport = require('passport');
require('./app_api/config/passport');

require('dotenv').config();

// ===== DB Connection =====
require('./app_api/models/db');

// ===== Middleware =====
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ===== View Engine Setup =====
const exphbs = require('express-handlebars');
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
const apiRouter = require('./app_api/routes/index');

// Enable full CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', apiRouter);
app.use('/', travelerRouter);

// ===== Server Start =====
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Travlr app listening on http://localhost:${port}`);
});

// Handle unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ "message": err.name + ": " + err.message });
  }
});
