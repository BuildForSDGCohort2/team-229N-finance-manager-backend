import * as mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  item: {
    type: String,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
  },
  sPrice: {
    type: Number,
    default: 0,
  },
  sqty: {
    type: Number,
    default: 0,
  },
  code: {
    type: String,
  },
  pd: {
    type: Date,
  },
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
