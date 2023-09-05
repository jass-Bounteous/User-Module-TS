import mongoose from "mongoose";

const userTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emp_code: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  authToken: {
    type: String,
    require: false,
  },
});

export default mongoose.model("user", userTemplate);
