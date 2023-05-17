import nast, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot acccess NATS client before connecting.");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nast.connect(clusterId, clientId, { url });


    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS", clientId);
        resolve();
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
