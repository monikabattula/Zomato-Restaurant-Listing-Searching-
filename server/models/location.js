const mongoose  = require('mongoose')

const LocationSchema = new mongoose.Schema({
    name: String,
    restaurantId : String,
    location: {
      type: { type: String },
      coordinates: [Number]
    }
})

LocationSchema.index({ location: "2dsphere" });

const Location =  mongoose.model('location', LocationSchema);

module.exports = Location;
