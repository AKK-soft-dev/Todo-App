const sortWithDate = (
  date1: Date | string,
  date2: Date | string,
  ascendingOrder: boolean = false
) => {
  const d1 = new Date(date1).valueOf();
  const d2 = new Date(date2).valueOf();

  return ascendingOrder ? d1 - d2 : d2 - d1;
};

export default sortWithDate;
