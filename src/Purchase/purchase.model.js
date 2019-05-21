const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('validator');


var PurchaseSchema = new Schema({
 name:{
    type: String,
    required: true,
    trim: true,
    lowercase:true
    },
address:{
    type:String,
    required:true
},
    productId:{   
    type:String,
    required:true
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

PurchaseSchema.set('toJSON', {virtuals:true});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;