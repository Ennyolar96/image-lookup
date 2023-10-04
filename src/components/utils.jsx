export const EmptyArr = (arr) => {
  if (arr !== undefined && arr !== null && arr.length > 0) {
    return false;
  }
  return true;
};
