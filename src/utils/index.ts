export const flattenObject = (obj: any, prefix = '') => {
  let result: any = {};
  for (let key in obj) {
    let newPrefix = prefix + key + '_';
    if (typeof obj[key] === 'object') {
      let subObj = obj[key];
      let flattenedSubObj = flattenObject(subObj, newPrefix);
      for (let subKey in flattenedSubObj) {
        result[subKey] = flattenedSubObj[subKey];
      }
    } else {
      result[newPrefix.slice(0, -1)] = obj[key];
    }
  }
  return result;
};

export const formatDate = (date?: Date | null | undefined) => {
  if (!date) return;
  const formatedDate = new Date(date);
  // // Get the day, month, and year from the date object
  const day = formatedDate.getDate().toString().padStart(2, '0');
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formatedDate.getFullYear().toString();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
};
