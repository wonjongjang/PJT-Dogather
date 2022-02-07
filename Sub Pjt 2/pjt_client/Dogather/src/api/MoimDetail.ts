const BASE_URL = `http://i6e104.p.ssafy.io:8090`

export function fetchMoimGroupAPI(groupNo:string) {
  return fetch(`${BASE_URL}/group/${groupNo}`).then((res) => res.json())
}

export function fetchHomeMoimCard() {
  return fetch(`${BASE_URL}/group/list`).then((res) => res.json())
}
