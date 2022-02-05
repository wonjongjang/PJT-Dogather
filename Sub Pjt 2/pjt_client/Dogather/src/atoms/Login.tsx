import { atom, selector } from "recoil";

// 로그인 여부 확인
export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

// user pk 저장
export const userIdAtom = atom({
  key: "userId",
  default: "",
});
