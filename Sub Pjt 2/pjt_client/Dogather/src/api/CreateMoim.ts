import { IMoimForm } from "../pages/Moim/CreateMoim";

export async function fetchGroup(data: IMoimForm) {
  console.log(data);
  return fetch("http://i6e104.p.ssafy.io:8090/group/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
  // .then((result) => navigate(`/moim/${result}`))

  // .catch((error) => console.log(error));
}
