const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const Restaurant = require('./models/Restaurant.js');
const CountryCodes = require('./models/CountryCode.js')
require('dotenv').config();



mongoose.connect(process.env.mongoURI
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  }
).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
})


async function loadCSVData() {
  const restaurants = [];
  
  fs.createReadStream('CsvData/zomato.csv')
  .pipe(csv())
  .on('data', (row) => {
    const restaurant = new Restaurant({
        RestaurantID: parseInt(row['Restaurant ID']),
        RestaurantName: row['Restaurant Name'],
        CountryCode: row['Country Code'],
        City: row['City'],
        Address: row['Address'],
        Locality: row['Locality'],
        LocalityVerbose: row['Locality Verbose'],
        Longitude: parseFloat(row['Longitude']),
        Latitude: parseFloat(row['Latitude']),
        Cuisines: row['Cuisines'],
        AverageCostForTwo: parseInt(row['Average Cost for two']),
        Currency: row['Currency'],
        HasTableBooking: row['Has Table booking'].toLowerCase() === 'yes',
        HasOnlineDelivery: row['Has Online delivery'].toLowerCase() === 'yes',
        IsDeliveringNow: row['Is delivering now'].toLowerCase() === 'yes',
        SwitchToOrderMenu: row['Switch to order menu'].toLowerCase() === 'yes',
        PriceRange: parseInt(row['Price range']),
        AggregateRating: parseFloat(row['Aggregate rating']),
        RatingColor: row['Rating color'],
        RatingText: row['Rating text'],
        Votes: parseInt(row['Votes'])
      });
      restaurants.push(restaurant);
    })
    .on('end', async () => {
      try {
        await Restaurant.insertMany(restaurants);
        console.log('Restaurants CSV Data loaded successfully!');
      } catch (err) {
        console.error('Failed to load Restaurants CSV data', err);
      } 
    });
}

async function loadCountryCodeCSVData() {
  const CountryCode = [];
    fs.createReadStream('CsvData/countryCode.csv')
    .pipe(csv())
    .on('data', (row) => {
      const countryCode = new CountryCodes({
        CountryCode: parseInt(row['Country Code']),
        Country: row['Country']
      });
      CountryCode.push(countryCode);
    })
    .on('end', async () => {
      try {
        await CountryCodes.insertMany(CountryCode);
        console.log('Country Code CSV Data loaded successfully!');
      } catch (err) {
        console.error('Failed to load Country Code CSV data', err);
      } 
    });
}

loadCSVData();
loadCountryCodeCSVData();

