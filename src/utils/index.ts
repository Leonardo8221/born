import moment from "moment";

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
  // Return the formatted date string
  return moment.parseZone(date).format('DD/MM/YYYY');
};
