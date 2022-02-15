import DogatherLogo from "./Logo.svg";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { isLoginAtom, userIdAtom, userNoAtom } from "../../atoms/Login";
import { CategoriesAtom } from "../../atoms/ProductCategories";
import { OptionsAtom } from "../../atoms/Options";
import { FAQsAtom } from "../../atoms/FAQs";
import { motion, useAnimation } from "framer-motion";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(new Date().getMinutes());

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [options, setOptions] = useRecoilState(OptionsAtom);
  const [FAQS, setFAQs] = useRecoilState(FAQsAtom);
  const [categories, setCategories] = useRecoilState(CategoriesAtom);

  // 검색 디자인
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  // 검색 기능
  const [enteredText, SetEnteredText] = useState(""); // 검색어 저장
  const enterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event);
    if (event.code === "Enter") {
      console.log(enteredText); // 엔터키 눌렀을 때

      fetch(
        `http://i6e104.p.ssafy.io/api/group/search?page=1&query=${enteredText}`
      )
        .then((response) => response.json())
        .then((result) => console.log(result));
    }
  };

  useEffect(() => {
    if (!isLogin) {
      setIsLogin(localStorage.getItem("login_token") !== null);
    }
    setOptions([]);
    setFAQs([]);
    setCategories([]);
    setSearchOpen(false); // 검색 아이콘 위치 초기화
    inputAnimation.start({ scaleX: 0 }); // 검색 input 위치 초기화
  }, [location]); // url 바뀔 때 마다 로컬 스토리지에 토큰이 있는지 확인하여 로그인 여부를 변경

  const Logout = () => {
    // 로그아웃 클릭 시 작동
    localStorage.clear(); // 로컬 스토리지 비우기
    setIsLogin(false); // 로그인 여부 초기화
    setUserNo(""); // 저장된 user pk 초기화
    setUserId(""); // 저장된 user id 초기화
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Nav>
      <UpperNav>
        <UpperCol>
          <UpperItems>
            <UpperItem>고객센터</UpperItem>
            {isLogin ? (
              <>
                <UpperItem onClick={Logout}>
                  <LogoutDiv>로그아웃</LogoutDiv>
                </UpperItem>
                <UpperItem>
                  <Link to="/mypage">마이페이지</Link>
                </UpperItem>
              </>
            ) : (
              <>
                <UpperItem>
                  <Link to="/login">로그인</Link>
                </UpperItem>
                <UpperItem>
                  <Link to="/signup">회원가입</Link>
                </UpperItem>
              </>
            )}
          </UpperItems>
        </UpperCol>
      </UpperNav>
      <LowerNav>
        <LowerCol>
          <Link to="/">
            <Logo src={`${DogatherLogo}`}></Logo>
          </Link>
        </LowerCol>
        <LowerCol>
          <LowerItems>
            {/* 검색 아이콘 (svg로 가져오면 CSS로 자유롭게 변경 가능 */}
            <Search>
              <motion.svg
                onClick={toggleSearch}
                animate={{ x: searchOpen ? -215 : 0 }}
                transition={{ type: "linear" }}
                fill="currentColor"
                viewBox="0 0 768 768"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M513.312 507.392c-1.088 0.832-2.144 1.76-3.168 2.784s-1.92 2.048-2.784 3.168c-40.256 38.816-95.008 62.656-155.36 62.656-61.856 0-117.824-25.024-158.4-65.6s-65.6-96.544-65.6-158.4 25.024-117.824 65.6-158.4 96.544-65.6 158.4-65.6 117.824 25.024 158.4 65.6 65.6 96.544 65.6 158.4c0 60.352-23.84 115.104-62.688 155.392zM694.624 649.376l-117.6-117.6c39.392-49.28 62.976-111.776 62.976-179.776 0-79.52-32.256-151.552-84.352-203.648s-124.128-84.352-203.648-84.352-151.552 32.256-203.648 84.352-84.352 124.128-84.352 203.648 32.256 151.552 84.352 203.648 124.128 84.352 203.648 84.352c68 0 130.496-23.584 179.776-62.976l117.6 117.6c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
              <Input
                animate={inputAnimation}
                initial={{ scaleX: 0 }}
                transition={{ type: "linear" }}
                placeholder="검색 내용 입력 후 엔터"
                onChange={(e) => SetEnteredText(e.target.value)}
                onKeyPress={enterSearch}
              />
            </Search>
            <LowerItem>
              {isLogin ? (
                <Link to="/moim/create">모임 생성</Link>
              ) : (
                <Link to="/login">모임 생성</Link>
              )}
            </LowerItem>
            <LowerItem>
              <Link to="community/announcement">커뮤니티</Link>
            </LowerItem>
          </LowerItems>
        </LowerCol>
      </LowerNav>
    </Nav>
  );
}

const Nav = styled.nav`
  position: sticky; // 위치 고정
  top: 0; // 페이지 제일 위에 붙임
  width: 100%; // 가로 폭
  z-index: 2;
`;

const UpperNav = styled.nav`
  display: flex;
  align-items: center; // 수직 가운데 정렬
  height: 32px; // 세로 폭
  background-color: white;
`;

const UpperCol = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  padding-right: 61px;
`;

const UpperItems = styled.ul`
  display: flex;
  align-items: center;
`;

const UpperItem = styled.li`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 12px;
  color: #485460;
`;

const LogoutDiv = styled.div`
  cursor: pointer;
`;

const LowerNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  height: 68px;
  background-color: white;
  border-bottom: solid;
  border-top: solid;
  border-width: 1px;
  border-color: #d2dae2;
`;

const LowerCol = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100%;
`;

const LowerItems = styled.ul`
  display: flex;
  align-items: center;
`;

const LowerItem = styled.li`
  font-size: 15px;
  font-weight: bold;
  margin: 0 20px;
`;

// 검색
const Search = styled.span`
  margin: 0 20px;
  display: flex;
  align-items: center;
  color: black;
  position: relative;
  svg {
    height: 20px;
    z-index: 3;
    cursor: pointer;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: 2;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  height: 45px;
`;

export default Header;
