export default function isTokenValid() {
  const accessToken = localStorage.getItem('accessToken');
  // const newRfTokenId = localStorage.getItem('newRfTokenId');

  if (accessToken) {
    return true;
  } else {
    return false;
  }

  // 아래 refresh토큰으로 토큰 재발급 받는 api 완성되면 코드 추가 예정
}
