import clsx from "clsx";
import styles from "./Detail.module.scss";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "./style.css";
import {
  FaAngleRight,
  FaAngleLeft,
  FaCheck,
  FaPlus,
  FaMinus,
  FaBox,
  FaShippingFast,
  FaPhoneVolume,
} from "react-icons/fa";
import { AiFillLike, AiOutlineRollback } from "react-icons/ai";
import Products from "../Home/components/Products";
import { BsShieldCheck } from "react-icons/bs";
import { VND } from "~/function";
import banner from "~/assets/imgs/product_banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { listProductSE, userSE } from "~/rootSaga/selectors";
import ButtonBackToTop from "~/components/ButtonBackToTop";

import {
  actionCreateDataCart,
  actionGetDataCart,
  actionGetProduct,
} from "~/pages/saga/action";
interface Action {
  type: string;
  payload: {};
}
const dataDefault = {
  productName: "",
  nsx: "",
  price: 0,
  sale: 0,
  percentSale: 0,
  description: "",
  productID: "",
  type: "",
  count: [
    {
      id: "",
      color: "đen",
      count: 1,
      remaining: 1,
      imgURL:
        "https://firebasestorage.googleapis.com/v0/b/techgo-b1a51.appspot.com/o/product_12_1_f5ccbd4611264aa689ade7ac66582992_343191087259479a81b8e9e878d6abd1_master.png?alt=media&token=64a68e34-88c9-4f23-8a34-5636a61de2f1",
      codeColor: "#000",
    },
  ],
  id: "1",
};

