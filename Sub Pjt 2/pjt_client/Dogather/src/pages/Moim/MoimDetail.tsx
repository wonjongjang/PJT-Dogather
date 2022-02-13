import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { CardMedia, Input, Stack } from "@mui/material";
import { FetchMoimGroupAPI, FetchMoimMediaAPI } from "../../api/MoimDetail";
// import { Audio, Hearts } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Product from "./MoimDetailComponent/MoimTabs/MoimProduct";
import FAQ from "./MoimDetailComponent/MoimTabs/MoimFAQ";
import Review from "./MoimDetailComponent/MoimTabs/MoimReview";
import Refund from "./MoimDetailComponent/MoimTabs/MoimRefund";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "../../atoms/Login";
import Hoodie from "../../img/Hoodie.png";
import MoimDetailImg from "./MoimDetailComponent/MoimDetailImg";
import KakaoPay from "./KakaoPay";

interface RouteState {
  state: {
    name: string;
  };
}

interface IProductData {
  group: number;
  products: object;
}

export interface IOptionsData {
  optionName: string;
  optionPrice: number;
}

export interface IGroupData {
  groupNo: number;
  groupLeader: number;
  categoryNo: number;
  deadline: string;
  created: string;
  maxPeople: number;
  view: number;
  status: string;
  product: string; // 상품이름
  detail: string; // 상품상세정보
  link: string; // 상품링크
  originPrice: number; // 출시가
  price: number; // 공구가
  mainImage: string;
  options: Array<IOptionsData>;
  mediaList: Array<string>;
  faqList: Array<object>;
}
function MoimDetail() {
  // useEffect(() => {
  //   (async () => {
  //     const productData = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/product/78`)
  //     ).json();
  //     const data = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/78`)
  //     ).json();
  //     const groupList = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/list`)
  //     ).json();
  //     console.log(productData, data);
  //     console.log(groupList);
  //   })();
  // }, []);

  // groupNo에 따라 페이지가 변경되므로 그룹No가 넘어갈 수 있도록 해야함.
  const { groupNo } = useParams();
  console.log(groupNo);

  const { state } = useLocation() as RouteState;
  const productMatch = useMatch("/moim/:groupNo");
  const faqMatch = useMatch("/moim/:groupNo/faq");
  const reviewMatch = useMatch("/moim/:groupNo/review");
  const refundMatch = useMatch("/moim/:groupNo/refund");

  const userId = useRecoilValue(userIdAtom);
  const JWT = localStorage.getItem("login_token");

  const { isLoading: groupLoading, data: groupData } = useQuery<IGroupData>(
    ["group", groupNo, userId, JWT],
    () => FetchMoimGroupAPI(groupNo!, userId!, JWT!)
  );

  console.log(groupData?.options);
  console.log(groupLoading);
  console.log(groupData);
  console.log(groupData?.mediaList[0]);

  // const loading = productLoading || isLoading;

  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setHidden(false);
    }, 100);
  }, []);

  const basePrice = groupData?.price;
  const [options, setOption] = React.useState<string[]>([]);
  const [sum, setSum] = React.useState(0);

  const [sumPrice, setSumPrice] = React.useState(0);
  const [productOption, setProductOption] = useState(groupData?.options);
  const [optionIdx, setOptionIdx] = useState(0);
  const [optionPrice, setOprionPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isHidden, setIsHidden] = useState(true);
  const [optionHidden, setOptionHidden] = useState(true);
  const [price, setPrice] = useState(groupData?.price);
  console.log(price);

  // const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const _options = options.filter((o, idx) => {
  //     if (o !== e.target.value) {
  //       return o;
  //     }
  //   });
  //   let price = Number(e.target.value.slice(-7, -1).split(",").join("").trim());
  //   setOption([
  //     ..._options,
  //     { text: e.target.value, num: 1, prd: prd, sum: price },
  //   ]);
  //   setSum(sum + price);
  //   setHidden(false);
  //   setOptionIdx(Number(e.target.value));
  // };

  // console.log(options);
  // console.log(options[0].optionName);
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const value = event.target.value;
    // console.log(typeof event.target.value);
    const _options: string[] = options.filter((i) => {
      if (i !== event.target.value) {
        return i;
      }
    });
    // const _quantitys: string[] = quantity.filter((q) => {
    //   if ()
    // })
    setOption([..._options, value]);
    // setQuantity([])
    // setPrice([])
    setIsHidden(false);
    setOptionIdx(Number(event.target.value));
  };
  //처음 랜더링되고 유저에게 보이는 수량의 값이 0일 필요가 없기 때문에 초기값으로 1로 주었다.

  const increaseQuantity = () => {
    setQuantity((prevCount) => prevCount + 1);
    setPrice(() => price! + basePrice!);
  };
  const decreaseQuantity = () => {
    setQuantity((prevCount) => prevCount - 1);
    setPrice(() => price! - basePrice!);
  };
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(Number(value));
    console.log(value);
  };
  const mainImgAddress = "/doimage/" + groupData?.mainImage;
  console.log(groupData?.mainImage);
  const detailImgAddress = "/doimage/" + groupData?.mediaList[0];
  console.log(mainImgAddress, detailImgAddress);

  const time = Date.now();
  console.log(time);
  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <MoimWrapper>
        {loading ? null : (
          <>
            <Overview>
              <ImgWrapper>
                <Img
                  src={process.env.PUBLIC_URL + "/img/Hoodie.png"}
                  alt={"메인 이미지"}
                />
                {/* <Img
                src={process.env.PUBLIC_URL + mainImgAddress}
                alt={process.env.PUBLIC_URL + mainImgAddress}
              />
              <Img
                src={process.env.PUBLIC_URL + detailImgAddress}
                alt={process.env.PUBLIC_URL + detailImgAddress}
              /> */}
                {/* <MoimDetailImg /> */}
              </ImgWrapper>
              <OverviewItem>
                <Link to={"여기 주소는 카테고리 검색으로"}>
                  <img
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "120px",
                      height: "20px",
                      marginBottom: "3px",
                    }}
                    src={process.env.PUBLIC_URL + "/img/베스트라벨.png"}
                    alt=""
                  />
                  <CategoryName>{"남성패션"}</CategoryName>
                </Link>
                <Link to={groupData?.link!}>
                  <LeaderName>{"Dogather(모임리더)"}</LeaderName>
                </Link>
                <ProductTitle>{groupData?.product}</ProductTitle>
                <ProductDetail>{groupData?.detail}</ProductDetail>
                <ProductPrice>
                  <ProductOriginalPrice>
                    {makeComma(groupData?.originPrice!) + "원"}
                  </ProductOriginalPrice>
                  <ProductMoimPrice>
                    {makeComma(groupData?.price!) + "원"}
                  </ProductMoimPrice>
                </ProductPrice>
                <Option>{"옵션선택"}</Option>
                {/* {groupData?.options.map((option, idx) => (
                  <MoimSelect
                    optionName={option.optionName}
                    optionPrice={option.optionPrice}
                  />
                ))} */}
                <SelectContainer>
                  <SelectWrapper>
                    <SelectContent>
                      <SelectSelect
                        onChange={onSelect}
                        placeholder="옵션을 선택해주세요."
                      >
                        <SelectOption value="0">
                          옵션을 선택해주세요.
                        </SelectOption>
                        {groupData?.options.map((option, idx) => (
                          <SelectOption
                            key={option.optionName}
                            // onChange={}
                            value={idx}
                          >
                            {option.optionName}
                          </SelectOption>
                        ))}
                      </SelectSelect>
                    </SelectContent>
                    {options.map((o, idx) => {
                      return (
                        <>
                          <OptionWrapper key={idx}>
                            <CartOption>
                              <SelectContentItem>
                                <OptionName>
                                  옵션명 :{" "}
                                  {groupData?.options[Number(o)].optionName +
                                    "(+" +
                                    groupData?.options[Number(o)].optionPrice +
                                    ")"}
                                </OptionName>
                              </SelectContentItem>
                              <SelectContentItem>
                                <QuantityButton
                                  className="purchaseButton"
                                  onClick={decreaseQuantity} //onClick이 되면 카운팅이 감소되는 함수실행
                                  disabled={quantity < 1}
                                >
                                  {"-"}
                                </QuantityButton>
                                <SelectInput
                                  className="productQuantity"
                                  type="text"
                                  onChange={handleValue} //onChange될때마다 값을 얻음
                                  value={quantity} //값은 count의 state를 담는다.
                                />
                                <QuantityButton
                                  className="purchaseButton"
                                  onClick={increaseQuantity}
                                >
                                  {"+"}
                                </QuantityButton>
                              </SelectContentItem>
                            </CartOption>
                          </OptionWrapper>
                        </>
                      );
                    })}
                    <OptionWrapper>
                      <CartOption>
                        <PriceWrapper>
                          <ProductQuantity>
                            {"총 " + quantity + "개"}
                          </ProductQuantity>
                          <FinalPrice>
                            {makeComma(
                              (basePrice! +
                                Number(
                                  groupData?.options[optionIdx].optionPrice
                                )) *
                                quantity
                            ) + "원"}
                          </FinalPrice>
                        </PriceWrapper>
                      </CartOption>
                    </OptionWrapper>
                    <SelectContent>
                      <Button style={{ backgroundColor: "tomato" }}>
                        관심등록
                      </Button>
                      <KakaoPay />
                    </SelectContent>
                  </SelectWrapper>
                </SelectContainer>

                {/* <span>단돈 {groupData?.price}원</span>
                <span>
                  모임 인원 : 현재신청인원 / {groupData?.maxPeople} (여기는%)
                </span>
                <span>마감 기한 : {groupData?.deadline}</span> */}
              </OverviewItem>
            </Overview>
            <Tabs hidden={hidden}>
              <Tab isActive={productMatch !== null}>
                <Link to={`/moim/${groupNo}`}>상품상세</Link>
              </Tab>
              <Tab isActive={faqMatch !== null}>
                <Link to={`/moim/${groupNo}/faq`}>FAQ</Link>
              </Tab>
              <Tab isActive={reviewMatch !== null}>
                <Link to={`/moim/${groupNo}/review`}>모임평</Link>
              </Tab>
              <Tab isActive={refundMatch !== null}>
                <Link to={`/moim/${groupNo}/refund`}>교환/환불</Link>
              </Tab>
            </Tabs>
            <Routes>
              <Route
                path=""
                element={<Product detail={groupData?.detail} img={Img} />}
              />
              <Route path="faq" element={<FAQ />} />
              <Route path="review" element={<Review />} />
              <Route path="refund" element={<Refund />} />
            </Routes>
          </>
        )}
      </MoimWrapper>
    </Container>
  );
}
const LeaderName = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const CategoryName = styled.p`
  display: flex;
  align-items: center;
  color: grey;
  font-size: 14px;
  margin-bottom: 5px;
`;
const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ProductDetail = styled.p`
  margin-bottom: 10px;
  word-spacing: 2px;
  line-height: 20px;
`;

