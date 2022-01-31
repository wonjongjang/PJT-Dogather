const BASE_URL = `http://i6e104.p.ssafy.io:8090/user`;

export async function fetchNickname(coinId: string) {
  return fetch(`${BASE_URL}/idcheck?id=${coinId}`).then((response) =>
    response.json()
  );
}
