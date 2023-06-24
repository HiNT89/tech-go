import configRoutes from "../config";
//page
import Home from "../pages/Home";
import Product from "~/pages/Product";
import Search from "~/pages/Search";
import Cart from "~/pages/Cart";
import Detail from "~/pages/Detail";
import Admin from "~/pages/Admin";
import Order from "~/pages/Order";
const publicRoutes = [
  { path: configRoutes.home, component: Home },
  { path: configRoutes.admin, component: Admin },
  { path: configRoutes.order, component: Admin },
  { path: configRoutes.customer, component: Admin },
  { path: configRoutes.managerProduct, component: Admin },
  { path: configRoutes.managerProductDetail, component: Admin },
  { path: configRoutes.orderDetail, component: Admin },
  { path: configRoutes.product, component: Product },
  { path: configRoutes.productShort, component: Product },
  { path: configRoutes.detailProduct, component: Detail },
  { path: configRoutes.search, component: Search },
  { path: configRoutes.searchType, component: Search },
  { path: configRoutes.cart, component: Cart },
  { path: configRoutes.orderUser, component: Order },
];
export default publicRoutes;
