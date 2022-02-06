import { IMoimForm } from "../pages/Moim/CreateMoim";

export async function fetchGroup(data: IMoimForm) {
  return fetch("http://i6e104.p.ssafy.io:8090/group/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((response) => fetchProduct(data, response))
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
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
