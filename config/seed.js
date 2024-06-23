const mongoose = require('../config/db-connection.js');
const Item = require('../models/Product.js');
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