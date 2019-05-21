const express = require('express');
const router = express.Router();
const purchaseService = require('./purchase.service');



let _buyBook = async (req, res) => {
    console.log(req.body);
     try {
            let purchaseDetails = await purchaseService._buyBook(req, res);
            if (purchaseDetails) {
                res.status(200).send({ stock_details , message: "Book purchase sucessfully" })
            }
           else {
                res.status(400).send({ message: "Purchase Details is not inserting" })
            }

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: "Something went wrong" })
        }


    
}


router.post('/_buyBook', _buyBook);  //User purchase details 



module.exports = router;