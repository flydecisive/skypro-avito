export const createLabel = (data: String) => {
  const normalizeData = data.slice(data.indexOf(" ")).trim();
  const firstLetter = normalizeData.slice(0, 1).toUpperCase();
  const remainingPart = normalizeData.slice(1);

  return firstLetter + remainingPart;
};
