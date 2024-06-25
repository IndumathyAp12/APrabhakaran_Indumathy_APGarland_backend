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
  console.log('Request Body:', req.body);  
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

// Mongoose model for contact form submissions
const Contact = require('./models/Contact');

// Route to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save the data to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Respond to the client
    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).json({ message: 'Error saving contact form submission' });
  }
});

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
