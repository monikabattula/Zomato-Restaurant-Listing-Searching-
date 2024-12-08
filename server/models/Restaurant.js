const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  RestaurantID: {
    type: Number
  },
  RestaurantName: {
    type: String
  },
  CountryCode: {
    type: String,
    index : true,
  },
  City: {
    type: String
  },
  Address: {
    type: String
  },
  Locality: {
    type: String
  },
  LocalityVerbose: {
    type: String
  },
  Longitude: {
    type: Number
  },
  Latitude: {
    type: Number
  },
  Cuisines: {
    type: String
  },
  AverageCostForTwo: {
    type: Number
  },
  Currency: {
    type: String
  },
  HasTableBooking: {
    type: Boolean
  },
  HasOnlineDelivery: {
    type: Boolean
  },
  IsDeliveringNow: {
    type: Boolean
  },
  SwitchToOrderMenu: {
    type: Boolean
  },
  PriceRange: {
    type: Number
  },
  AggregateRating: {
    type: Number
  },
  RatingColor: {
    type: String
  },
  RatingText: {
    type: String
  },
  Votes: {
    type: Number
  }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;