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
import { FetchMoimGroupAPI } from "../../api/MoimDetail";
// import { fetchMoimGroupAPI, fetchMoimProductAPI } from "../../api/MoimDetail";
import { IMoimForm } from "./CreateMoim";
import BounceLoader from "react-spinners/BounceLoader";
import { Audio, Hearts } from "react-loader-spinner";
import MoimSelect from "./MoimDetailSelect";
import { Link } from "react-router-dom";
import Product from "./MoimDetailComponent/MoimProduct";
import FAQ from "./MoimDetailComponent/MoimFAQ";
import Review from "./MoimDetailComponent/MoimReview";
import Refund from "./MoimDetailComponent/MoimRefund";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "../../atoms/Login";

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
  groupLeader: number;
  categoryNo: number;
  deadline: string;
  maxPeople: number;
  status: string;
  product: string;
  detail: string;
  link: string;
  originPrice: number;
  price: number;
  groupNo: number;
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
  const productMatch = useMatch("/:coinId/price");
  const faqMatch = useMatch("/:coinId/chart");
  const reviewMatch = useMatch("/:coinId/chart");
  const refundMatch = useMatch("/:coinId/chart");

  const userId = useRecoilValue(userIdAtom);
  const JWT = localStorage.getItem("login_token");
  const { isLoading, data } = useQuery<IGroupData>(
    ["group", groupNo, userId, JWT],
    () => FetchMoimGroupAPI(groupNo!, userId!, JWT!)
  );

  console.log(isLoading);
  console.log(data);

  // const loading = productLoading || isLoading;

  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setHidden(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {loading ? (
            <Hearts height="500" width="500" color="tomato">
              {"상품정보를 가져오는 중입니다.😊"}
            </Hearts>
          ) : null}
        </Title>
      </Header>
      <>
        <Overview hidden={hidden}>
          <OverviewItem>
            <Img src="http://img.danawa.com/prod_img/500000/907/780/img/6780907_1.jpg?shrink=330:330&_v=20210405094355" />
          </OverviewItem>
          <OverviewItem>
            <span>모임번호:{data?.groupNo}</span>
            <span>{data?.product}</span>
            <span>{data?.detail}</span>
            <span>단돈 {data?.price}원</span>
            <span>모임 인원 : 현재신청인원 / {data?.maxPeople} (여기는%)</span>
            <span>마감 기한 : {data?.deadline}</span>
            <MoimSelect />
          </OverviewItem>
        </Overview>
        <Tabs hidden={hidden}>
          <Tab isActive={productMatch !== null}>
            <Link to={`/moim/${groupNo}/product`}>상품상세</Link>
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
            path="product"
            element={<Product detail={data?.detail} img={Img} />}
          />
          <Route path="faq" element={<FAQ />} />
          <Route path="review" element={<Review />} />
          <Route path="refund" element={<Refund />} />
        </Routes>
      </>
    </Container>
  );
}

export default MoimDetail;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  padding-top: 500px;
`;

const Img = styled.img`
  height: 300px;
  width: 300px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
