export const getFormatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(d.getTime())) {
    return ''; // 잘못된 날짜 대응
  }

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd}.`;
};
