import styles from "./Cart.module.scss";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { VND, filterProductCart } from "~/function";
import { useSelector, useDispatch } from "react-redux";
import { cartSE, listProductSE, orderSE, userSE } from "~/rootSaga/selectors";
import ButtonBackToTop from "~/components/ButtonBackToTop";

import {
  actionCreateDataOrder,
  actionCreateDataOrderFalse,
  actionDeleteDataCart,
  actionUpdateDataCart,
} from "~/pages/saga/action";
interface Action {
  type: string;
  payload: any;
}

function Cart() {
  const { v4: uuidv4 } = require("uuid");
  const user = useSelector(userSE);
  const cart = useSelector(cartSE);
  const listOrder = useSelector(orderSE);

  const dispatch = useDispatch();
  const listProduct = useSelector(listProductSE);
  const [showNav, setShowNav] = useState(false);
  const [data, setData] = useState(filterProductCart(cart, listProduct));
  const listProductCheckedInit: string[] = [];
  const [listProductChecked, setListProductChecked] = useState(
    listProductCheckedInit
  );
  const productType: {
    productName: string;
    price: number;
    count: number;
    color: string;
    productID: string;
  }[] = [];
  let currentDate = new Date();
  const [order, setOrder] = useState({
    account: user.account,
    address: user.address,
    phone: user.phone,
    id: uuidv4(),
    products: productType,
    total: 0,
    name: user.name,
    status: "processing",
    description: "ghi chú",
    date: {
      time: "",
      date: "",
    },
  });
  // effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const newData = filterProductCart(cart, listProduct);
    setData(newData);
  }, [cart]);
  useEffect(() => {
    const listProductCart = cart.filter((it) =>
      listProductChecked.includes(it.id)
    );
    const listProductItem = listProductCart.map((it) => ({
      ...listProduct.filter((item) => item.id === it.productID)[0],
      count: it.count,
      color: it.color,
    }));
    const newProduct = listProductItem.map((it) => ({
      productName: it.productName,
      price: it.sale ? it.sale : it.price,
      count: it.count,
      color: it.color,
      productID: it.id,
    }));
    const newTotal = newProduct.reduce(
      (total, it) => (total = total + it.price * it.count),
      0
    );
    setOrder({ ...order, products: newProduct, total: newTotal });
  }, [listProductChecked]);
  // function
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };

  const handleUpdateCartCount = (type: number, id: string) => {
    const cartItem = cart.filter((it) => it.id === id)[0];
    let newPayload = { account: user.account, data: cartItem };
    // type 0 : reduce | 1  : increase
    if (type) {
      newPayload = {
        ...newPayload,
        data: { ...newPayload.data, count: newPayload.data.count + 1 },
      };
    } else {
      newPayload = {
        ...newPayload,
        data: { ...newPayload.data, count: newPayload.data.count - 1 },
      };
    }
    dispatch<Action>(actionUpdateDataCart(newPayload));
  };
  const handleDeleteCart = (id: string) => {
    dispatch<Action>(
      actionDeleteDataCart({ account: user.account, arrID: [id] })
    );
  };
  const handleCheck = (id: string) => {
    const confident: boolean = listProductChecked.some((it) => it === id);
    if (confident) {
      setListProductChecked(listProductChecked.filter((it) => it !== id));
    } else {
      setListProductChecked([...listProductChecked, id]);
    }
  };
  const handleOnChangeInput = (e: {
    target: { name: string; value: string };
  }) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  const handleOrder = () => {
    const newDate = {
      time: currentDate.toLocaleTimeString("en-US"),
      date: currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    const confident = order.name && order.address && order.phone;
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const checkPhone = order.phone.match(regexPhoneNumber) ? true : false;
    if (confident && checkPhone) {
      dispatch<Action>(
        actionCreateDataOrder({
          order: { ...order, date: newDate },
          cartID: listProductChecked,
        })
      );
    } else {
      dispatch<Action>(actionCreateDataOrderFalse(listOrder));
    }
  };
  const [isShowBtnToTop, setIsShowBtnToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        console.log(window.pageYOffset, 1);
        setIsShowBtnToTop(true);
      } else {
        setIsShowBtnToTop(false);
      }
    });
  }, []);
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main className="w-full p-4 bg-gray-200 relative">
        <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
        {/* ---  */}
        <div className="w-full capitalize text-sm font-normal py-2 flex gap-2">
          <Link to="/">trang chủ</Link>
          <span> / </span>
          <span>giỏ hàng ({cart.length})</span>
        </div>
        {/* toast */}

        {/* ---- */}
        <div className={clsx(styles.wrapper_content, "flex")}>
          <div className="w-2/3 pr-2 ">
            <div className="rounded-lg bg-white">
              <h2 className="w-full p-2 capitalize font-bold text-2xl border-b">
                Giỏ hàng của bạn
              </h2>
              {cart.length ? (
                <div className="p-3">
                  <p>
                    Bạn đang có <b>{cart.length} sản phẩm</b> trong giỏ hàng
                  </p>
                  <div>
                    {data.map((it) => (
                      <div
                        key={it.id}
                        className={clsx(styles.item_product, "flex flex-wrap")}
                      >
                        <div className={clsx(styles.item_product_left)}>
                          <div
                            className={clsx(styles.item_product_left_checkbox)}
                          >
                            <div
                              className={clsx(
                                listProductChecked.includes(it.id)
                                  ? "bg-amber-500"
                                  : "bg-white"
                              )}
                              onClick={() => handleCheck(it.id)}
                            >
                              {listProductChecked.includes(it.id) ? (
                                <FaCheck />
                              ) : (
                                ""
                              )}
                            </div>
                            <input type="checkbox" />
                          </div>
                          <button
                            onClick={() => {
                              handleDeleteCart(it.id);
                            }}
                          >
                            xóa
                          </button>
                          <img src={it.imgURL} />
                        </div>
                        <div className={clsx(styles.item_product_center)}>
                          <div>
                            <p>{it.productName}</p>
                            <span>{it.color}</span>
                          </div>

                          <span>{VND.format(+it.price)}</span>
                        </div>
                        <div className={clsx(styles.item_product_right)}>
                          <b className="w-full text-right text-lg">
                            {VND.format(+it.price * +it.count)}
                          </b>
                          <div className="flex">
                            <button
                              className={clsx(
                                it.count - 1 ? "" : "cursor-not-allowed",
                                "bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400"
                              )}
                              onClick={(e) => {
                                if (it.count - 1) {
                                  handleUpdateCartCount(0, it.id);
                                } else {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <FaMinus />
                            </button>
                            <div className="w-8 h-full bg-white text-xl font-bold border text-center">
                              {it.count}
                            </div>
                            <button
                              className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400"
                              onClick={() => {
                                handleUpdateCartCount(1, it.id);
                              }}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={clsx(styles.note)}>
                    <b>Ghi chú đơn hàng</b>
                    <textarea
                      name="description"
                      onChange={(e) => handleOnChangeInput(e)}
                      value={order.description}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <p className="p-4 capitalize">Giỏ hàng của bạn đang trống</p>
              )}
            </div>
          </div>
          <div className="w-1/3 pl-2 ">
            <div className=" rounded-lg bg-white">
              <h2 className="w-full p-2 capitalize font-bold text-2xl border-b">
                Thông tin đơn hàng
              </h2>

              <div className="p-3 flex flex-col justify-between gap-2 capitalize">
                <div className="flex ">
                  <span className="inline-block w-28">người nhận :</span>
                  <input
                    type="text"
                    value={order.name}
                    name="name"
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) => handleOnChangeInput(e)}
                  />
                </div>
                <div className="flex ">
                  <span className="inline-block uppercase w-28">Sdt :</span>
                  <input
                    type="text"
                    value={order.phone}
                    name="phone"
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) => handleOnChangeInput(e)}
                  />
                </div>
                <div className="flex ">
                  <span className="inline-block w-28">địa chỉ :</span>
                  <input
                    type="text"
                    name="address"
                    value={order.address}
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) => handleOnChangeInput(e)}
                  />
                </div>
                <div className="text-xl flex justify-between border-t mt-4 pt-4">
                  <b>Tổng tiền:</b>
                  <b className="text-red-500">{VND.format(+order.total)}</b>
                </div>
                <div className="w-full flex justify-center items-center mt-6">
                  <button
                    className={clsx(
                      order.total
                        ? "bg-red-500 text-white hover:bg-amber-500 hover:text-black"
                        : "bg-gray-500 text-black cursor-not-allowed",
                      "w-4/5 capitalize border  p-1 rounded-lg  font-bold text-lg"
                    )}
                    onClick={handleOrder}
                  >
                    đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
