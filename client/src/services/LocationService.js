
const { PUBLIC_SERVER_URL } = require("../api");
const host = PUBLIC_SERVER_URL

class LocationService{

    async getRestaurantsByLocation(reqData){
        const response = await fetch(`${host}/api/location/restaurants-by-location`, {
            method : 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(reqData)
        })
        const res = await response.json();
        console.log(res);
        return res;
    }
}

module.exports = new LocationService();
