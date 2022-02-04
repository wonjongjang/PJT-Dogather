import { IMoimForm } from "../pages/Moim/CreateMoim";

export async function fetchGroup(data: IMoimForm) {
  return fetch("http://i6e104.p.ssafy.io:8090/group/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((res) => fetchProduct(data, res))
    .catch((error) => console.log(error));
}

export async function fetchProduct(data: IMoimForm, groupId: string) {
  return fetch(`http://i6e104.p.ssafy.io:8090/product/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, groupNo: groupId }),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}
