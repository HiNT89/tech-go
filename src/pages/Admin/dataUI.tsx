import { FaShoppingBasket, FaUserAlt, FaLaptop } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import Dashboard from "./dashboard";
import Customer from "./customer";
import Product from "./Product/product";
import Order from "./Order/order";
const navs = [
  {
    id: 1,
    name: "dashboard",
    icon: <AiFillHome />,
    element: <Dashboard />,
    path : '/admin'
  },
  {
    id: 2,
    name: "order",
    icon: <FaShoppingBasket />,
    element: <Order />,
    path : '/admin/order'
  },
  {
    id: 3,
    name: "product",
    icon: <FaLaptop />,
    element: <Product />,
    path : '/admin/product'
  },
  {
    id: 4,
    name: "customer",
    icon: <FaUserAlt />,
    element: <Customer />,
    path : '/admin/customer'
  },
];
export { navs };
