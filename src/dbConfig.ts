import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

const DbConnect = async() => {
  config();

  const dbUrl: string = process.env.dbUrl ? process.env.dbUrl.toString() : "";

  const options: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;

  await mongoose
    .connect(dbUrl, options)
    .then(() => console.log("DB Connected!!"))
    .catch((err: Error) => console.log("Error: " + err));
};

export default DbConnect;
