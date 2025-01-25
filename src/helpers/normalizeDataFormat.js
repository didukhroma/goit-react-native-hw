export const normalizeDataFormat = (data) => {
  const date = new Date(data).toUTCString().split(' ');

  const time = date[4].split(':').slice(0, 2).join(':');

  const months = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  const result = `${date[1]} ${months[date[2]]} ${date[3]} | ${time}`;
  return result;
};
