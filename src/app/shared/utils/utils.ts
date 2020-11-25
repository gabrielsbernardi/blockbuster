export const getSimpleFilter = (field: string, value: any, ignoreCase = true) => {
  if (value === null || value === '') {
    return '';
  }

  if (ignoreCase) {
    return `&${field}_like=${value}`;
  }
  return `&${field}=${value}`;
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
