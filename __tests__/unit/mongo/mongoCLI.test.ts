import { Connection, Schema } from "mongoose";
import { MongoCLI } from "../../../src/mongo/mongoCLI";

interface ImockDB {
  users?: object;
  scores?: object;
}
describe("MongoCLI", () => {
  let mockDB: ImockDB = {};
  const cli = new MongoCLI();
  beforeAll(() => {
    jest.spyOn(cli.database, "init").mockImplementation(async () => {
      cli.database.connection = {
        createCollection: async (name: string) => {
          mockDB = {
            ...mockDB,
            [name]: {},
          };
        },
        model: (model: string, schma: Schema, name: string) => {
          console.log(model, schma.index);
          return {
            create: async (obj: object) => {
              const withId = { _id: 1, ...obj };
              mockDB = {
                ...mockDB,
                [name]: {
                  ...withId,
                },
              };
              console.log(mockDB);

              return withId;
            },
          };
        },
      } as unknown as Connection;
    });
    jest.spyOn(cli.database, "disconnect").mockImplementation(async () => {
      cli.database.connection = null;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Pass", () => {
    cli.createDB();
    setTimeout(() => {
      expect(mockDB.users).toBeDefined();
      expect(mockDB.scores).toBeDefined();
      expect(mockDB.users).toEqual({ _id: 1, username: "user1" });
      expect(mockDB.scores).toEqual({ _id: 1, userId: 1, score: 404 });
      expect(cli.database.connection).toBe(null);
    }, 100);
  });
  it("Throws", () => {
    jest
      .spyOn(cli.database, "init")
      .mockImplementation(jest.fn(async () => {}));
    expect(cli.createDB).toThrow();
  });
});
