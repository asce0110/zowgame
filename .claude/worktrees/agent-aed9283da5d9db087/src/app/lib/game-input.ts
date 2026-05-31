const GAME_SCROLL_LOCK_KEYS = new Set([
  "arrowup",
  "arrowdown",
  "arrowleft",
  "arrowright",
  " ",
  "spacebar",
  "pagedown",
  "pageup",
  "home",
  "end",
  "w",
  "a",
  "s",
  "d",
  "e",
  "q",
  "r",
]);

export function shouldLockPageScrollForGameKey(key: string) {
  return GAME_SCROLL_LOCK_KEYS.has(key.toLowerCase());
}
