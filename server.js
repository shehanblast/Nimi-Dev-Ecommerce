const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const storeAPI = require('./src/api/store.api');
const userAPI=require('./src/api/UserAPI');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))

//File uploard
app.use(bodyParser.json({ limit:"120mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"120mb",extended: true}));
app.set('trust proxy', 1) // trust first proxy

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true

}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});


app.use('/store', storeAPI());
app.use('/users', userAPI());


mongoose.connection.once('open', () => {
  console.log('Database Connected');
});

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
