// Requiring necessary packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Creating the express server and storing inside the app variable
const app = express();

// Port on which the server will run
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


// Custom Middleware to log requests
app.use((req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  console.log('Request Body:', req.body);  // Log request body for debugging
  next();
});

// Requiring routers
const userRouter = require('./routes/users.js');
const productRouter = require('./routes/products.js');
const orderRouter = require('./routes/orders.js');

// Connecting the routers to the server
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get("/", (req, res) => {
  res.send('<h1>AP Garland</h1>');
});

// Error Handling Middleware for JSON syntax errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Starting the server and listening on the configured port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
