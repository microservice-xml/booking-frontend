export const formatDate = (date: string) => {
  let values = date.split("-");
  return `${values[0]}-${values[1]}-${values[2]}`;
};

export const formatDateNew = (date: any) => {
  return date;
};
