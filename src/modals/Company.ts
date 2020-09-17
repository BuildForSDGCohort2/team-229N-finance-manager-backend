import * as mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    //   required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  bank: {
    type: String,
    //   default:false
  },
  logo: {
    type: String,
  },
  phone: {
    type: String,
  },
  fb: {
    type: String,
  },
  twt: {
    type: String,
  },
  yt: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pd: {
    type: Date,
    //   default: Date.now,
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
