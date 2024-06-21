var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var morgan = require('morgan')
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products')
var voucherRouter = require('./src/routes/voucher')
var newsRouter = require('./src/routes/news')
var cartRouter = require('./src/routes/cart')
var themeRouter = require('./src/routes/theme')
var categoryRouter = require('./src/routes/categories')
var orderRouter = require('./src/routes/orders')
var orderDetailRouter = require('./src/routes/order_details')
var orderStatusRouter = require('./src/routes/order_status')
var messageRouter = require('./src/routes/messages')
var conversationRouter = require('./src/routes/conversations')
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
app.use('/messages', messageRouter)
app.use('/conversations', conversationRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
