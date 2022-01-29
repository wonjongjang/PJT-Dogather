import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Search from "./Routes/Search";
import Signup from "./Routes/Signup";
import Footer from "./components/Footer";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
