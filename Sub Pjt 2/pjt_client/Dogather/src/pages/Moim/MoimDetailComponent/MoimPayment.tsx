import { width } from "@mui/system";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FetchUserInfoAPI } from "../../../api/MoimDetail";
import { userIdAtom, userNoAtom } from "../../../atoms/Login";
import KakaoPay from "../KakaoPay";
import { IProductContent } from "../MoimDetail";

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

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
  const JWT = localStorage.getItem("login_token");
  const userId = useRecoilValue(userIdAtom);
  const userNo = useRecoilValue(userNoAtom);
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTimeout(() => setTime(1), 500);
  }, []);

  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log(state);

  const { isLoading: userLoading, data: userData } = useQuery<any>(
    ["group", userNo, JWT, userId],
    () => FetchUserInfoAPI(userNo, JWT!, userId!)
  );
  console.log(userData);
  // console.log(state.groupNo);

  const handlePayment = () => {
    const { IMP } = window;
    IMP?.init("imp60712675");
    // const amount: number =
    //   priceSelections
    //     .filter((price) => price.value === order.price)
    //     .map((price) => price.amount)[0] || 0
    // if (!amount) {
    //   alert('결제 금액을 확인해주세요')
    //   return
    // }

    const data: RequestPayParams = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `${userNo!}_${state?.groupNo!}`,
      name: `${state?.productName!}`,
      // amount부분은 수정 필요
      amount: Number(`${state?.price!}`),
      buyer_name: `${userId!}`,
    };
    // console.log(price);

    // const formData = new FormData();

    // formData.append(
    //   "paymentList",
    //   new Blob([JSON.stringify(paymentData)], { type: "application/json" })
    // );
    // console.log(products);
    const paymentData = {
      payments: state.products,
    };

    const JWT = localStorage.getItem("login_token");

    const callback = (response: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } =
        response;
      if (success) {
        console.log(paymentData);
        fetch("http://i6e104.p.ssafy.io/api/payment", {
          method: "POST",
          headers: {
            jwt: `${JWT}`,
            userId: userId,
            "Content-Type": "application/json",
          },
          // body: formData,
          body: JSON.stringify(paymentData),
        });
        alert("결제가 완료됐습니다.");
        console.log(response);
      } else {
        console.log(error_msg);
        alert("결제가 취소됐습니다.");
      }
    };

    IMP?.request_pay(data, callback);
  };

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
            <AddressItem>
              <Address>
                <AddressTitle>{"배송 주소"}</AddressTitle>
              </Address>
              <Address>
                <AddressContentWrapper>
                  <AddressContentTitle>{"받는 분"}</AddressContentTitle>
                  <AddressContentTitle>{"연락처"}</AddressContentTitle>
                  <AddressContentTitle>{"배송 주소"}</AddressContentTitle>
                </AddressContentWrapper>
                <AddressContentWrapper>
                  <AddressContentDetail>
                    {userData?.userName}
                  </AddressContentDetail>
                  <AddressContentDetail>
                    {userData?.userTel}
                  </AddressContentDetail>
                  <AddressContentDetail>
                    {userData?.userAddr + userData?.userAddrDetail}
                  </AddressContentDetail>
                </AddressContentWrapper>
              </Address>
            </AddressItem>
          </AddressWrapper>
        </PaymentWrapper>
        <PaymentWrapper>
          <AddressWrapper>
            <AddressMethod>
              <Address>
                <AddressTitle>{"배송 방법"}</AddressTitle>
              </Address>
              <AddressImgWrapper>
                <Address>
                  <AddressImg
                    src={process.env.PUBLIC_URL + "/img/배송로고.png"}
                    alt={"배송로고이미지"}
                  />
                </Address>
                <Address>
                  <AddressMethodContent>
                    <AddressContentDetail
                      style={{
                        margin: "0px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "18px",
                      }}
                    >
                      {"무료배송"}
                    </AddressContentDetail>
                    <AddressContentDetail
                      style={{ margin: "0px", display: "flex" }}
                    >
                      {"지금 결제시 무료배송"}
                      <AddressMethodContentDetail
                        style={{ marginLeft: "10px", color: "#0097e6" }}
                      >
                        {"모임완료 시 당일배송 예정"}
                      </AddressMethodContentDetail>
                    </AddressContentDetail>
                  </AddressMethodContent>
                </Address>
              </AddressImgWrapper>
            </AddressMethod>
          </AddressWrapper>
        </PaymentWrapper>
        <PaymentWrapper>
          <AddressWrapper>
            <AddressItem style={{ width: "100%" }}>
              <Address>
                <AddressTitle>{"최종 주문 정보"}</AddressTitle>
              </Address>
              <Address
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  borderBottom: "3px solid lightgrey",
                }}
              >
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    fontSize: "20px",
                  }}
                >
                  {"총 결제금액"}
                </AddressTitle>
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginRight: "15px",
                    marginBottom: "15px",
                    color: "tomato",
                  }}
                >
                  {makeComma(state.price) + "원"}
                </AddressTitle>
              </Address>
              <Address
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "15px",
                  // borderBottom: "3px solid lightgrey",
                }}
              >
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    fontSize: "16px",
                    fontWeight: "normal",
                  }}
                >
                  {"즉시 구매가"}
                </AddressTitle>
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginRight: "15px",
                    marginBottom: "15px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {makeComma(state.price) + "원"}
                </AddressTitle>
              </Address>
              <Address
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",

                  // borderBottom: "3px solid lightgrey",
                }}
              >
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    fontSize: "14px",
                    color: "#b6b7b9",
                    fontWeight: "normal",
                  }}
                >
                  {"배송비"}
                </AddressTitle>
                <AddressTitle
                  style={{
                    margin: "0px",
                    marginRight: "15px",
                    marginBottom: "15px",
                    // fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {"무료"}
                </AddressTitle>
              </Address>
            </AddressItem>
          </AddressWrapper>
        </PaymentWrapper>
        <PaymentWrapper>
          <AddressWrapper>
            <AddressItem style={{ width: "100%" }}>
              <Address>
                <AddressTitle style={{ fontSize: "24px" }}>
                  {"결제 방법"}
                </AddressTitle>
              </Address>
              <Address style={{ width: "100%", display: "block" }}>
                <AddressTitle
                  style={{ marginBottom: "20px", fontSize: "20px" }}
                >
                  {"간편 결제"}
                </AddressTitle>
                <AddressSimplePay
                  style={{
                    border: "2px solid lightgrey",
                    borderRadius: "15px",
                    backgroundColor: "#f5f6fa",
                    width: "98%",
                    display: "flex",
                    marginLeft: "10px",
                    marginRight: "10px",
                    // alignItems: "center",
                    marginBottom: "20px",
                    height: "auto",
                  }}
                >
                  <AddressTitle
                    style={{
                      marginTop: "30px",
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {"카드를 등록해주세요 >"}
                  </AddressTitle>
                </AddressSimplePay>
              </Address>
              <Address>
                <AddressTitle
                  style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                >
                  {"일반 결제"}
                </AddressTitle>
                <AddressTitle
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    marginLeft: "0px",
                    marginTop: "23px",
                    color: "#a0a1a1",
                  }}
                >
                  {"일시불・할부"}
                </AddressTitle>
              </Address>
              <Address
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "10px",
                }}
              >
                <AddressSimplePay
                  style={{
                    border: "2px solid lightgrey",
                    borderRadius: "15px",
                    backgroundColor: "#ffffff",
                    width: "50%",
                    display: "flex",
                    marginLeft: "10px",
                    marginRight: "10px",
                    // alignItems: "center",
                    marginBottom: "10px",
                    height: "65px",
                  }}
                >
                  <AddressTitle
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {"신용/체크카드"}
                  </AddressTitle>
                </AddressSimplePay>
                <AddressSimplePay
                  style={{
                    border: "2px solid lightgrey",
                    borderRadius: "15px",
                    backgroundColor: "#ffffff",
                    width: "50%",
                    display: "flex",
                    // marginLeft: "10px",
                    // marginRight: "10px",
                    // alignItems: "center",
                    marginBottom: "10px",
                    height: "65px",
                  }}
                >
                  <AddressTitle
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {"네이버페이"}
                  </AddressTitle>
                </AddressSimplePay>
              </Address>
              <Address
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "10px",
                }}
              >
                <AddressSimplePay
                  onClick={handlePayment}
                  style={{
                    border: "2px solid lightgrey",
                    borderRadius: "15px",
                    backgroundColor: "#ffffff",
                    width: "50%",
                    display: "flex",
                    marginLeft: "10px",
                    marginRight: "10px",
                    // alignItems: "center",
                    marginBottom: "20px",
                    height: "65px",
                    cursor: "pointer",
                  }}
                >
                  <AddressTitle
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {"카카오페이"}
                    <KakaoPay
                      groupNo={state.groupNo!}
                      products={state.products}
                      price={state.price}
                    />
                  </AddressTitle>
                </AddressSimplePay>
                <AddressSimplePay
                  style={{
                    border: "2px solid lightgrey",
                    borderRadius: "15px",
                    backgroundColor: "#ffffff",
                    width: "50%",
                    display: "flex",
                    // marginLeft: "10px",
                    // marginRight: "10px",
                    // alignItems: "center",
                    marginBottom: "20px",
                    height: "65px",
                  }}
                >
                  <AddressTitle
                    style={{
                      marginTop: "20px",
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    {"무통장결제"}
                  </AddressTitle>
                </AddressSimplePay>
              </Address>
            </AddressItem>
          </AddressWrapper>
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
  /* margin: 15px; */
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  /* justify-content: center; */
`;
const AddressMethodContent = styled.div``;
const AddressMethodContentDetail = styled.p``;
const AddressImg = styled.img`
  width: 50px;
  height: auto;
  margin: 15px;
  margin-right: 0px;
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
  font-size: 24px;
  font-weight: bold;
  margin: 15px;
  margin-bottom: 30px;
`;
const AddressContentTitle = styled.p`
  font-size: 16px;
  color: grey;
  opacity: 0.7;
  margin-left: 15px;
  margin-bottom: 10px;
`;
const AddressContentDetail = styled.p`
  font-size: 16px;
  margin-left: 15px;
  margin-bottom: 10px;
`;

const AddressItem = styled.div`
  margin: 15px;
  /* margin-top: 10px; */
`;
const Address = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
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
const AddressContentWrapper = styled.div`
  margin-right: 30px;
`;
const AddressMethod = styled.div`
  margin: 15px;
  width: 100%;
  /* border: 2px solid black; */
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
const AddressSimplePay = styled.div``;
const ProductAmount = styled.p``;
const PriceWrapper = styled.div``;
const ButtonWrapper = styled.div``;
const KakaoPayButton = styled.button``;
const TotalPriceWrapper = styled.div``;

export default MoimPayment;
