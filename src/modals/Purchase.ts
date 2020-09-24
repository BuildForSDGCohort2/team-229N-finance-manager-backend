import * as mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
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

const Purcahse = mongoose.model('Purchase', purchaseSchema);

export default Purcahse;
