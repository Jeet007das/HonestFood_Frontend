const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var validator = require('validator');


var StoreSchema = new Schema({
 store_name:{
    type:String,
    required:true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    deliveryUpto: {
        type: Number,
        required: true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true  
    },
  createdDate:{
    type:Date,
    default:Date.now
  }
});

StoreSchema.set('toJSON', {virtuals:true});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;