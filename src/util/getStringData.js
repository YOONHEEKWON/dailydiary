export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let mydate = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (mydate < 10) {
    mydate = `0${mydate}`;
  }
  return `${year}-${month}-${mydate}`;
};
