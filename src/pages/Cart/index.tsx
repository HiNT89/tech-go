import styles from "./Cart.module.scss";
import clsx from "clsx";
import { useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link } from "react-router-dom";
import { data } from "~/db";
import { FaPlus, FaMinus } from "react-icons/fa";
import { VND } from "~/function";
function Cart() {
  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let formattedTime = currentDate.toLocaleTimeString("en-US");
  const [dataInput, setDataInput] = useState({
    name: "nguyễn trung hiếu",
    phone: "0962611801",
    address: "102e7 - thanh xuan bac - thanh xuan - ha noi",
    date: {
      time: formattedTime,
      date: formattedDate,
    },
  });
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main className="w-full p-4 bg-gray-200">
        {/* ---  */}
        <div className="w-full capitalize text-sm font-normal py-2 flex gap-2">
          <Link to="/">trang chủ</Link>
          <span> / </span>
          <span>giỏ hàng (2)</span>
        </div>
        {/* ---- */}
        <div className="flex">
          <div className="w-2/3 pr-2 ">
            <div className="rounded-lg bg-white">
              <h2 className="w-full p-2 capitalize font-bold text-2xl border-b">
                Giỏ hàng của bạn
              </h2>
              {false ? (
                <div className="p-3">
                  <p>
                    Bạn đang có <b>2 sản phẩm</b> trong giỏ hàng
                  </p>
                  <div>
                    {data.slice(0, 2).map((it) => (
                      <div
                        key={it.id}
                        className={clsx(styles.item_product, "flex")}
                      >
                        <div className={clsx(styles.item_product_left)}>
                          <button>xóa</button>
                          <img src={it.productIMG[0].imgURL} />
                        </div>
                        <div className={clsx(styles.item_product_center)}>
                          <div>
                            <p>{it.productName}</p>
                            <span>{it.color[0]}</span>
                          </div>

                          <span>{VND.format(+it.price)}</span>
                        </div>
                        <div className={clsx(styles.item_product_right)}>
                          <b className="w-full text-right text-lg">
                            {VND.format(+it.price * 1)}
                          </b>
                          <div className="flex">
                            <button className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400">
                              <FaMinus />
                            </button>
                            <div className="w-8 h-full bg-white text-xl font-bold border text-center">
                              1
                            </div>
                            <button className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400">
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={clsx(styles.note)}>
                    <b>Ghi chú đơn hàng</b>
                    <textarea></textarea>
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
                    value={dataInput.name}
                    name="name"
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) =>
                      setDataInput({
                        ...dataInput,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex ">
                  <span className="inline-block uppercase w-28">Sdt :</span>
                  <input
                    type="text"
                    value={dataInput.phone}
                    name="phone"
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) =>
                      setDataInput({
                        ...dataInput,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex ">
                  <span className="inline-block w-28">địa chỉ :</span>
                  <input
                    type="text"
                    name="address"
                    value={dataInput.address}
                    className="flex-grow p-1 outline-none border rounded capitalize"
                    onChange={(e) =>
                      setDataInput({
                        ...dataInput,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="flex ">
                  <span className="inline-block w-28">
                    thời gian đặt hàng :
                  </span>
                  <p
                    className="flex-grow p-1 outline-none border rounded capitalize text-sm"
                  >{ `${dataInput.date.time} ,${dataInput.date.date}`}</p>
                </div> */}
                <div className="text-xl flex justify-between border-t mt-4 pt-4">
                  <b>Tổng tiền:</b>
                  <b className="text-red-500">{VND.format(120000000)}</b>
                </div>
                <div className="w-full flex justify-center items-center mt-6">
                  <button className={clsx(false ? "bg-red-500 text-white hover:bg-amber-500 hover:text-black" : "bg-gray-500 text-black cursor-not-allowed","w-4/5 capitalize border  p-1 rounded-lg  font-bold text-lg")}>
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
