const express = require('express');
const router = express.Router();
const storeService = require('./register.service');


let _registerStore = async(req,res) => {
      try{    
                 let store = await storeService._registerStore(req, res);
                 console.log(store);
                 
                 (store) ?  res.status(201).send({message:"Store Register Successfull"}) : res.status(400).send({message:"Book is not added, please try again"})
             }catch(e){
                 console.log(e);
             }
             
         
     }

router.post('/_registerStore',  _registerStore); 

module.exports = router;
 