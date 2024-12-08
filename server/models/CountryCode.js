const mongoose = require('mongoose');

const CountryCodeSchema = new mongoose.Schema({
  CountryCode: {
    type: Number
  },
  Country: {
    type: String
  }
});

const CountryCodes = mongoose.model('CountryCodes', CountryCodeSchema);
module.exports = CountryCodes;