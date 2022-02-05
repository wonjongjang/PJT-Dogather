import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms/Login";
import Header from "./components/Nav/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Main/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateMoim from "./pages/Moim/CreateMoim";

function Router() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    // <Navigate replace to="/" /> : url 직접 접근 방지
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={isLogin ? <Navigate replace to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isLogin ? <Navigate replace to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/create/moim"
          element={isLogin ? <CreateMoim /> : <Navigate replace to="/" />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
