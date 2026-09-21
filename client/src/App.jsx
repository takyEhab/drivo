import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import RequireAdmin from "./components/layout/RequireAdmin";

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:slug" element={<Product />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route
                        path="/order/:orderNumber"
                        element={<OrderSuccess />}
                      />
                      <Route path="/track" element={<TrackOrder />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LangProvider>
  );
}
