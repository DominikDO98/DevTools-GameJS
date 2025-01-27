import mongoose, { Connection } from "mongoose";
import { MongoConnection } from "../../../src/mongo/connection";

describe("MongoConnection", () => {
  const mongoConn = new MongoConnection();

  beforeAll(() => {
    process.env.MONGODB_URI = "someuri";
    process.env.MONGODB_DB = "somedb";
    jest.spyOn(mongoose, "connect").mockImplementation((uri: string) => {
      return new Promise((resolve) => {
        console.log(uri);
        resolve({
          connection: {
            useDb: (uri: string) => {
              return uri;
            },
          },
        } as unknown as mongoose.Mongoose);
      });
    });
    jest.spyOn(mongoose, "disconnect").mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Pass", () => {
    it("MongoConnecttion.init() create connection", async () => {
      await mongoConn.init().then(() => {
        mongoose.connection.useDb("");
        expect(mongoConn.connection).toEqual(process.env.MONGODB_DB);
      });
    });
    it("MongoConnection.disconnect removes conneciton", async () => {
      mongoConn.connection = "conneciton" as unknown as Connection;
      await mongoConn.disconnect();
      expect(mongoConn.connection).toEqual(null);
    });
  });
});
