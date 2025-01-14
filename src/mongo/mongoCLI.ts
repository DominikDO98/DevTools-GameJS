import { MongoConnection } from "mongo/connection";

export class MongoCLI {
  private _database = new MongoConnection();

  createDB() {
    this._database
      .init()
      .then(async () => {
        await this.createCollection("users");
        await this.createCollection("score");
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => this._database.disconnect());
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