function Detail() {
  const user = useSelector(userSE);
  const dispatch = useDispatch();
  const { v4: uuidv4 } = require("uuid");
  const { productID } = useParams();
  const listProduct = useSelector(listProductSE);
  if (!(listProduct.length - 1)) {
    dispatch<Action>(actionGetProduct());
  }

  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };

  const [product, setProduct] = useState(
    listProduct.filter((it) => it.id === productID)[0] || dataDefault
  );
  const [slide, setSlide] = useState({
    ...product.count[0],
    index: 0,
  });
  const [isStocking, setIsStocking] = useState(true);
  const [order, setOrder] = useState({
    count: 1,
    productID: product.id,
    color: slide.color,
    status: "processing",
  });
  const [color, setColor] = useState(product.count[0].color);
  const [changeColor, setChangeColor] = useState(product.count[0].color);
  const colorRef = useRef(product.count[0].color);
  const [statusBtnControl, setStatusBtnControl] = useState(0);
  const [dataComponents, setDataComponents] = useState({
    productSale: listProduct.filter((it) => +it.sale),
  });
  //  effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const slideFind = product.count.filter((it) => it.id === slide.id)[0];
    setSlide({
      ...slideFind,
      index: slide.index,
    });
  }, [slide.index]);
  useEffect(() => {
    setChangeColor(color);
    colorRef.current = color;
    const objImg = product.count.filter((it) => it.color === color)[0];
    const index = product.count.findIndex((it) => it.color === color);
    setSlide({ index: index, ...objImg });
    setOrder({
      ...order,
      color: color,
      count: 1,
    });
    setIsStocking(
      !!product.count.filter((it) => it.color === color)[0].remaining
    );
  }, [color]);
  useEffect(() => {
    const productNew =
      listProduct.filter((it) => it.id === productID)[0] || dataDefault;
    setProduct(productNew);
    setSlide({
      ...productNew.count[0],
      index: 0,
    });
    setOrder({
      count: 1,
      productID: productNew.id,
      color: slide.color,
      status: "processing",
    });
    setColor(productNew.count[0].color);
    setChangeColor(productNew.count[0].color);
    colorRef.current = productNew.count[0].color;
  }, [productID, listProduct]);
  // function
  const handleNextSlide = (): void => {
    const indexEnd = product.count.length;
    if (indexEnd - 1 === slide.index) {
      setSlide({ ...product.count[0], index: 0 });
    } else {
      setSlide({ ...product.count[slide.index + 1], index: slide.index + 1 });
    }
  };
  const handlePrevSlide = (): void => {
    const indexEnd = product.count.length;
    if (slide.index === 0) {
      setSlide({ ...product.count[indexEnd - 1], index: indexEnd - 1 });
    } else {
      setSlide({ ...product.count[slide.index - 1], index: slide.index - 1 });
    }
  };
  const handleStatusBtnControl = (status: number, typeBtn: string): string => {
    let result = "";
    if (status === 1) {
      result = `${typeBtn}In`;
    } else if (status === -1) {
      result = `${typeBtn}Out`;
    }
    return result;
  };
  const handleAddProductToCart = () => {
    const payload = {
      account: user.account,
      data: {
        id: uuidv4(),
        count: order.count,
        productID: order.productID,
        color: order.color,
      },
    };
    dispatch<Action>(actionCreateDataCart(payload));
  };
  const [isShowBtnToTop, setIsShowBtnToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setIsShowBtnToTop(true);
      } else {
        setIsShowBtnToTop(false);
      }
    });
  }, []);
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main className="w-full px-4 bg-gray-200 pb-5 relative">
        <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
        {/* ---  */}
        <div className="w-full capitalize text-sm font-normal py-2 flex gap-2">
          <Link to="/">trang chủ</Link>
          <span> / </span>
          <span>tất cả sản phẩm</span>
        </div>
        {/* ---- */}
        <div className="w-full bg-white flex p-4 rounded">
          <div
            className={clsx(
              styles.product_img,
              "flex flex-col justify-between pr-4"
            )}
          >
            <div className={clsx(styles.product_img_top)}>
              <div className={clsx(styles.product_img_top_sale)}>
                <span>- {product.percentSale} %</span> OFF
              </div>
              <img src={product.count[slide.index].imgURL} />
              <div
                className={clsx(styles.slide_controls, "px-2")}
                onMouseOver={() => setStatusBtnControl(1)}
                onMouseLeave={() => setStatusBtnControl(-1)}
              >
                <button
                  className={clsx(
                    styles.slide_control,
                    styles.slide_control_left,
                    handleStatusBtnControl(statusBtnControl, "left"),
                    "w-10 h-10"
                  )}
                  onClick={handlePrevSlide}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className={clsx(
                    styles.slide_control,
                    styles.slide_control_right,
                    handleStatusBtnControl(statusBtnControl, "right"),
                    "w-10 h-10"
                  )}
                  onClick={handleNextSlide}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
            <div className={clsx(styles.product_img_bottom)}>
              {product.count.map((it) => (
                <button
                  onClick={() => {
                    setSlide({
                      ...it,
                      index: product.count.findIndex(
                        (item) => item.id === it.id
                      ),
                    });
                  }}
                >
                  <img
                    src={it.imgURL}
                    className={clsx(
                      slide.id === it.id
                        ? "border-amber-500"
                        : "border-gray-400",
                      "border"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className={clsx(styles.product_info, " border-l pl-4")}>
            <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
            <div className="capitalize flex gap-2 items-center">
              <span>
                tình trạng :
                <b className="text-amber-500">
                  {isStocking ? "Còn hàng" : "hết hàng"}
                </b>
              </span>
              <div className="w-0.5 h-4 bg-gray-500"></div>
              <span>
                thương hiệu : <b className="text-amber-500">{product.nsx}</b>
              </span>
            </div>
            <div className="bg-gray-200 capitalize rounded-lg p-4 flex items-center w-11/12 my-3">
              <b className="w-1/6 ">giá :</b>

              <b className="text-3xl w-1/3 text-right pr-3 text-red-600 font-semibold">
                {product.sale
                  ? VND.format(+product.sale)
                  : VND.format(+product.price)}
              </b>
              {product.sale ? (
                <del className="text-lg font-normal text-gray-600 mx-4">
                  {VND.format(+product.price)}
                </del>
              ) : (
                ""
              )}
              {product.sale ? (
                <span className="border rounded border-red-500 px-2 ml-2 text-red-500 font-semibold text-sm py-1">
                  - {product.percentSale} %
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center py-2 capitalize gap-4 pl-4">
              <div className="flex flex-col text-sm font-bold">
                <span>màu sắc :</span>
                <span>{changeColor}</span>
              </div>
              <div className="flex gap-4">
                {product.count.map((it) => (
                  <div
                    style={{ backgroundColor: `${it.codeColor}` }}
                    className={clsx(
                      "w-10 h-10 rounded-full flex justify-center items-center border "
                    )}
                    onMouseMove={() => setChangeColor(it.color)}
                    onMouseLeave={() => setChangeColor(colorRef.current)}
                    onClick={() => {
                      setColor(it.color);
                    }}
                  >
                    {it.color === color ? (
                      <span className="text-yellow-500 bg-white inline-block w-6 h-6 rounded-full flex justify-center items-center">
                        <FaCheck />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
            {isStocking ? (
              <>
                <div className="flex gap-4 capitalize py-4 font-bold pl-4 items-center">
                  <span>số lượng : </span>
                  <div className="flex">
                    <button
                      className="bg-gray-300  w-10 h-10 flex justify-center items-center hover:bg-amber-400"
                      onClick={() => {
                        const newCount =
                          order.count === 1 ? order.count : order.count - 1;

                        setOrder({ ...order, count: newCount });
                      }}
                    >
                      <FaMinus />
                    </button>
                    <div className="w-10 h-10 bg-white  text-xl font-bold border items-center justify-center flex">
                      {order.count}
                    </div>
                    <button
                      className="bg-gray-300  w-10 h-10 flex justify-center items-center hover:bg-amber-400"
                      onClick={() => {
                        const newCount =
                          order.count < slide.remaining
                            ? order.count + 1
                            : order.count;
                        setOrder({ ...order, count: newCount });
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between  mt-4 pr-4">
                  <button
                    className="w-2/5 py-3 rounded-xl bg-white text-red-600 border border-red-600 capitalize font-semibold hover:bg-red-600 hover:text-white"
                    onClick={handleAddProductToCart}
                  >
                    thêm vào giỏ hàng
                  </button>
                  <button className="w-2/5 py-3 rounded-xl bg-red-700 text-white border border-red-600 capitalize font-semibold hover:text-red-600 hover:bg-white">
                    mua ngay
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className={clsx(styles.product_policy)}>
            <div className=" border border-gray-600 flex flex-col gap-4 rounded-lg text-sm p-4 mb-5">
              <div>
                <h3 className="font-bold mb-3">Chính sách bán hàng</h3>
                <ul className="pl-2">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400 text-lg">
                      <FaBox />
                    </span>
                    <span>Cam kết 100% chính hãng</span>
                  </li>
                  <li className="flex items-center gap-2 my-2">
                    <span className="text-gray-400 text-lg">
                      <FaShippingFast />
                    </span>
                    <span>Miễn phí giao hàng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400 text-lg">
                      <FaPhoneVolume />
                    </span>
                    <span>Hỗ trợ 24/7</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Thông tin thêm</h3>
                <ul className="pl-2">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400 text-lg">
                      <BsShieldCheck />
                    </span>
                    <span>Hoàn tiền 111% nếu hàng giả</span>
                  </li>
                  <li className="flex items-center gap-2 my-2">
                    <span className="text-blue-400 text-lg">
                      <AiFillLike />
                    </span>
                    <span>Mở hộp kiểm tra nhận hàng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400 text-lg">
                      <AiOutlineRollback />
                    </span>
                    <span>Đổi trả trong 7 ngày</span>
                  </li>
                </ul>
              </div>
            </div>
            <img src={banner} alt="" />
          </div>
        </div>
        <div
          className="p-4 bg-white mt-6 rounded-lg"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        {/* ---- */}
        <Products
          title={"Sản phẩm liên quan"}
          childrenTop={""}
          buttonBottom={""}
          dataUI={{
            bgColorWrapper: "#fff",
            bgColorItem: "#fff",
            colorTitle: "#000",
          }}
          data={dataComponents.productSale}
        />
        {/* ----- */}
        <Products
          title={"Sản phẩm đã xem"}
          childrenTop={""}
          buttonBottom={""}
          dataUI={{
            bgColorWrapper: "#fff",
            bgColorItem: "#fff",
            colorTitle: "#000",
          }}
          data={dataComponents.productSale}
        />
      </main>
      <Footer />
    </>
  );
}

export default Detail;
