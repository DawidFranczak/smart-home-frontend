const formatAquariumDate = (date: string) => {
  if (date.length > 5) return date.slice(0, 5);
  return date;
};

export default formatAquariumDate;
