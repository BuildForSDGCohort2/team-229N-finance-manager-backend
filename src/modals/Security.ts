import * as mongoose from 'mongoose';

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    // required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  pd: {
    type: Date,
    default: Date.now,
  },
});

const Security = mongoose.model('Security', CodeSchema);

export default Security;
