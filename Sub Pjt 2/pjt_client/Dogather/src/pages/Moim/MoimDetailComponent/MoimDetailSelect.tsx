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
  const [quantity, setQuantity] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const onColor = (event: any) => {
    console.log(event);
    setColor(event.target.value);
  };
  const onPurchase = (event: any) => {
    setIsHidden(false);
  };
  const onQuantity = (event: any) => {
    setQuantity(event.target.value);
  };

  // const [];
  return (
    <Container>
      <Content>
        <select onChange={onColor} placeholder="옵션을 선택해주세요.">
          <option value="0">옵션을 선택해주세요.</option>
          {options.color.map((color, idx) => (
            <option key={idx} value={color}>
              {color}
            </option>
          ))}
        </select>
        <input
          value={quantity}
          onChange={onQuantity}
          type="number"
          placeholder="수량을 입력해주세요."
        />
      </Content>
      <Content>
        <Cart onClick={onPurchase}>장바구니</Cart>
      </Content>
      <Content hidden={isHidden}>
        <span>옵션명 : {color}</span>
        <br />
        <span>수량 : {quantity}</span>
        <br />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: block;
`;

const Content = styled.div`
  display: flex;
  justify-content: right;
  font-size: 20px;
`;

const Cart = styled.button`
  font-size: 20px;
`;

export default MoimSelect;
