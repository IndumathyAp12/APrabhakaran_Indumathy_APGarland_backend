const {Schema, model} = require('../config/db-connection');

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
});
// Indexes
productSchema.index({ name: 1 });

module.exports  = model('Product', productSchema);