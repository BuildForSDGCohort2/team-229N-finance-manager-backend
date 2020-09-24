import * as mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
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

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
