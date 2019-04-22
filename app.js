const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose=require('mongoose');
const app = express();
require('./config/passport');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    next();
    });
app.use('/', routes);
module.exports = app;