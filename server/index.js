const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const port = 8000;

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


app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.urlencoded({extended: true, limit:"100mb"}));


app.use('/api',require('./routes/Restaurants'))
app.use('/api/image',require('./routes/Image'))
app.use('/api/location',require('./routes/Location'))


app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
