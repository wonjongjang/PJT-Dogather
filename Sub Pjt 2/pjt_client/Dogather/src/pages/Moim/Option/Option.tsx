import { useRecoilState, useRecoilValue } from "recoil";
import { IOption, OptionsAtom } from "../../../atoms/Options";

function Option({ id, optionName, optionPrice }: IOption) {
  const [options, setOptions] = useRecoilState(OptionsAtom);
  // console.log(id, option_name, option_price);

  const onClick = () => {
    // console.log(options);
    setOptions((prev) => {
      const targetIndex = prev.findIndex((option) => option.id === id);
      // console.log(targetIndex);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });
  };

  return (
    <li>
      <span>{optionName} </span>
      <span>{optionPrice} </span>
      <button onClick={onClick}>삭제</button>
    </li>
  );
}

export default Option;