const Option = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  margin-bottom: 20px;
`;
const ProductOriginalPrice = styled.p`
  color: grey;
  font-size: 16px;
  /* margin-bottom: 2px; */

  text-decoration: line-through;
`;
const ProductMoimPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

const MoimWrapper = styled.div`
  width: 70%;
  margin-top: 65px;
`;

const Title = styled.p`
  font-size: 48px;
  padding-top: 500px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  height: 500px;
  width: 500px;
  object-fit: cover;
  overflow: hidden;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  padding: 10px 20px;

  /* box-shadow: 3px 3px 10px 3px lightgrey; */
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 600px;
  height: auto;
  span {
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 25px 0px;
  gap: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  padding: 7px 0px;
  border-radius: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const SelectContainer = styled.div`
  display: block;
`;

const OptionWrapper = styled.div`
  border-color: grey;
  border-width: 1px;
`;

const SelectContent = styled.div`
  display: flex;
  justify-content: right;
  font-size: 20px;
  width: 100%;
`;
const SelectContentItem = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const SelectCart = styled.button`
  display: block;
  justify-content: center;
  font-size: 20px;
`;

const SelectWrapper = styled.div``;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-width: 1px;
  border-color: grey;
  :hover {
    background-color: lightgrey;
    opacity: 0.5;
  }
`;

const SelectInput = styled.input`
  font-size: 16px;
  color: grey;
  width: 50px;
  height: 30px;
  text-align: center;
  margin-bottom: 10px;
  /* border-radius: 5px; */
  border-color: black;
  border-width: 1px;
  :hover {
    outline: auto;
  }
  ::-webkit-inner-spin-button {
    width: 50px;
    height: 20px;
    -webkit-appearance: "Always Show Up/Down Arrows";
  }
`;

const SelectSelect = styled.select`
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: grey;
  margin-bottom: 10px;
  border-radius: 5px;
  border-color: black;
  border-width: 2px;
  :hover {
    outline: auto;
  }
`;

const SelectOption = styled.option`
  font-size: 14px;
`;

const CartOption = styled.div`
  border-color: grey;
`;

const OptionName = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const PriceWrapper = styled.p`
  display: flex;
  justify-content: space-between;
`;

const ProductQuantity = styled.p`
  font-size: 14px;
`;
const FinalPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
`;

export default MoimDetail;
