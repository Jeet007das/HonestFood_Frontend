const db = require('../common/db');
const Store = db.Store;
var NodeGeocoder = require('node-geocoder');

module.exports = {
    _registerStore: async (req, res) => {
        let storeDetails = req.body;
        console.log(storeDetails);
        let full_address = storeDetails.street + "," + storeDetails.city + " " + storeDetails.state;

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
                storeDetails.latitude = res[0].latitude,
                    storeDetails.longitude = res[0].longitude

            }
        });

        try {
            const store = new Store(storeDetails);
            return await store.save();

        } catch (e) {
            throw new Error(e)
        }
    }
}