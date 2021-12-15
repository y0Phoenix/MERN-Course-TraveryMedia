const mon = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await mon.connect(db, { useNewUrlParser: true });
       console.log('Connected To MongoDb');
    }
    catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;