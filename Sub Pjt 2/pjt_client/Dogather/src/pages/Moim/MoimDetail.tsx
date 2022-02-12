import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { CardMedia } from "@mui/material";
import { FetchMoimGroupAPI, FetchMoimMediaAPI } from "../../api/MoimDetail";
// import { Audio, Hearts } from "react-loader-spinner";
import MoimSelect from "./MoimDetailComponent/MoimDetailSelect";
import { Link } from "react-router-dom";
import Product from "./MoimDetailComponent/MoimProduct";
import FAQ from "./MoimDetailComponent/MoimFAQ";
import Review from "./MoimDetailComponent/MoimReview";
import Refund from "./MoimDetailComponent/MoimRefund";
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
  options: Array<object>;
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

  const mainImgAddress = "/doimage/" + groupData?.mainImage;
  console.log(groupData?.mainImage);
  const detailImgAddress = "/doimage/" + groupData?.mediaList[0];
  console.log(mainImgAddress, detailImgAddress);

  return (
    <Container>
      <MoimWrapper>
        {loading ? null : (
          <>
            <Overview>
              {/* <Img
                src={process.env.PUBLIC_URL + "/img/Hoodie.png"}
                alt={"메인 이미지"}
              /> */}
              <Img
                src={process.env.PUBLIC_URL + mainImgAddress}
                alt={process.env.PUBLIC_URL + mainImgAddress}
              />
              <Img
                src={process.env.PUBLIC_URL + detailImgAddress}
                alt={process.env.PUBLIC_URL + detailImgAddress}
              />
              {/* <MoimDetailImg /> */}
              <OverviewItem>
                <span>
                  <p>모임번호:{groupData?.groupNo}</p>
                  <p>{"모임리더이름"}</p>
                </span>
                <span>{groupData?.product}</span>
                <span>{groupData?.detail}</span>
                <span>단돈 {groupData?.price}원</span>
                <span>
                  모임 인원 : 현재신청인원 / {groupData?.maxPeople} (여기는%)
                </span>
                <span>마감 기한 : {groupData?.deadline}</span>
                <MoimSelect />
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

const ProductTitle = styled.h1``;
const ProductDetail = styled.h1``;
const ProductPrice = styled.h1``;
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

const MoimWrapper = styled.div`
  width: 70%;
  margin-top: 65px;
`;

const Title = styled.h1`
  font-size: 48px;
  padding-top: 500px;
`;

const Img = styled.img`
  height: 500px;
  width: 500px;
  object-fit: cover;
  overflow: hidden;
  margin-right: 40px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
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

export default MoimDetail;
