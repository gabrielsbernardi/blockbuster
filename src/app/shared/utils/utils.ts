import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const getSimpleFilter = (field: string, value: any, ignoreCase = true, startFilter = false) => {
  if (value === null || value === '') {
    return '';
  }

  const filter = startFilter ? '?' : '&';

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

export const generatePDF = (name: string, head: string[][], body: string[][]) => {
  const doc = new jsPDF('l', 'pt', 'a3');
  autoTable(doc, {
    head,
    body
  });
  doc.save (`${name}.pdf`);
};
