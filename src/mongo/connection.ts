import "dotenv/config";
import mongoose, { Connection } from "mongoose";

export class MongoConnection {
  private _connection: Connection = mongoose.connection;

  set connection(connection) {
    this._connection = connection;
  }
  get connection(): Connection {
    return this._connection;
  }

  async init() {
    return mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        this.connection = mongoose.connection.useDb(process.env.MONGODB_DB);
        console.log("Connection to mongo database established...");
      })
      .catch((e) => {
        console.error("Cannot connect! Aborting...", e);
      });
  }

  async disconnect() {
    return mongoose
      .disconnect()
      .then(() => {
        this.connection = mongoose.connection;
        console.log("Disconnected from DB");
      })
      .catch((e) => {
        console.error("Can't disconnect from mongo server", e);
      });
  }
}
