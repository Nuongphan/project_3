import Footer from "../../components/common/User/Footer/Footer";
import { Outlet } from "react-router-dom";
import HeaderUser from "../../components/common/User/Header/HeaderUser";
import "../../User.module.css";

const UserLayOut = () => {
  return (
    <>
      <HeaderUser />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayOut;
