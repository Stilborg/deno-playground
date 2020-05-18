import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Hello word test", () => {
  const x = 2 + 2;
  assertEquals(x, 4);
});
