require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
var moment = require('moment');
var MomentHandler = require("handlebars.moment");

const sinsController = require('./controllers/sinsController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', Handlebars({ 
    extname: 'hbs', 
    defaultLayout:   'mainLayout',
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    layoutDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/sins', sinsController);