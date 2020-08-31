const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const pagesController = require('./controllers/pages');

const User = require('./models/user');

const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f4c1a2e795f3616a18c998b')
    .then(user => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', pagesController.pageNotFound);

mongoose
  .connect(
    `mongodb+srv://Powlinett:${process.env.MONGODB_PASSWORD}@cluster0.pjc04.mongodb.net/Project0?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            username: 'popo',
            email: 'popo@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        };
      });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });