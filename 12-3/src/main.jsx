import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetAllProducts from "./pages/GetAllProducts";
import ProductDetails from "./pages/ProductDetails";
import AddProducts from "./pages/AddProducts";

// gfuyfurytr6r67

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetAllProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/product/add" element={<AddProducts />} />
    </Routes>
  </BrowserRouter>
);
