const mongoose = require('../config/db-connection.js');
const Product = require('../models/Product.js'); 
const User = require('../models/User.js');
const Order = require('../models/Order.js');

// Sample data
const users = [
  {
    username: 'emma_smith',
    email: 'emma@example.com',
    password: '4ygbhwr8w'
  },
  {
    username: 'mike_jones',
    email: 'mike@example.com',
    password: 'w7h3gv23bd'
  },
  {
    username: 'lucy_wang',
    email: 'lucy@example.com',
    password: 'fnf9h3o12d'
  },
  {
    username: 'david_clark',
    email: 'david@example.com',
    password: 'vmdjs8fh3d'
  },
  {
    username: 'sarah_brown',
    email: 'sarah@example.com',
    password: 'hdm48fny8s'
  },
  {
    username: 'alex_jackson',
    email: 'alex@example.com',
    password: 'vfh3jkw9y4'
  },
  {
    username: 'olivia_garcia',
    email: 'olivia@example.com',
    password: 'pwr84vbm93'
  },
  {
    username: 'tom_wilson',
    email: 'tom@example.com',
    password: 'ncd8fmg7ej'
  },
  {
    username: 'emily_thomas',
    email: 'emily@example.com',
    password: 'wue48df3hb'
  },
  {
    username: 'kevin_lee',
    email: 'kevin@example.com',
    password: 'jcnw84f9dv'
  }
];

const orders = [
  {
    userId: '60c72c3f4f1a2c001c9d8e24',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1a',
        quantity: 2,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e1b',
        quantity: 1,
      },
    ],
    total: 99.97,
    status: 'Pending',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e25',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1c',
        quantity: 3,
      },
    ],
    total: 59.97,
    status: 'Completed',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e26',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1d',
        quantity: 1,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e1e',
        quantity: 2,
      },
    ],
    total: 99.97,
    status: 'Cancelled',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e27',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1f',
        quantity: 1,
      },
    ],
    total: 59.99,
    status: 'Pending',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e28',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e20',
        quantity: 4,
      },
    ],
    total: 139.96,
    status: 'Completed',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e29',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e21',
        quantity: 2,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e22',
        quantity: 1,
      },
    ],
    total: 134.97,
    status: 'Pending',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e2a',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e23',
        quantity: 1,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e1a',
        quantity: 2,
      },
    ],
    total: 124.97,
    status: 'Completed',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e2b',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1b',
        quantity: 1,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e1c',
        quantity: 3,
      },
    ],
    total: 99.97,
    status: 'Cancelled',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e2c',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1d',
        quantity: 2,
      },
      {
        productId: '60c72b2f4f1a2c001c9d8e1e',
        quantity: 1,
      },
    ],
    total: 99.97,
    status: 'Pending',
  },
  {
    userId: '60c72c3f4f1a2c001c9d8e2d',
    products: [
      {
        productId: '60c72b2f4f1a2c001c9d8e1f',
        quantity: 3,
      },
    ],
    total: 179.97,
    status: 'Completed',
  },
];

const products = [
  {
    _id: '60c72b2f4f1a2c001c9d8e1a',
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 29.99,
    imagePath: 'images/garland 1.png',
  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1b',
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 39.99,
    imagePath: 'images/garland 2.jpg',
  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1c',
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 19.99,
    imagePath: 'images/garland 3.jpg',
      },
  {
    _id: '60c72b2f4f1a2c001c9d8e1d',
    name: 'Product 4',
    description: 'Description for Product 4',
    price: 49.99,
    imagePath: 'images/garland 4.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1e',
    name: 'Product 5',
    description: 'Description for Product 5',
    price: 24.99,
    imagePath: 'images/garland 5.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1f',
    name: 'Product 6',
    description: 'Description for Product 6',
    price: 59.99,
    imagePath: 'images/garland 6.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e20',
    name: 'Product 7',
    description: 'Description for Product 7',
    price: 34.99,
    imagePath: 'images/garland 7.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e21',
    name: 'Product 8',
    description: 'Description for Product 8',
    price: 44.99,
    imagePath: 'images/garland 8.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e22',
    name: 'Product 9',
    description: 'Description for Product 9',
    price: 54.99,
    imagePath: 'images/garland 9.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e23',
    name: 'Product 10',
    description: 'Description for Product 10',
    price: 64.99,
    imagePath: 'images/garland 10.jpg',

  },
];

async function seed() {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    const createdProducts = await Product.create(products);
    console.log('Products: ', createdProducts);

    const createdUsers = await User.create(users);
    console.log('Users: ', createdUsers);

    const createdOrders = await Order.create(orders);
    console.log('Orders: ', createdOrders);

    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

seed();
