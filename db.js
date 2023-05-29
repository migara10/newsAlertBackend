const mongoose = require('mongoose'); // import mongoose
require('dotenv').config(); // config env

// require('dotenv').config(); // config env
// connect mongo db
/* const connectDB = async () => {
    const db = process.env.DB_URI;
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB; */

/* module.exports = function() { 
    this.sum = function(a,b) { console.log('aaa') };
    this.multiply = function(a,b) { return a*b };
} */

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
/* const connectToDatabase = async () => {
    const db = "mongodb+srv://migara:game1994@unilog.z3swk.mongodb.net/derana?retryWrites=true&w=majority";
    mongoose.connect(db)
    console.log('db connect')

}; */
module.exports = connectToDatabase;