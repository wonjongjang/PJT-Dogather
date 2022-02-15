const BASE_URL = "http://i6e104.p.ssafy.io/api";

export async function fetchMyPage(JWT: string, userId: string) {
  return fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId: userId,
    },
  }).then((response) => response.json());
  // .then(result=> console.log(re))
}
