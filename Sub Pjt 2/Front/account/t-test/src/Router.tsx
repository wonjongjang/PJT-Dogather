import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
