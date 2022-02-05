import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Search from "./Routes/Search";
import Signup from "./Routes/Signup";
import Community from "./Routes/Community";
import NoticeCommunity from "./Routes/NoticeCommunity";
import SaleCommunity from "./Routes/SaleCommunity";
<<<<<<< HEAD
import FreeCommunity from "./Routes/FreeCommunity";
import Write from "./Routes/Write";
=======
>>>>>>> 0680cd8929cc2ed34c3367bcea6c5ee5bf3ed936

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
<<<<<<< HEAD
        <Route path="/Write" element={<Write />}></Route>
        <Route path="/noticecommunity" element={<NoticeCommunity />}></Route>
        <Route path="/salecommunity" element={<SaleCommunity />}></Route>
        <Route path="/freecommunity" element={<FreeCommunity />}></Route>
=======
        <Route path="/noticecommunity" element={<NoticeCommunity />}></Route>
        <Route path="/salecommunity" element={<SaleCommunity />}></Route>
>>>>>>> 0680cd8929cc2ed34c3367bcea6c5ee5bf3ed936
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
