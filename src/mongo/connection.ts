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
        console.log(this.connection.db?.databaseName);

        console.log("Connection to mongo database established...");
      })
      .catch((e) => {
        console.error("Cannot connect! Aborting...", e);
      });
  }

  disconnect() {
    mongoose
      .disconnect()
      .then(() => {
        console.log("Disconnected from DB");
      })
      .catch((e) => {
        this._connection = mongoose.connection;
        console.error("Can't disconnect from mongo server", e);
      });
  }
}
