const Restaurant = require('../models/Restaurant');


class RestaurantServices {


  async getListOfRestaurants(reqData) {
    try {
      const page = reqData.page
      const countryCode = reqData.countryCode
      const cuisine = reqData.cuisine
      const avgMinCostForTwo = reqData.avgMinCost
      const avgMaxCostForTwo = reqData.avgMaxCost
      const restName = reqData.restaurantName
      const limit = 12;
      const filter = {};
      if (countryCode) {
        filter.CountryCode = countryCode;
      }
      if (cuisine) {
        filter.Cuisines = { $regex: new RegExp(cuisine, 'i') };
      }
      if (restName) {
        filter.RestaurantName = { $regex: new RegExp(restName, 'i') };
      }
      if (avgMinCostForTwo || avgMaxCostForTwo) {
        if(avgMaxCostForTwo == ''){
          avgMaxCostForTwo = Number.MAX_SAFE_INTEGER
        }
        filter.AverageCostForTwo = { $gte: Number(avgMinCostForTwo), $lte: Number(avgMaxCostForTwo) };
      }
      const restaurants = await Restaurant.find(filter)
        .sort({ AggregateRating: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();


      const totalRecords = await Restaurant.countDocuments(filter);
      const totalPages = Math.ceil(totalRecords / limit);

      if (!restaurants) {
        return { error: true, msg: 'Internal Server Error' };
      }

      return {
        error: false,
        msg: 'Restaurants Fetched Successfully',
        data: restaurants,
        pagination: {
          totalRecords,
          totalPages,
          currentPage: page,
        },
      };
    } catch (error) {
      return { error: true, msg: error.message };
    }
  }
  
  
  
  
  async getRestaurantByID(reqData) {
  try {
    const restaurant = await Restaurant.findOne({ RestaurantID: reqData.id });
    if (!restaurant) {
      return { error: true, msg: 'Internal Server Error' };
    }

    return { error: false, msg: 'Restaurant Fetched Successfully', data: restaurant };
  }
  catch (error) {
    return { error: true, msg: error.message };
  }
}



}

module.exports = new RestaurantServices();