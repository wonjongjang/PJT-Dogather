import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); // 로컬 스토리지에 저장 (새로고침 초기화 방지)

// 로그인 여부 확인
export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

// user pk 저장
export const userIdAtom = atom({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
