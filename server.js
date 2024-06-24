// Requiring necessary packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Creating the express server and storing inside the app variable
const app = express();

// Port in which the server will run on
const PORT = process.env.PORT || 5000;

// Requiring router
const userRouter = require('./routes/users.js');
const productRouter = require('./routes/products.js');
const orderRouter = require('./routes/orders.js');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  next();
});

// Connecting the router to the server
app.use('/users', userRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);

app.get("/",(req,res) => {
  res.send('<h1>AP Garland</h1>');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
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
