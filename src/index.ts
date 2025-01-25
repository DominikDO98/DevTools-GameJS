import { MongoCLI } from "./mongo/mongoCLI";

class CLI {
  private _mongo = new MongoCLI();

  startMongo() {
    this._mongo.createDB();
  }
}

if (process.argv[2] === "createDB") {
  new CLI().startMongo();
}
