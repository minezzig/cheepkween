export const todaysDate = () => {
  const date = new Date();
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  const todaysDate = `${year}-${month}-${day}`;
  return todaysDate;
};
