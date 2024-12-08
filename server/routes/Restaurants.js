const express=require('express')
const router=express.Router()
const Restaurant = require('../controllers/Restaurant');


router.post('/getList', async(req,res) => {
  const response=await Restaurant.getListOfRestaurants(req.body);
  	return res.send(response);
	}
)
router.post('/getByID', async(req,res)=>{
  // console.log("🚀 ~ router.get ~ req.body:", req.body)
  const response=await Restaurant.getRestaurantByID(req.body);
  return res.send(response);
})


module.exports=router;