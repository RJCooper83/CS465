exports.home = (req, res) => {
  res.render('home', { title: 'Welcome to Travlr Getaways (Powered by Handlebars!)' });
};

exports.travel = (req, res) => {
  res.render('travel', { title: 'Travel | Travlr Getaways' });
};

exports.rooms = (req, res) => {
  res.render('rooms', { title: 'Rooms | Travlr Getaways' });
};

exports.meals = (req, res) => {
  res.render('meals', { title: 'Meals | Travlr Getaways' });
};

exports.news = (req, res) => {
  res.render('news', { title: 'News | Travlr Getaways' });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About | Travlr Getaways' });
};

exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact | Travlr Getaways' });
};