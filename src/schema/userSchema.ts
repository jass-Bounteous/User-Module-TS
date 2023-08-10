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
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emp_code: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    require: false,
  },
  authToken: {
    type: String,
    require: false,
  },
});

export default mongoose.model("user", userTemplate);
