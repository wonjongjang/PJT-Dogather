import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms/Login";

import Header from "./components/Nav/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Main/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateMoim from "./pages/Moim/CreateMoim";
import MoimDetail from "./pages/Moim/MoimDetail";
import MoimProduct from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimProduct";
import MoimFAQ from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimFAQ";
import MoimRefund from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimRefund";
import MoimReview from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimReview";
import CommunityHome from "./pages/Community/CommunityHome";
import MyPage from "./pages/MyPage/MyPage";
import AnnouncementCommunity from "./pages/Community/AnnouncementCommunity/AnnouncementCommunity";
import InfoShareCommunity from "./pages/Community/InfoShareCommunity/InfoShareCommunity";
import FreeCommunity from "./pages/Community/FreeCommunity/FreeCommunity";
import MoimChatbot from "./components/Chat/MoimChatbot"

function Router() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    // <Navigate replace to="/" /> : url 직접 접근 방지
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moim/:groupNo/*" element={<MoimDetail />}>
          <Route path="" element={<MoimProduct />} />
          <Route path="faq" element={<MoimFAQ />} />
          <Route path="review" element={<MoimReview />} />
          <Route path="refund" element={<MoimRefund />} />
        </Route>

        <Route path="/community" element={<CommunityHome />} />
        <Route
          path="/community/announcement/"
          element={<AnnouncementCommunity />}
        />
        <Route path="/community/infoshare/" element={<InfoShareCommunity />} />
        <Route path="/community/free/" element={<FreeCommunity />} />

        {/* 로그인 하지 않았을 때 url 직접 접근 가능 */}
        <Route
          path="/login"
          element={isLogin ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate replace to="/" /> : <Signup />}
        />

        {/* 로그인 했을 때 url 직접 접근 가능 */}
        <Route
          path="/mypage"
          element={isLogin ? <MyPage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/moim/create"
          element={isLogin ? <CreateMoim /> : <Navigate replace to="/" />}
        />

        <Route 
          path="/chat"
          element={<MoimChatbot />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
