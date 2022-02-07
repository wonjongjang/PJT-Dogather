import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/create/moim" element={<CreateMoim />}></Route>
        <Route path="/moim/:groupNo" element={<MoimDetail />}>
          <Route path="product" element={<Product />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="review" element={<Review />} />
          <Route path="refund" element={<Refund />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default Router;
