export function ship(length) {
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
  };
}
