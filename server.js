// Requiring necessary packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Creating the express server and storing inside the app variable
const app = express();

// Port in which the server will run on
const PORT = process.env.PORT || 8000;

// Requiring example router
const userRouter = require('./routes/users.js');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  next();
});

// Connecting the router to the server
app.use('/users', userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong.');
});

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Calling the listen function telling the server to listen on the configured port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
