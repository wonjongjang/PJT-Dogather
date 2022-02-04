import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Main/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateMoim from "./pages/Moim/CreateMoim";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/create/moim" element={<CreateMoim />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
