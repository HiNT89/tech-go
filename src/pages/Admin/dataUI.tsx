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
    path: "/admin",
  },
  {
    id: 2,
    name: "order",
    icon: <FaShoppingBasket />,
    element: <Order />,
    path: "/admin/order",
  },
  {
    id: 3,
    name: "product",
    icon: <FaLaptop />,
    element: <Product />,
    path: "/admin/product",
  },
  {
    id: 4,
    name: "customer",
    icon: <FaUserAlt />,
    element: <Customer />,
    path: "/admin/customer",
  },
];
const listNSX = [
  {
    id: 1,
    name: "apple",
    value: "apple",
  },
  {
    id: 2,
    name: "samsung",
    value: "samsung",
  },
  {
    id: 3,
    name: "Vivo",
    value: "vivo",
  },
  {
    id: 4,
    name: "xiaomi",
    value: "xiaomi",
  },
  {
    id: 5,
    name: "nokia",
    value: "nokia",
  },
  {
    id: 6,
    name: "LG",
    value: "lg",
  },
  {
    id: 7,
    name: "sony",
    value: "sony",
  },
  {
    id: 8,
    name: "asus",
    value: "asus",
  },
  {
    id: 9,
    name: "msi",
    value: "msi",
  },
  {
    id: 10,
    name: "dell",
    value: "dell",
  },
  {
    id: 11,
    name: "HP",
    value: "hp",
  },
  {
    id: 12,
    name: "lenovo",
    value: "lenovo",
  },
  {
    id: 13,
    name: "acer",
    value: "acer",
  },
];
export { navs, listNSX };
