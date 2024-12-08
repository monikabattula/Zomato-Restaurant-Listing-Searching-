const express=require('express')
const router=express.Router()
const upload = require("../middleware/multer")
const Restaurant = require('../models/Restaurant');
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const fs = require("fs");

const API_KEY = process.env.API_KEY;


const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileManager = new GoogleAIFileManager(API_KEY);

router.post('/imageSearch', upload.single('image'), async(req,res) => {
  try {
    // Access the uploaded image file (if any)
    const image = req.file;

    if (image) {
      const prompt = "Answer in one word: Tell name of cuisine is represented in the image from the given food?? "

      const uploadResult = await fileManager.uploadFile(image.path, {
        // mimeType: "image/jpeg",
        mimeType: 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/webp',
        displayName: "Food Image",
      });
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResult.file.mimeType,
            fileUri: uploadResult.file.uri,
          },
        },
        { text: prompt },
      ]);

      // Handle the response of generated text
      // console.log("gemini response", result.response.text());
      const filterCuisine = result.response.text().replace("Answer:", "").trim();

      // Delete the file.
      await fileManager.deleteFile(uploadResult.file.name);
      console.log(`Deleted ${uploadResult.file.displayName}`);
      // Delete the local file
      fs.unlink(image.path, (err) => {
        if (err) {
          console.error(
            "Error occurred while trying to delete the file:",
            err
          );
          return;
        }
        console.log("File deleted successfully");
      });


      // Perform a search based on the cuisine
      const cuisine = filterCuisine || req.body.cuisine
      const limit = 20;
      const filter = {};
      
      if (cuisine) {
        filter.Cuisines = { $regex: new RegExp(cuisine, 'i') };
      }
      
      const restaurants = await Restaurant.find(filter)
        .sort({ AggregateRating: -1 })
        .limit(limit)
        .exec();

      if (!restaurants) {
        return { error: true, msg: 'Internal Server Error' };
      }
      console.log("filter success");
      

      return res.send({
        error: false,
        msg: 'Restaurants Fetched Successfully',
        data: restaurants,
        cuisine:filterCuisine,
      }); 
    }
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }

	}
)



module.exports=router;