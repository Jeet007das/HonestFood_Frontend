const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jeet:Abc@123@cluster0-hs0jx.mongodb.net/test?retryWrites=true', {useCreateIndex: true, useNewUrlParser: true}).then((res) =>{
    console.log("connection successful");
    
});



//mongoose.connect('mongodb://localhost:27017/moodcafe', {useCreateIndex: true, useNewUrlParser: true});

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../Users/user.model'),
    Book: require('../Books/book.model'),
    Purchase: require('../Purchase/purchase.model'),
    Store:require('../StoreRegister/register.model')
};