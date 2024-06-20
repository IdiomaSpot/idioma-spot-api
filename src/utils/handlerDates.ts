const getFormattedDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
export const getFormattedCurrentDate = (): string => {
  const now = new Date();
  return getFormattedDate(now);
};

export const isNotValidDate = (date: Date): boolean => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date <= now;
};

export const parseStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Months are zero-based in JavaScript
};
