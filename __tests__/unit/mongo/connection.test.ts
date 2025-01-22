import { MongoConnection } from "../../../src/mongo/connection";
import mongoose from "mongoose";

describe("MongoConnection", () => {
  const mongoConn = new MongoConnection();
  beforeAll(() => {
    process.env.MONGODB_URI = "someuri";
    process.env.MONGODB_DB = "somedb";
    jest
      .spyOn(mongoose, "connect")
      .mockImplementation((uri: string, options?: mongoose.ConnectOptions) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(uri, options);
            resolve(new mongoose.Mongoose());
          }, 200);
        });
      });
    jest.spyOn(mongoose, "disconnect").mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        });
      });
    });
    jest.spyOn(mongoose.connection, "useDb");
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Pass", () => {
    it("MongoConnect calls connect", async () => {
      await mongoConn.init().then(() => {
        expect(mongoose.connect).toHaveBeenCalledTimes(1);
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
        expect(mongoose.connection.useDb).toHaveBeenCalledTimes(1);
        expect(mongoose.connection.useDb).toHaveBeenCalledWith(
          process.env.MONGODB_DB
        );
        expect(mongoConn.connection).toBeDefined();
      });
    });
    it("MongoConnect calls disconnect", async () => {
      await mongoConn.disconnect();
      expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
