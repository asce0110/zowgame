import test from "node:test";
import assert from "node:assert/strict";

import { shouldLockPageScrollForGameKey } from "./game-input.ts";

test("locks browser scroll keys while the game player is open", () => {
  for (const key of ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar", "PageDown", "PageUp", "Home", "End"]) {
    assert.equal(shouldLockPageScrollForGameKey(key), true, key);
  }
});

test("locks common game movement keys without blocking unrelated shortcuts", () => {
  for (const key of ["w", "a", "s", "d", "e", "q", "r"]) {
    assert.equal(shouldLockPageScrollForGameKey(key), true, key);
  }

  assert.equal(shouldLockPageScrollForGameKey("f"), false);
  assert.equal(shouldLockPageScrollForGameKey("Escape"), false);
  assert.equal(shouldLockPageScrollForGameKey("Enter"), false);
});
