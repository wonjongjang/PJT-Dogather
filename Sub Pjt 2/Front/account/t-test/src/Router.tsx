import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Search from "./Routes/Search";
import Signup from "./Routes/Signup";
import Community from "./Routes/Community";
import NoticeCommunity from "./Routes/NoticeCommunity";
import SaleCommunity from "./Routes/SaleCommunity";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/noticecommunity" element={<NoticeCommunity />}></Route>
        <Route path="/salecommunity" element={<SaleCommunity />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
