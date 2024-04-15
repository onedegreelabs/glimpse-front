export function getDateTextFromDateObj(dateObj: Date) {
  const kstDdateObj = new Date(dateObj.getTime() - 9 * 60 * 60 * 1000);
  const year = kstDdateObj.getFullYear();
  const month = String(kstDdateObj.getMonth() + 1).padStart(2, '0');
  const day = String(kstDdateObj.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export function getTimeTextFromDateObj(dateObj: Date) {
  const kstDdateObj = new Date(dateObj.getTime() - 9 * 60 * 60 * 1000);
  const hours = String(kstDdateObj.getHours()).replace(/^0+/, '');
  const minutes = String(kstDdateObj.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes} ${kstDdateObj.getHours() >= 12 ? 'PM' : 'AM'}`;
}

export function getQueryString(url: string): {[key: string]: string} {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex === -1) {
    return {}; // 쿼리스트링이 없는 경우 빈 객체 반환
  }

  const queryString = url.substring(queryStringIndex + 1);
  const queryParams: {[key: string]: string} = {};
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }

  return queryParams;
}
