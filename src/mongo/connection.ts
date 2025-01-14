import "dotenv/config";
import mongoose, { Connection } from "mongoose";

export class MongoConnection {
  private _connection: Connection = mongoose.connection;

  get connection(): Connection {
    return this._connection;
  }
  init() {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        this._connection = mongoose.connection;
        console.log("Connection to mongo database established...");
      })
      .catch((e) => {
        console.error("Cannot connect! Aborting...", e);
      });
  }

  disconnect() {
    mongoose.disconnect().catch((e) => {
      this._connection = mongoose.connection;
      console.error("Can't disconnect from mongo server", e);
    });
  }
}
