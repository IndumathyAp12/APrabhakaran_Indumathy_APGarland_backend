const Item = require('../models/Item');

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};

async function createItem(req, res) {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getAllItems(req, res) {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateItem(req, res) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteItem(req, res) {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
