import configRoutes from "../config";
//page
import Home from "../pages/Home";
import Product from "~/pages/Product";
import Search from "~/pages/Search";
import Cart from "~/pages/Cart";
import Detail from "~/pages/Detail";
const publicRoutes = [{ path: configRoutes.home, component: Detail }];
export default publicRoutes;
