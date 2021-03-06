// MongoDb Password: 7mlXchuoF0xIAP7d
// MongoDB Connection: mongodb+srv://<username>:<password>@spicy.4qzhw.mongodb.net/<dbname>?retryWrites=true&w=majority

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path');
const db = require('./config/db.config');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const app = express();





/*mongoose.connect('mongodb+srv://thecrought:7mlXchuoF0xIAP7d@spicy.4qzhw.mongodb.net/<dbname>?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

db.authenticate().then( () =>console.log("Data  Base Connected !")).catch((err) => console.log(err));


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;