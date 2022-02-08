import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms/Login";

import Header from "./components/Nav/Header";
// import Footer from "./components/Footer/Footer";
import Home from "./pages/Main/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateMoim from "./pages/Moim/CreateMoim";
import MoimDetail from "./pages/Moim/MoimDetail";
import Product from "./pages/Moim/MoimDetailComponent/product";
import FAQ from "./pages/Moim/MoimDetailComponent/faq";
import Review from "./pages/Moim/MoimDetailComponent/review";
import Refund from "./pages/Moim/MoimDetailComponent/refund";
import CommunityHome from "./pages/Community/CommunityHome";
import MyPage from "./pages/MyPage/MyPage";

function Router() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    // <Navigate replace to="/" /> : url 직접 접근 방지
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moim/:groupNo/*" element={<MoimDetail />}>
          <Route path="product" element={<Product />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="review" element={<Review />} />
          <Route path="refund" element={<Refund />} />
        </Route>

        <Route path="/community" element={<CommunityHome />}></Route>

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
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default Router;
