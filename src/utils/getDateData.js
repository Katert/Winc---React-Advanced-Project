export const getDateData = (dateString, modifier) => {
  switch (modifier) {
    case "date":
      return dateString.split("T")[0];
    case "time":
      return new Date(dateString).toTimeString().slice(0, 5);
    default:
      console.log("Modifier unknown or missing.");
      return;
  }
};
