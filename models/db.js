const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SinsDB', { useNewUrlParser: true }, (err) =>{
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    }
    else {
        console.log('Eroor in DB connection : ' + err)
    }
});

require('./sins.model');