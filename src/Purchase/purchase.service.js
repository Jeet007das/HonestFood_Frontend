const db = require('../common/db');
const Store = db.Store; 
const Purchase = db.Purchase;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
let _ = require('underscore');
var NodeGeocoder = require('node-geocoder');

// var _ = require('lodash');


  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow = async(lat1, lon1, lat2, lon2) => 
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) 
  {
      return Value * Math.PI / 180;
  }

module.exports = {
   
    _buyBook: async (req, res) => {
        console.log(req.body);
        let customerDetails = req.body;
        let full_address = customerDetails.Street + "," + customerDetails.city + " " + customerDetails.State;
        var address = new Address({
            street: customerDetails.Street,
            city: customerDetails.city,
            state: customerDetails.state,
            country: 'IN'
        });

      let validation = await addressValidator.validate(address, addressValidator.match.streetAddress)
        validation.then(async(res)  =>{
            let options = {
                provider: 'google',
                httpAdapter: 'https',
                apiKey: 'AIzaSyCKC9we0iszKQM1pbEeUi2BSlO40B5Y73k',
                formatter: null
            };
    
            let geocoder = NodeGeocoder(options);
            geocoder.geocode(full_address, async (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    customerDetails.latitude = res[0].latitude,
                    customerDetails.longitude = res[0].longitude
    
                }
            });

            let storeObj = await Store.findById(customerDetails.storeId)
            if(!storeObj){
                throw new error 
            }else{
                let deliverUpto = storeObj.deliverUpto;
                let result = await calcCrow(storeObj.latitude, storeObj.longitude, customerDetails.latitude, customerDetails.longitude);
                result.then(async (res) =>{
                    if(res <= deliverUpto){
                        let purchase_details = new Purchase(customerDetails);
                        let res = await purchase_details.save();
                        return (null, "Delivery successfully"+res);
                    }else{
                        return("Out of range delivery", null)
                    }
                }).catch(err =>{
                    return("something wrong in address", null);
                })
            }
        }).catch(err =>{
            throw new error ("address is not valid")
        })

        
    }
}