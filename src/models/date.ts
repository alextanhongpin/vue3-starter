export function formatDate(dateObj = new Date()) {
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;

  const hours = dateObj.getHours() % 12 ? dateObj.getHours() % 12 : 12;
  const minutes = dateObj.getMinutes();
  const meridan = dateObj.getHours() < 12 ? "AM" : "PM";
  return [
    [
      date.toString().padStart(2, "0"),
      month.toString().padStart(2, "0"),
      year,
    ].join("/"),
    [[hours, minutes].join(":"), meridan].join(" "),
  ].join(" ");
}
