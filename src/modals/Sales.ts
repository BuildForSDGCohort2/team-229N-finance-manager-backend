import * as mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  details: {
    type: String,
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
  },
  code: {
    type: String,
  },
  pd: {
    type: Date,
  },
});

const Sale = mongoose.model('Sale', salesSchema);

export default Sale;
