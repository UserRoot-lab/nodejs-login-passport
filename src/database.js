const mongoose = require('mongoose');
const { mongodb } = require('./keys');




//Metodo desactualizado
mongoose.connect(mongodb.URI , {useNewUrlParser: true , useUnifiedTopology: true})
    .then((db)  => console.log('Database is conected'))
    .catch( (err) => console.log(err));