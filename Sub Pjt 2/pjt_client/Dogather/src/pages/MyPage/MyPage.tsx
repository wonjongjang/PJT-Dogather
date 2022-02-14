import styled from "styled-components";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchMyPage } from "../../api/MyPage";
import { userIdAtom } from "../../atoms/Login";
import LikeGroups from "./MyPageComponents/LikeGroups";

interface IBoard {
  boardContent: string;
  boardTitle: string;
  boardType: string; // 나중에 변경
  boardView: number;
  created: string;
  postNo: number;
  updated: string;
  writerNo: number;
}

export interface IGroup {
  categoryName: string;
  categoryNo: number;
  created: string;
  deadline: string;
  detail: string;
  groupLeader: number;
  groupNo: number;
  leaderName: string;
  link: string;
  mainImage: string;
  maxPeople: number;
  originPrice: number;
  price: number;
  product: string;
  status: string;
  updated: string;
  view: number;
}

interface IUserInfo {
  likeBoards: IBoard[];
  likeGroups: IGroup[];
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

  return (
    <Container>
      <LeftSide>
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
      </LeftSide>
      <RightSide>
        <div>
          <Membership>
            <Profile>
              <ProfileImg>
                <Img
                  src="https://www.bigjungbo.com/files/attach/images/163/017/178/010/f1f78c3b5eaeb68788a9c98dc796b4c7.jpeg"
                  alt="이미지"
                />
              </ProfileImg>
              <ProfileInfo>
                <div>
                  <Nickname>{data?.userNickname}</Nickname>
                  <ProfileButton>프로필 수정</ProfileButton>
                  <ProfileButton>내 프로필</ProfileButton>
                </div>
              </ProfileInfo>
            </Profile>
            <LevelDiv>
              <LevelSubDiv>
                <Level>일반 회원</Level>
                <LevelTitle>회원 등급</LevelTitle>
              </LevelSubDiv>
              <LevelSubDiv>
                <Point>0P</Point>
                <PointTitle>포인트</PointTitle>
              </LevelSubDiv>
            </LevelDiv>
          </Membership>
          <ListTitleDiv>
            <ListTitle>구매 내역</ListTitle>
            <SeeMore>더보기 〉</SeeMore>
          </ListTitleDiv>
          <div></div>
          <ListTitleDiv>
            <ListTitle>판매 내역</ListTitle>
            <SeeMore>더보기 〉</SeeMore>
          </ListTitleDiv>
          <div></div>
          <ListTitleDiv>
            <ListTitle>관심 모임</ListTitle>
            <SeeMore>더보기 〉</SeeMore>
          </ListTitleDiv>
          <div>
            {data?.likeGroups?.map((likeGroup) => (
              <LikeGroups key={likeGroup.groupNo} {...likeGroup} />
            ))}
          </div>
        </div>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 40px 160px;
`;

const LeftSide = styled.div`
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

const RightSide = styled.div`
  overflow: hidden;
  min-height: 380px;
`;

const Membership = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
`;

const Profile = styled.div`
  display: flex;
  padding: 30px 32px 22px;
`;

const ProfileImg = styled.div`
  position: relative;
  margin-right: 12px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.05px;
  margin-bottom: 12px;
`;

const ProfileButton = styled.button`
  height: 34px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 7px;
  line-height: 32px;
`;

const LevelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 0; */
  width: 100%;
  height: 77px;
  border-top: 1px solid #f4f4f4;
`;

const LevelSubDiv = styled.div`
  width: 50%;
  text-align: center;
`;

const Level = styled.div`
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.16px;
  font-weight: 700;
  border-right: 1px solid #ebebeb;
`;

const LevelTitle = styled.div`
  line-height: 19px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  border-right: 1px solid #ebebeb;
`;

const Point = styled.div`
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.16px;
  font-weight: 700;
`;

const PointTitle = styled.div`
  line-height: 19px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

const ListTitleDiv = styled.div`
  margin-top: 42px;
  padding-bottom: 16px;
  display: flex;
  max-width: 100%;
`;

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.27px;
`;

const SeeMore = styled.p`
  margin-top: 3px;
  margin-left: auto;
  padding-top: 3px;
  padding-left: 5px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

export default MyPage;
