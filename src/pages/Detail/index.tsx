import clsx from "clsx";
import styles from "./Detail.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "./style.css";
import { data } from "~/db";
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
import { AiFillLike,AiOutlineRollback } from "react-icons/ai";
import ProductSale from "../Home/components/ProductSale";
import {BsShieldCheck} from 'react-icons/bs'
import { VND } from "~/function";
import banner from '~/assets/imgs/product_banner.jpg'
function Detail() {
  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  const [product, setProduct] = useState(data[0]);
  const [slide, setSlide] = useState({
    index: 1,
    name: "",
    imgURL: "",
  });
  const [color, setColor] = useState(product.color[0]);
  const [changeColor,setChangeColor] = useState(product.color[0])
  //  effect
  useEffect(() => {
    const slideFind = product.productIMG.filter(
      (it) => it.id === slide.index
    )[0];
    setSlide({
      ...slide,
      imgURL: slideFind.imgURL,
    });
  }, [slide.index]);
  const [statusBtnControl, setStatusBtnControl] = useState(0);
  // function
  const handleNextSlide = (): void => {
    const indexEnd = product.productIMG.length;
    if (indexEnd === slide.index) {
      setSlide({ ...slide, index: 1 });
    } else {
      setSlide({ ...slide, index: slide.index + 1 });
    }
  };
  const handlePrevSlide = (): void => {
    const indexEnd = product.productIMG.length;
    if (slide.index === 1) {
      setSlide({ ...slide, index: indexEnd });
    } else {
      setSlide({ ...slide, index: slide.index - 1 });
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
  
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main className="w-full px-4 bg-gray-200 pb-5">
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
              <img src={product.productIMG[slide.index - 1].imgURL} />
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
              {product.productIMG.map((it) => (
                <button
                  onClick={() =>
                    setSlide({
                      index: it.id,
                      imgURL: it.imgURL,
                      name: it.name,
                    })
                  }
                >
                  <img
                    src={it.imgURL}
                    className={clsx(
                      slide.index === it.id
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
                tình trạng : <b className="text-amber-500">Còn hàng</b>
              </span>
              <div className="w-0.5 h-4 bg-gray-500"></div>
              <span>
                thương hiệu : <b className="text-amber-500">{product.nsx}</b>
              </span>
            </div>
            <div className="bg-gray-200 capitalize rounded-lg p-4 flex items-center w-11/12 my-3">
              <b className="w-1/6 ">giá :</b>
              <b className="text-3xl w-1/3 text-right pr-3 text-red-600 font-semibold">
                {VND.format(+product.sale)}
              </b>
              <del className="text-lg font-normal text-gray-600">
                {VND.format(+product.price)}
              </del>
              <span className="border rounded border-red-500 px-2 ml-2 text-red-500 font-semibold text-sm py-1">
                - {product.percentSale} %
              </span>
            </div>
            <div className="flex items-center py-2 capitalize gap-4 pl-4">
              <div className="flex flex-col text-sm font-bold">
                <span>màu sắc :</span>
                <span>{changeColor}</span>
              </div>
              <div className="flex gap-4">
                {product.color.map((it) => (
                  <div
                    style={{ backgroundColor: `${it}` }}
                    className={clsx(
                      "w-10 h-10 rounded-full flex justify-center items-center "
                    )}
                    onMouseMove={() =>setChangeColor(it)}
                  >
                    {it === color ? (
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
            <div className="flex gap-4 capitalize py-4 font-bold pl-4 items-center">
              <span>số lượng : </span>
              <div className="flex">
                <button className="bg-gray-300  w-10 h-10 flex justify-center items-center hover:bg-amber-400">
                  <FaMinus />
                </button>
                <div className="w-10 h-10 bg-white  text-xl font-bold border items-center justify-center flex">
                  1
                </div>
                <button className="bg-gray-300  w-10 h-10 flex justify-center items-center hover:bg-amber-400">
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex justify-between  mt-4 pr-4">
              <button className="w-2/5 py-3 rounded-xl bg-white text-red-600 border border-red-600 capitalize font-semibold hover:bg-red-600 hover:text-white">
                thêm vào giỏ hàng
              </button>
              <button className="w-2/5 py-3 rounded-xl bg-red-700 text-white border border-red-600 capitalize font-semibold hover:text-red-600 hover:bg-white">
                mua ngay
              </button>
            </div>
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
        {/* ---- */}
        <ProductSale
        title={"Sản phẩm liên quan"}
        childrenTop={""}
        buttonBottom={""}
        dataUI={{
          bgColorWrapper: "#fff",
          bgColorItem: "#fff",
          colorTitle: "#000",
        }}
      />
      {/* ----- */}
      <ProductSale
        title={"Sản phẩm đã xem"}
        childrenTop={""}
        buttonBottom={""}
        dataUI={{
          bgColorWrapper: "#fff",
          bgColorItem: "#fff",
          colorTitle: "#000",
        }}
      />
       
      </main>
      <Footer />
    </>
  );
}

export default Detail;
