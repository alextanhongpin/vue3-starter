enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

const DAYS = "Sun Mon Tue Wed Thu Fri Sat Sun".split(" ");

export function shortDay(day: Day) {
  return DAYS?.[day] || "";
}

export default Day;
