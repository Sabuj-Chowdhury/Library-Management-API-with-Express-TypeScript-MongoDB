import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url!);
    console.log("Database connected!");

    app.listen(config.port, () => {
      console.log(`port : ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
