/* 옵션 리스트 */

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IOption, OptionsAtom } from "../../../../atoms/Options";

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
    <List>
      <Element>{optionName} </Element>
      <Element>{optionPrice} </Element>
      <Element>
        <Button onClick={onClick}>삭제</Button>
      </Element>
    </List>
  );
}

const List = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
  border: 1px solid whitesmoke;
`;

const Element = styled.div`
  width: 100%;
  word-break: break-all;
  font-size: 14px;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #c23616;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export default Option;
