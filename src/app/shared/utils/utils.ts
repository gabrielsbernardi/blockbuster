export const getSimpleFilter = (field: string, value: any, ignoreCase = true, startFilter = false) => {
  if (value === null || value === '') {
    return '';
  }

  let filter = startFilter ? '?' : '&';

  if (ignoreCase) {
    return `${filter}${field}_like=${value}`;
  }
  return `${filter}${field}=${value}`;
};

export const getRangeFilter = (field: string, initial: any, final: any) => {
  let filter = '';
  if (initial != null) {
    filter = `&${field}_gte=${initial}`;
  }

  if (final != null) {
    filter += `&${field}_lte=${final}`;
  }
  return filter;
};
