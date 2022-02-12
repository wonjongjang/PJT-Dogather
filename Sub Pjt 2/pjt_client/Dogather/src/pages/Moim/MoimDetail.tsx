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
import { CardMedia, Stack } from "@mui/material";
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

  const [optionValue, setOptionValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  // console.log(options);
  // console.log(options[0].optionName);
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setIsHidden(false);
    setOptionValue(event.target.value);
  };
  const onQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const mainImgAddress = "/doimage/" + groupData?.mainImage;
  console.log(groupData?.mainImage);
  const detailImgAddress = "/doimage/" + groupData?.mediaList[0];
  console.log(mainImgAddress, detailImgAddress);

  const time = Date.now();
  console.log(time);

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
                            key={idx}
                            value={
                              option.optionName +
                              " (" +
                              "+" +
                              option.optionPrice +
                              ")"
                            }
                          >
                            {option.optionName}
                          </SelectOption>
                        ))}
                      </SelectSelect>
                    </SelectContent>
                    <OptionWrapper hidden={isHidden}>
                      <SelectContent>
                        <SelectInput
                          value={quantity}
                          onChange={onQuantity}
                          type="number"
                          min="0"
                          placeholder="수량을 입력해주세요."
                        />
                      </SelectContent>
                      <SelectContent>
                        <span>옵션명 : {optionValue}</span>
                        <br />
                        <span>수량 : {quantity}</span>
                        <br />
                      </SelectContent>
                      <SelectContent>
                        <Stack direction="row" spacing={2}>
                          <Button>장바구니</Button>
                          <Button>바로구매</Button>
                        </Stack>
                      </SelectContent>
                    </OptionWrapper>
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
  margin-bottom: 20px;
`;

const Option = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p``;
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
  height: 500px;
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

const OptionWrapper = styled.div``;

const SelectContent = styled.div`
  display: flex;
  justify-content: right;
  font-size: 20px;
`;

const SelectCart = styled.button`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const SelectWrapper = styled.div``;

const SelectInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  color: grey;
  :hover {
    outline: auto;
  }
  ::-webkit-outer-spin-button {
    width: 50px;
    height: 20px;
    -webkit-appearance: "Always Show Up/Down Arrows";
  }
  ::-webkit-inner-spin-button {
    width: 50px;
    height: 20px;
    -webkit-appearance: "Always Show Up/Down Arrows";
  }
`;

const SelectSelect = styled.select`
  width: 100%;
  height: 30px;
  font-size: 14px;
  color: grey;
  margin-bottom: 3px;
  :hover {
    /* background-color: #e2e0ff; */
    outline: auto;
  }
`;

const SelectOption = styled.option`
  font-size: 14px;
`;

const Button = styled.button``;

export default MoimDetail;
