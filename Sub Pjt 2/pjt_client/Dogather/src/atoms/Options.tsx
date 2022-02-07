import { atom } from "recoil";

export interface IOption {
  id: number;
  option_name: string;
  option_price: number;
}

export const OptionsAtom = atom<IOption[]>({
  key: "Options",
  default: [],
});
