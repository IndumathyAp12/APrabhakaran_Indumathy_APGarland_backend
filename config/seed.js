const mongoose = require('../config/db-connection.js');
const Product = require('../models/Product.js'); 
const User = require('../models/User.js');
const Order = require('../models/Order.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    description: 'Button rose garland',
    price: 29.99,
    imageUrl: 'https://5.imimg.com/data5/QF/OG/MY-1486667/rose-flower-garlands-500x500.jpeg',
  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1b',
    name: 'Product 2',
    description: 'white roses with pink gypsy',
    price: 39.99,
    imageUrl: 'https://www.kanpurgifts.com/admin/product_images/single-white-roses-pink-gypsy-varmala.jpg',
  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1c',
    name: 'Product 3',
    description: 'Yellow rose petals garland',
    price: 19.99,
    imageUrl: 'https://www.lookatflowers.in/wp-content/uploads/2018/07/RPG041-600x600.png',
      },
  {
    _id: '60c72b2f4f1a2c001c9d8e1d',
    name: 'Product 4',
    description: 'Daisy with roses',
    price: 49.99,
    imageUrl: 'https://i.etsystatic.com/29433084/r/il/df2212/5004932121/il_570xN.5004932121_rzxt.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1e',
    name: 'Product 5',
    description: 'Carnations with roses',
    price: 24.99,
    imageUrl: 'https://i.pinimg.com/474x/0b/12/09/0b1209660654e67f2d85c7a409f88d19.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e1f',
    name: 'Product 6',
    description: 'Daisy with red roses',
    price: 59.99,
    imageUrl: 'https://i.etsystatic.com/29433084/r/il/a4dbd1/3909728270/il_570xN.3909728270_e8vg.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e20',
    name: 'Product 7',
    description: 'Tuberose with rose petals garland',
    price: 34.99,
    imageUrl: 'https://www.shutterstock.com/image-photo/indian-wedding-flower-garland-images-600w-1497824750.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e21',
    name: 'Product 8',
    description: 'scented mini rose garland',
    price: 44.99,
    imageUrl: 'https://i.pinimg.com/736x/9f/93/da/9f93da9cd6c401ad12b8141d535b909d.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e22',
    name: 'Product 9',
    description: 'Jasmine with rose petals garland',
    price: 54.99,
    imageUrl: 'https://www.giftstohyd24x7.com/wp-content/uploads/2023/05/garlandswedding.jpg',

  },
  {
    _id: '60c72b2f4f1a2c001c9d8e23',
    name: 'Product 10',
    description: 'mini Jasmine and rose garland',
    price: 24.99,
    imageUrl: 'https://www.srishtiusa.com/cdn-cgi/image/quality%3D85/assets/images/newimages/flowers/garlands/thumbnails/sfgu015-02_thumbnail.png',

  },
];

async function seed() {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

       // Hash passwords before creating users
       const hashedUsers = await Promise.all(users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword
        };
      }));

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
