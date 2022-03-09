const mongoose = require('mongoose');
const { mongodb } = require('./keys.js');

mongoose.connect(mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Database is conected'))
    .catch(err => console.log("no se ha podido conectar"))