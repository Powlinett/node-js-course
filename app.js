const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const pagesController = require('./controllers/pages');
const mongoConnect = require('./helpers/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use('/', pagesController.pageNotFound);

mongoConnect((client) => {
	console.log(client);
	app.listen(3000);
});
