import { Deferred } from "./deferred.ts";

export interface Channel<T> {
  send(value: T): Promise<void>;
  receive(): Promise<T>;
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

export function channel<T>(length?: number): Channel<T> {
  const queue: [T, Deferred<void>][] = [];
  const waiting: Deferred<T>[] = [];
  let sent = 0,
    received = 0;

  return {
    async send(value: T) {
      sent++;

      if (waiting.length) {
        waiting.shift()!.resolve(value);
      } else if (length === undefined || sent <= length) {
        const deferred = new Deferred<void>();
        queue.push([value, deferred]);

        await deferred.promise;
      } else {
        throw new Error("Channel is full");
      }
    },
    async receive() {
      received++;

      let result;
      if (queue.length) {
        const queued = queue.shift()!;
        queued[1].resolve();
        result = queued[0];
      } else {
        const deferred = new Deferred<T>();
        waiting.push(deferred);
        result = await deferred.promise;
      }

      return result;
    },
    async *[Symbol.asyncIterator]() {
      while (length === undefined || received < length) {
        yield this.receive();
      }
    },
  };
}
