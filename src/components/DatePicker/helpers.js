export default {
  compareDay(day1, day2) {
    const date1 = fecha.format(new Date(day1), "YYYYMMDD");
    const date2 = fecha.format(new Date(day2), "YYYYMMDD");

    if (date1 > date2) {
      return 1;
    } else if (date1 == date2) {
      return 0;
    } else if (date1 < date2) {
      return -1;
    }
  }
};
