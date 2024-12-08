const LocationSchema = require('../models/location')

class LocationService{
  async getRestaurantsByLocation(reqData){
    try{

      const {longitude, latitude, radiusInMeters} = reqData;
      const radiusInRadians = (parseInt(radiusInMeters)*1000) / 6378137; // Convert radius to radians (Earth's radius is approximately 6378137 meters)
      
      const restaurants = await LocationSchema.find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radiusInRadians]
          }
        }
      });
      return ({error:false, msg:'Locations Fetched Successfully', data:restaurants});
  }
  catch(err){
      console.log(err.message);
      return ({error:true, msg:"Internal Server Error"})
  }
  }
}


module.exports = new LocationService();