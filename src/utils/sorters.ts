export const sortWithDate = (
  date1: Date | string,
  date2: Date | string,
  ascendingOrder: boolean = false
) => {
  const d1 = new Date(date1).valueOf();
  const d2 = new Date(date2).valueOf();

  return ascendingOrder ? d1 - d2 : d2 - d1;
};

export const sortWithCharacters = (
  str1: string,
  str2: string,
  ascendingOrder: boolean = false
) => {
  return ascendingOrder ? str1.localeCompare(str2) : str2.localeCompare(str1);
};
