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
  // .then((res) => console.log(res))
}

export function FetchHomeRecommendedMoimCard() {
  return fetch(`${BASE_URL}/list`).then((res) => res.json())
}

export function FetchHomeNewMoimCard() {
  return fetch(`${BASE_URL}/new`).then((res) => res.json())
}

export function FetchHomeHotMoimCard() {
  return fetch(`${BASE_URL}/hot`).then((res) => res.json())
}

export function FetchMoimMediaAPI(mediaNo:number) {
  return fetch(`${BASE_URL}/image/${mediaNo}`).then((res) => res.json())
}