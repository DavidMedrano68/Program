export const hasProto = () => {
  Array.prototype.Has = function (arr) {
    return this.some((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    });
  };
};
export const randomCoord = (min = 0, max = 9) => {
  const y = Math.floor(Math.random() * (max - min)) + min;
  const x = Math.floor(Math.random() * (max - min)) + min;
  return [y, x];
};
