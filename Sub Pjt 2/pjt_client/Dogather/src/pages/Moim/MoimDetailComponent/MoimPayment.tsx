import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import KakaoPay from "../KakaoPay";
import { IProductContent } from "../MoimDetail";

interface RouteState {
  state: {
    groupNo: string;
    products: Array<IProductContent>;
    price: number;
    img: string;
  };
}

function MoimPayment() {
  const { state } = useLocation() as RouteState;
  console.log(state);
  // console.log(state.groupNo);
  return (
    <Container>
      <Wrapper>
        <PaymentItem>
          <ProductWrapper>
            <ProductImgWrapper>
              <ProductImg src={state.img} alt={"결제 아이템 이미지"} />
            </ProductImgWrapper>
          </ProductWrapper>
        </PaymentItem>
        <PaymentItem></PaymentItem>
        <PaymentItem></PaymentItem>
        <PaymentItem></PaymentItem>
        <PaymentItem></PaymentItem>
        <PaymentItem></PaymentItem>
        <PaymentItem>
          <PaymentWrapper>
            <KakaoPayButton>
              <KakaoPay
                groupNo={state.groupNo!}
                products={state.products}
                price={state.price}
              />
            </KakaoPayButton>
          </PaymentWrapper>
        </PaymentItem>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: whitesmoke;
`;
const Wrapper = styled.div``;
const PaymentItem = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 5px;
`;
const ProductWrapper = styled.div``;
const ProductImgWrapper = styled.div``;
const ProductImg = styled.img``;
const PriceWrapper = styled.div``;
const PaymentWrapper = styled.div``;
const KakaoPayButton = styled.button``;
const TotalPriceWrapper = styled.div``;

export default MoimPayment;
