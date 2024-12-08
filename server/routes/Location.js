const express = require('express');
const router = express.Router();
const LocationSchema = require('../models/location')
const LocationService = require('../controllers/Location')

router.post('/restaurants-by-location', async(req, res)=>{
  const response = await LocationService.getRestaurantsByLocation(req.body);
  return res.send(response);
})

module.exports = router;


