import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import RequireAdmin from "./components/layout/RequireAdmin";
import AdminLayout from "./components/layout/AdminLayout";

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
import AdminProductEdit from "./pages/admin/ProductEdit";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetail from "./pages/admin/OrderDetail";

function StorefrontLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/:id" element={<AdminProductEdit />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
              </Route>

              <Route
                path="/*"
                element={
                  <StorefrontLayout>
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
                  </StorefrontLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LangProvider>
  );
}
