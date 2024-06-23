const Order = require('../models/Order');

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

async function createOrder(req, res) {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find({}).populate('userId').populate('items.itemId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('items.itemId');
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateOrder(req, res) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
