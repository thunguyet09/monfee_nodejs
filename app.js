var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var morgan = require('morgan')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var voucherRouter = require('./routes/voucher')
var newsRouter = require('./routes/news')
var cartRouter = require('./routes/cart')
var themeRouter = require('./routes/theme')
var categoryRouter = require('./routes/categories')
var orderRouter = require('./routes/orders')
var orderDetailRouter = require('./routes/order_details')
var orderStatusRouter = require('./routes/order_status')
var cors = require('cors')
var app = express();

dotenv.config()
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter)
app.use('/vouchers', voucherRouter)
app.use('/news', newsRouter)
app.use('/cart', cartRouter)
app.use('/theme', themeRouter)
app.use('/categories', categoryRouter)
app.use('/orders', orderRouter)
app.use('/order-details', orderDetailRouter)
app.use('/order-status', orderStatusRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
