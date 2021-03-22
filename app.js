import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db  from './config/database';  
import routes from './index';
import Product from './models/Product'
import Category from './models/Category'
import Product_Provider from './models/Product-provider'
import Provider from './models/Provider';

var app = express();

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  Product.belongsTo(Category, {foreignKey:'category_id'})
  // Category.hasMany(Product, {foreignKey:'category_id'})
  Product_Provider.belongsTo(Product, {foreignKey: 'product_id'})
  Product_Provider.belongsTo(Provider, {foreignKey: 'provider_id'})
  
db.sync()




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/',routes)


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
  res.status(err.status || 500).json({
    errors: err.message
  });
});

module.exports = app;
