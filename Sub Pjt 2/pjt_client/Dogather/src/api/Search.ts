const BASE_URL = "http://i6e104.p.ssafy.io/api";

export async function fetchSearch(keyword: string, option: string) {
  return fetch(`${BASE_URL}/group/search?page=1&${option}=${keyword}`).then(
    (response) => response.json()
  );
}
