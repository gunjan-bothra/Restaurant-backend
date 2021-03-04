const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const restaurants = require('./routes/restaurants');
const app = express();
const mongoConnect = require('./util/database').MongoConnect;
const User = require('./models/restaurant/user');

app.use(bodyParser.urlencoded());
// This will be executed always
// app.use((req, res, next) => {

//     User.findById('5dbbfe364502a10128934967')
//     .then(user => {
//         req.user = user;
        
//         next();
//     })
//     .catch(err => {
//         console.log("User Not found" + err);
//     });
    
// });

app.use((req, res, next) => {
    User.findById('5dbbfe364502a10128934967')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use('/admin',adminRouter); // This will add filter in the request url
app.use('/restaurant',restaurants);
app.use(shopRouter);



app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
mongoConnect(() => {
    app.listen(3000);
})
