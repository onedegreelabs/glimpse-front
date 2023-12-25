export default function getQueryString(url: string): {[key: string]: string} {
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
