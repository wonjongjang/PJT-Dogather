import { useState } from "react";
import styled from "styled-components";

interface ISelect {}

function MoimSelect() {
  const options = {
    color: ["red", "blue", "black", "white", "brown"],
    size: [220, 230, 240, 250, 260],
    extra: ["하석이", "똥", "급처", "합니다", "냠냠"],
  };

  const [color, setColor] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const onColor = (event: any) => {
    console.log(event);
    setColor(event.target.value);
  };
  const onPurchase = (event: any) => {
    setIsHidden(false);
  };

  // const [];
  return (
    <Container>
      <Content>
        <span>
          <select onChange={onColor}>
            <option value="0">옵션을 선택해주세요.</option>
            {options.color.map((color) => (
              <option value={color}>{color}</option>
            ))}
          </select>
        </span>
      </Content>
      <Content>
        <Cart onClick={onPurchase}>장바구니</Cart>
      </Content>
      <Content hidden={isHidden}>
        <span>옵션명 : {color}</span>
        <br />
        <span>수량 : {}</span>
        <br />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: block;
`;

const Content = styled.div`
  display: block;
  font-size: 20px;
`;

const Cart = styled.button`
  font-size: 20px;
`;

export default MoimSelect;
