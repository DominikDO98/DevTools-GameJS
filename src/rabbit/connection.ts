import "dotenv/config";
import { Channel, connect, Connection } from "amqplib";

export class RabbitConnection {
  private _connection: Connection | null = null;
  private _channel: Channel | null = null;

  set connection(connection: Connection | null) {
    this._connection = connection;
  }
  get connection(): Connection | null {
    return this._connection;
  }
  set channel(channel: Channel | null) {
    this._channel = channel;
  }
  get channel(): Channel | null {
    return this._channel;
  }

  async init() {
    await connect(process.env.RABBITMQ_URI)
      .then((conn) => {
        console.log("Establishing connection...");
        this._connection = conn;
        return this._connection.createChannel();
      })
      .then((chan) => {
        console.log("Creating channel...");
        this._channel = chan;
        console.log("Connection: ", this._connection);
        console.log("Channel: ", this._channel);
        this.valitadeConnection();
        return [this._connection, this._channel];
      })
      .catch((e) => {
        console.log("Something went wrong");
        console.error(e);
      })
      .finally(() => console.log("Broker initialization is over"));
  }

  valitadeConnection() {
    if (!this._connection) throw Error("No connection!");
    if (!this._channel) throw Error("No channel!");
  }

  disconnect() {
    this.valitadeConnection();
    this.connection!.close()
      .then(() => {
        this.connection = null;
        this.channel = null;
      })
      .catch((e) => {
        console.error("Unable to close conneciton to rabbitMQ", e);
      });
  }
}
