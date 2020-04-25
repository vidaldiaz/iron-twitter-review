const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/iron-twitter', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
        console.log('Base de datos conectada.');
    } catch(err) {
        console.error('Error en la base de datos', err.message);
    }
}

module.exports = connectDB;