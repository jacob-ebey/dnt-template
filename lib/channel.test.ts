import { assertEquals } from "asserts";

import { channel } from "./channel.ts";

Deno.test("channel sends and receives values", async () => {
  const ch = channel<number>();

  const sendPromises = [ch.send(1), ch.send(2), ch.send(3)];

  assertEquals(await ch.receive(), 1);
  assertEquals(await ch.receive(), 2);
  assertEquals(await ch.receive(), 3);

  await Promise.all(sendPromises);
});

Deno.test("channel doesn't allow sending more than length", async () => {
  const ch = channel<number>(1);

  const receive = ch.receive();

  await ch.send(1);

  try {
    await ch.send(2);
    throw new Error("Channel should be full");
  } catch (error) {
    assertEquals(error.message, "Channel is full");
  }

  assertEquals(await receive, 1);
});

Deno.test("channel allows async iteration", async () => {
  const ch = channel<number>(3);

  const sendPromises = [ch.send(1), ch.send(2), ch.send(3)];

  let i = 1;
  for await (const value of ch) {
    assertEquals(value, i++);
  }

  await Promise.all(sendPromises);
});
