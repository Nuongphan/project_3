import { Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound/NotFound";
import Auth from "../Layouts/Auth/Auth";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import UserLayOut from "../Layouts/User/UserLayOut";
import AdminLayOut from "../Layouts/Admin/AdminLayOut";
import ManagerOrder from "../Pages/ManagerOrder/ManagerOrder";
import ManagerProduct from "../Pages/ManagerProduct/ManagerProduct";
import ManagerReport from "../Pages/ManagerReport/ManagerReport";
import ManagerUsers from "../Pages/ManagerUser/ManagerUser";
import { AddProduct } from "../Pages/ManagerProduct/AddProduct";
import Shop from "../Pages/Shop/Shop";
import AccountHome from "../Pages/Account/AccountHome";

const RootRouter = () => {
  return (
    <>
      <Routes>
        {/* //Auth */}
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<AccountHome />} />
        </Route>
        {/* //USER */}
        <Route path="/" element={<UserLayOut />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
        {/* //ADMIN */}
        <Route path="/admin" element={<AdminLayOut />}>
          <Route index element={<ManagerReport />} />
          <Route path="/admin/manageruser" element={<ManagerUsers />} />
          <Route path="/admin/managerorder" element={<ManagerOrder />} />
          <Route path="/admin/managerproduct" element={<ManagerProduct />} />
          <Route path="/admin/managerproduct/add" element={<AddProduct />} />
        </Route>
        //NOT FOUND
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </>
  );
};
export default RootRouter;
