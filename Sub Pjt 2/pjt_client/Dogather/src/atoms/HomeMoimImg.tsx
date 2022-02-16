import { atom } from "recoil";

export const ImgAtom = atom({
  key: "Imgs",
  default: process.env.PUBLIC_URL + "/img/Dogather로고.png",
});

export const myPageImgAtom = atom({
  key: "Imgs",
  default: process.env.PUBLIC_URL + "/img/마이페이지.png",
});
