export const getDate = (date) => {
  const res =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  return res;
};
export const getName = (fullName, startIndex, endIndex) => {
  const relaxation = 3;
  let name = fullName + " ";
  const index = name.indexOf(" ", startIndex);
  if (index <= endIndex + relaxation) {
    return name.slice(0, index);
  } else {
    return name.slice(0, endIndex) + "...";
  }
};
