import { passwordHash } from "./auth";

test("hash password correctly", () => {
  expect(passwordHash("test")).toBe("cac76f43eb9243de03d52a0d12702d268fb101f50446af58a8c18985824c9587");
});
