//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//pages
import RegisterPage from "./pages/Register";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyNavbar from "./components/Navbar";
import AddBook from "./pages/AddBook";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import OrderPage from "./pages/OrderPage";
import ViewOrderPage from "./pages/ViewOrderDetail";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/list" element={<AddBook />} />
        <Route path="/book/:id/view" element={<DetailPage />} />
        <Route path="/book/orders" element={<OrderPage />} />
        <Route path="/book/order/:id" element={<ViewOrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
