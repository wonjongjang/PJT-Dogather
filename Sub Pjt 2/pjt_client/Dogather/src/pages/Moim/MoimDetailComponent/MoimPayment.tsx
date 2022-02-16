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
    productName: string;
    productDetail: string;
    categoryName: string;
    leaderName: string;
    basePrice: number;
  };
}

function MoimPayment() {
  const { state } = useLocation() as RouteState;
  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log(state);
  // console.log(state.groupNo);
  return (
    <Container>
      <Wrapper>
        <PaymentItem style={{ backgroundColor: "whitesmoke" }}>
          <Title>{"주문결제"}</Title>
        </PaymentItem>
        <PaymentWrapper>
          {state.products.map((p, idx) => (
            <>
              <PaymentItem key={idx}>
                <ProductWrapper>
                  <ProductImgWrapper>
                    <ProductImg src={state.img} alt={"결제 아이템 이미지"} />
                  </ProductImgWrapper>
                </ProductWrapper>
                <ProductWrapper>
                  <ProductContent>
                    <CategoryName>{state.categoryName}</CategoryName>
                    <LeaderName>{state.leaderName}</LeaderName>
                    <ProductTitle>{state.productName}</ProductTitle>
                    <ProductDetail>{state.groupNo}</ProductDetail>
                    <OptionWrapper>
                      <ProductOptions>
                        {"옵션 : " +
                          p.optionName +
                          " / " +
                          "+" +
                          makeComma(p.price) +
                          "원"}
                      </ProductOptions>
                    </OptionWrapper>
                  </ProductContent>
                </ProductWrapper>
                <ProductWrapper
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ProductAmountWrapper>
                    <ProductAmount>{p.amount + "개"}</ProductAmount>
                  </ProductAmountWrapper>
                </ProductWrapper>
                <ProductWrapper
                  style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    borderRight: "0px",
                  }}
                >
                  <ProductPriceWrapper>
                    <ProductPrice>
                      {makeComma((state.basePrice + p.price) * p.amount) + "원"}
                    </ProductPrice>
                  </ProductPriceWrapper>
                </ProductWrapper>
              </PaymentItem>
            </>
          ))}
        </PaymentWrapper>
        <PaymentWrapper>
          <AddressWrapper>
            <AddressImgWrapper>
              <AddressImg
                src={process.env.PUBLIC_URL + "/img/배송로고.png"}
                alt={"배송로고이미지"}
              />
            </AddressImgWrapper>
            <AddressItem>
              <AddressTitle>{"배송주소"}</AddressTitle>
              <AddressContent>{"유저배송주소"}</AddressContent>
            </AddressItem>
          </AddressWrapper>
        </PaymentWrapper>
        <PaymentWrapper></PaymentWrapper>
        <PaymentWrapper></PaymentWrapper>
        <PaymentWrapper></PaymentWrapper>
        <PaymentWrapper></PaymentWrapper>
        <PaymentWrapper>
          <PaymentItem>
            <ButtonWrapper>
              <KakaoPayButton>
                <KakaoPay
                  groupNo={state.groupNo!}
                  products={state.products}
                  price={state.price}
                />
              </KakaoPayButton>
            </ButtonWrapper>
          </PaymentItem>
        </PaymentWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Wrapper = styled.div`
  width: 960px;
  margin-top: 30px;
`;

const PaymentWrapper = styled.div`
  border-radius: 20px;
  width: 100%;
  margin-bottom: 10px;
`;
const PaymentItem = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
`;
const ProductWrapper = styled.div`
  border: 1px solid lightgrey;
  border-left: 0px;
`;
const ProductImgWrapper = styled.div`
  margin: 15px;
  width: 135px;
  display: flex;
  justify-content: center;
`;
const AddressImgWrapper = styled.div`
  margin: 15px;
  width: 50px;
  display: flex;
  justify-content: center;
`;
const AddressImg = styled.img`
  width: 80px;
  height: auto;
  margin: 15px;
`;
const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  /* margin: 10px; */
`;
const ProductContent = styled.div`
  margin: 15px;
  width: 500px;
`;
const LeaderName = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
`;
const CategoryName = styled.p`
  display: flex;
  align-items: center;
  color: grey;
  font-size: 12px;
  margin-bottom: 3px;
`;
const ProductTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
`;
const AddressTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 15px;
`;
const AddressContent = styled.p`
  font-size: 14px;
  margin: 15px;
`;
const AddressItem = styled.div`
  margin: 15px;
  /* margin-top: 10px; */
`;
const ProductDetail = styled.p`
  margin-bottom: 3px;
  word-spacing: 2px;
  font-size: 14px;
  line-height: 20px;
  flex-wrap: wrap;
  overflow: visible;
`;
const AddressWrapper = styled.div`
  background-color: white;
  display: flex;
  /* margin: 15px; */
`;
const ProductPriceWrapper = styled.div`
  margin: 15px;
  width: 100px;
`;
const ProductPrice = styled.p``;
const OptionWrapper = styled.div`
  display: flex;
`;
const ProductOptions = styled.p`
  color: grey;
  font-size: 14px;
  /* font-weight: bold; */
  margin-top: 10px;
`;
const ProductAmountWrapper = styled.div`
  margin: 15px;
  width: 100px;
  text-align: center;
`;
const ProductAmount = styled.p``;
const PriceWrapper = styled.div``;
const ButtonWrapper = styled.div``;
const KakaoPayButton = styled.button``;
const TotalPriceWrapper = styled.div``;

export default MoimPayment;
