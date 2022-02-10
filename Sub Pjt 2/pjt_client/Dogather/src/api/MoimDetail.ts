const BASE_URL = `http://i6e104.p.ssafy.io/api/group`



export function FetchMoimGroupAPI(groupNo: string, userId:string, JWT:string) {
// const JWT = localStorage.getItem("login_token");
  return fetch(`${BASE_URL}/detail/${groupNo}`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId:userId,
    }
  }).then((res) => res.json())
}

export function FetchHomeMoimCard() {
  return fetch(`${BASE_URL}/list`).then((res) => res.json())
}
