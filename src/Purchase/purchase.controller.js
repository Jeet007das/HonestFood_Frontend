const express = require('express');
const router = express.Router();
const purchaseService = require('./purchase.service');
const bookService = require('../Books/book.service');
const auth = require('../middleware/auth');


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

let _getPurchaseList = async (req, res) => {
    const tokenStatus = await auth(req, res)
    if (!tokenStatus) {
        return res.status(401).send({ message: "You are not logged In, Do logIn first" })
    } else {
        try {
            let purchaseList = await purchaseService._getPurchaseList(req, res);
            (purchaseList) ? res.status(200).send({ purchaseList, message: "Purchase List" }) : res.status(404).send({ message: "No Purchase found" })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: "Something went wrong" })
        }
    }
}




router.post('/_buyBook', _buyBook);  //User purchase details 
router.post('/_getPurchaseList', _getPurchaseList);  //Get Purchase Details by authorized email id


module.exports = router;