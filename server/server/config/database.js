const mongoose = require('mongoose');

// Initial load for models
require('../models/user');

module.exports = (settings) => {
    mongoose.connect(settings.connectionString).then().catch(err => { console.log(err) });
    let database = mongoose.connection

    database.once('open', err => {
        if (err) {
            console.log(err);
            throw err
        }

        console.log('MongoDB Reqdy!');
    });

    database.on('err', err => console.log(`Database error: ${err}`));
}