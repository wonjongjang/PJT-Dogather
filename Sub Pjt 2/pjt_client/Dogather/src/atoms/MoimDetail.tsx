import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const optionName = atom({
  key: "optionName",
  default: "[]",
});
