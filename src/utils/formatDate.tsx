type DateFormat = "HH:mm DD.MM.YYYY" | "DD/MM/YYYY" | "DD/MM HH"| "DD/MM HH:MM:SS"|"DD-MM-YYYY"|"YYYY-MM-DD";

export default function formatDate(date: string|Date, format:DateFormat="HH:mm DD.MM.YYYY") {
    if (typeof date === "string") {
        date = new Date(date);
    }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  switch (format) {
      case "HH:mm DD.MM.YYYY":
          return `${hours}:${minutes} ${day}.${month}.${year} `;
      case "DD/MM/YYYY":
          return `${day}/${month}/${year}`
      case "DD/MM HH":
          return `${day}/${month} ${hours}`
      case "DD/MM HH:MM:SS":
          return `${day}/${month} ${hours}:${minutes}:${seconds}`
      case "DD-MM-YYYY":
          return `${day}-${month}-${year}`
      case "YYYY-MM-DD":
          return `${year}-${month}-${day}`
      default:
          const _exhaustiveCheck:never = format;
          throw new Error(`Unhandled sensor: ${_exhaustiveCheck}`);
  }
}
