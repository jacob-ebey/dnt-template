import { assertEquals } from "asserts";

import { Deferred } from "../mod.ts";

Deno.test("deferred resolves promise", async () => {
  const deferred = new Deferred<number>();
  deferred.resolve(1);

  const value = await deferred.promise;
  assertEquals(value, 1);
});

Deno.test("deferred rejects promise", async () => {
  const deferred = new Deferred<number>();
  deferred.reject(new Error("test"));

  try {
    await deferred.promise;
    throw new Error("Promise should have rejected");
  } catch (error) {
    assertEquals(error.message, "test");
  }
});
