import styled from "styled-components";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchMyPage } from "../../api/MyPage";
import { userIdAtom } from "../../atoms/Login";

interface IBoards {
  boardContent: string;
  boardTitle: string;
  boardType: string; // 나중에 변경
  boardView: number;
  created: string;
  postNo: number;
  updated: string;
  writerNo: number;
}

interface IGroups {
  categoryName: string;
  categoryNo: number;
  created: string;
  deadline: string;
  detail: string;
  groupLeader: number;
  groupNo: number;
  leaderName: string;
  link: string;
  mainImage: string; // string 맞나?
  maxPeople: number;
  originPrice: number;
  price: number;
  product: string;
  status: string;
  updated: string;
  view: number;
}

interface IUserInfo {
  likeBoards: IBoards[];
  likeGroups: IGroups[];
  userAddr: string;
  userAddrDetail: string;
  userEmail: string;
  userId: string;
  userName: string;
  userNickname: string;
  userNo: number;
  userTel: string;
  userZip: number;
}

function MyPage() {
  const JWT = localStorage.getItem("login_token");
  const [userId, setUserId] = useRecoilState(userIdAtom);

  const { isLoading, data } = useQuery<IUserInfo>([JWT, userId], () =>
    fetchMyPage(JWT!, userId!)
  );

  console.log(data?.likeGroups[0].deadline);

  return (
    <Container>
      <Side>
        <Title>
          <span>마이 페이지</span>
        </Title>
        <nav>
          <div>
            <SubTitle>모임 정보</SubTitle>
            <ul>
              <List>구매 내역</List>
              <List>판매 내역</List>
              <List>관심 모임</List>
            </ul>
          </div>
          <BottomListArea>
            <SubTitle>내 정보</SubTitle>
            <ul>
              <List>프로필 정보</List>
              <List>주소록</List>
              <List>결제 정보</List>
              <List>판매 정산 계좌</List>
              <List>포인트</List>
            </ul>
          </BottomListArea>
        </nav>
      </Side>
      <div>
        <div>
          <div>프로필</div>
          <div>등급, 포인트</div>
        </div>
        <div>구매 내역</div>
        <div>구매 내역 리스트</div>
        <div>판매 내역</div>
        <div>판매 내역 리스트</div>
        <div>관심 모임</div>
        <div>관심 모임 리스트</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-width: 1280px;
  padding: 40px 40px 160px;
`;

const Side = styled.div`
  float: left;
  width: 180px;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 30px;
  line-height: 29px;
  letter-spacing: -0.15px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.27px;
  /* display: inline-block;
  vertical-align: top; */
`;

const List = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 15px;
  margin-top: 12px;
  line-height: 18px;
  letter-spacing: -0.15px;
`;

const BottomListArea = styled.div`
  margin-top: 40px;
`;

export default MyPage;
