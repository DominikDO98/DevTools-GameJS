import { scoreSchema, userSchema } from "./schmas";
import { MongoConnection } from "mongo/connection";

export class MongoCLI {
  private _database = new MongoConnection();

  createDB() {
    this._database
      .init()
      .then(async () => {
        await this.createCollection("users");
        await this.createCollection("scores");
      })
      .then(async () => {
        await this.fillWithData();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => this._database.disconnect());
  }

  private async fillWithData() {
    return this._database.connection
      .model("User", userSchema, "users")
      .create({ username: "user1" })
      .then(async (user) => {
        console.log(user.db.db?.databaseName);

        console.log("User created");
        console.log(this._database.connection.db?.databaseName);

        return this._database.connection
          .model("Score", scoreSchema, "scores")
          .create({
            userId: user._id,
            score: 404,
          });
      })
      .then(() => {
        console.log("Score inserted");
      });
  }

  private async createCollection(collection: string) {
    return this._database.connection
      .createCollection(collection)
      .then(() => {
        console.log(`${collection} collection created`);
      })
      .catch((e) => {
        console.error(`Couldn't creat ${collection} collection`, e);
      });
  }
}
