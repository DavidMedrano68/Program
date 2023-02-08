export function ship(length, color) {
  let hitCount = 0;
  function hit() {
    hitCount++;
  }
  function isSunk() {
    if (hitCount == length) {
      return true;
    } else {
      return false;
    }
  }
  return {
    length,
    hit,
    isSunk,
    color,
  };
}
