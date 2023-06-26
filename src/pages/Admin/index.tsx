import clsx from "clsx";
import styles from "./Admin.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { navs } from "./dataUI";
import { FaShoppingBasket, FaUserAlt, FaLaptop } from "react-icons/fa";
import DetailOrder from "./Order/detailOrder";
import DetailProduct from "./Product/detailProduct";
import { actionGetDataOrder, actionGetUser } from "~/pages/saga/action";
import { useDispatch, useSelector } from "react-redux";
import { orderSE } from "~/rootSaga/selectors";
interface Action {
  type: string;
  payload: any;
}
function Admin() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(navs[0]);
  const orderData = useSelector(orderSE);
  const { productID, orderID } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const URL = window.location.pathname;
    if (orderID) {
      setPage({
        id: 2,
        name: "order",
        icon: <FaShoppingBasket />,
        element: <DetailOrder orderID={orderID} />,
        path: "/admin/order",
      });
    } else if (productID) {
      setPage({
        id: 3,
        name: "product",
        icon: <FaLaptop />,
        element: <DetailProduct />,
        path: "/admin/product",
      });
    } else {
      const navItem = navs.filter((it) => it.path === URL)[0];
      setPage(navItem);
    }
  }, [window.location.pathname]);
  useEffect(() => {
    dispatch<Action>(actionGetDataOrder("all"));
    dispatch<Action>(actionGetUser());
  }, []);
  return (
    <div className={clsx(styles.wrapper, "flex ")}>
      <nav className={clsx(styles.nav, "w-1/5  bg-black py-4 text-white")}>
        <h1 className="text-3xl font-bold uppercase w-11/12 m-auto text-center text-white mb-6">
          <Link to="/">techgo</Link>
        </h1>
        <ul className="w-11/12 m-auto flex flex-col gap-6 text-lg font-semibold">
          {navs.map((it) => (
            <Link key={it.id} to={it.path}>
              <li
                className={clsx(
                  it.name === page.name ? "text-blue-400" : "",
                  "flex items-center gap-2 capitalize pl-3 hover:text-amber-400 cursor-pointer"
                )}
              >
                <span>{it.icon}</span>
                {it.name}
              </li>
            </Link>
          ))}
        </ul>
        <div></div>
      </nav>
      <nav className={clsx(styles.nav_mobile, "bg-black py-4 text-white")}>
        <h1 className="font-bold uppercase w-1/3 m-auto text-center text-white">
          <Link to="/">techgo</Link>
        </h1>
        <ul className="w-2/3 justify-around flex text-lg font-semibold">
          {navs.map((it) => (
            <Link key={it.id} to={it.path}>
              <li
                className={clsx(
                  it.name === page.name ? "text-blue-400" : "",
                  "flex items-center gap-2 capitalize pl-3 hover:text-amber-400 cursor-pointer"
                )}
              >
                <span>{it.icon}</span>
              </li>
            </Link>
          ))}
        </ul>
        <div></div>
      </nav>
      <main
        className={clsx(
          styles.content,
          "w-4/5 h-full overflow-auto bg-white p-4"
        )}
      >
        {page.element}
      </main>
    </div>
  );
}

export default Admin;
