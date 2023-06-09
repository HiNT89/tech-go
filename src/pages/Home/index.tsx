import styles from "./Home.module.scss";
import "./style.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import clsx from "clsx";
import {
  bannerTop,
  bannerBottom,
  slides,
  category,
  bannerSuggest,
  listBtnCategory,
  listBtnLuxury,
  news,
  trendSearch,
} from "./dataUI";
import { FaAngleRight, FaAngleLeft, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { data } from "~/db";
import Products from "./components/Products";
import BannerScale from "~/components/BannerScale";
import BannerMove from "~/components/BannerMove";
import ButtonCustom from "~/components/ButtonCustom";
import bannerCategory from "~/assets/imgs/home_tabs_1_banner.jpg";
import ItemProduct from "~/components/ItemProduct";
import HeaderCategory from "./components/HeaderCategory";
import banner1 from "~/assets/imgs/homebanner_1_img.jpg";
import banner2 from "~/assets/imgs/homebanner_2_img.jpg";
import Button from "@mui/material/Button";
import bannerNews from "~/assets/imgs/home_collection_3_banner.jpg";
import { VND, convertText } from "~/function";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { listProductSE } from "~/rootSaga/selectors";
import ButtonBackToTop from "~/components/ButtonBackToTop";
function Home() {
  const listProduct = useSelector(listProductSE);
  const navigate = useNavigate();
  // state
  const [slide, setSlide] = useState({
    index: 1,
    imgURL: "",
  });
  const [limitCategoryType, setLimitCategoryType] = useState(10);
  const [limitSlideFlycam, setLimitSlideFlycam] = useState(12);
  const [dataSlideFlycam, setDataSlideFlycam] = useState(listProduct);
  const [statusBtnControl, setStatusBtnControl] = useState(0);
  const [categoryType, setCategoryType] = useState({
    type: "phone",
    listData: listProduct
      .filter((it) => it.type === "phone")
      .slice(0, limitCategoryType),
  });
  const [categoryLuxury, setCategoryLuxury] = useState({
    type: "tv",
    listData: listProduct
      .filter((it) => it.type === "tv")
      .slice(0, limitCategoryType),
  });
  const [indexSlideFlycam, setIndexSlideFlycam] = useState(0);
  const [slideFlyCam, setSlideFlyCam] = useState({
    totalSlide: Math.ceil(dataSlideFlycam.length / limitSlideFlycam),
    listData: dataSlideFlycam.slice(
      indexSlideFlycam * limitSlideFlycam,
      (indexSlideFlycam + 1) * limitSlideFlycam
    ),
  });
  const [newsCategory, setNewsCategory] = useState({
    main: news.filter((it) => it.isMain)[0],
    listData: news.slice(1, 5),
  });
  const [dataComponents, setDataComponents] = useState({
    productSale: listProduct.filter((it) => +it.sale),
  });

  //  effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setSlideFlyCam({
      ...slideFlyCam,
      listData: dataSlideFlycam.slice(
        indexSlideFlycam * limitSlideFlycam,
        (indexSlideFlycam + 1) * limitSlideFlycam
      ),
    });
  }, [indexSlideFlycam, limitSlideFlycam]);
  useEffect(() => {
    const slideFind = slides.filter((it) => it.id === slide.index)[0];
    setSlide({
      ...slide,
      imgURL: slideFind.imgURL,
    });
  }, [slide.index]);
  useEffect(() => {
    // ------ filter by category

    const newListData = listProduct
      .filter((it) => it.type === categoryType.type)
      .slice(0, limitCategoryType);
    setCategoryType({ ...categoryType, listData: newListData });
  }, [categoryType.type, limitCategoryType]);
  useEffect(() => {
    // ------ filter by category
    const newListData = listProduct
      .filter((it) => it.type === categoryLuxury.type)
      .slice(0, 10);
    setCategoryLuxury({ ...categoryLuxury, listData: newListData });
  }, [categoryLuxury.type]);
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
  useEffect(() => {
    if (window.outerWidth < 767) {
      setLimitSlideFlycam(4);
    } else if (window.outerWidth < 1024) {
      setLimitSlideFlycam(8);
      setLimitCategoryType(9);
    }
  }, [window.outerWidth]);
  // function
  const handleNextSlideFlycam = (): void => {
    const indexEnd = slideFlyCam.totalSlide - 1;
    if (indexEnd === indexSlideFlycam) {
      setIndexSlideFlycam(0);
    } else {
      setIndexSlideFlycam(indexSlideFlycam + 1);
    }
  };

  const handlePrevSlideFlycam = (): void => {
    const indexEnd = slideFlyCam.totalSlide - 1;
    if (indexSlideFlycam === 0) {
      setIndexSlideFlycam(indexEnd);
    } else {
      setIndexSlideFlycam(indexSlideFlycam - 1);
    }
  };
  //-----------
  const handleNextSlide = (): void => {
    const indexEnd = slides.length;
    if (indexEnd === slide.index) {
      setSlide({ ...slide, index: 1 });
    } else {
      setSlide({ ...slide, index: slide.index + 1 });
    }
  };
  const handlePrevSlide = (): void => {
    const indexEnd = slides.length;
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

  const handleOnClickCategory = (type: string) => {
    setCategoryType({ ...categoryType, type: type });
  };
  const handleOnClickCategoryLuxury = (type: string) => {
    setCategoryLuxury({ ...categoryLuxury, type: type });
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
      <Header isShowNav={true} />
      {/* -------------- */}
      <div className={clsx(styles.banner, "w-full px-4")}>
        <div className={clsx(styles.banner_top, "flex gap-4")}>
          <div className={clsx(styles.banner_top_left)}>
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
            <img src={slide.imgURL} />
            <div className=" w-1/3 h-4 absolute bottom-2 right-1/2 translate-x-1/2 flex items-center gap-1 justify-center">
              {slides.map((it) => {
                if (it.id === slide.index) {
                  return (
                    <span
                      key={it.id}
                      className={clsx(
                        styles.dot,
                        "w-4 h-2 rounded-full bg-amber-500 inline-block"
                      )}
                    ></span>
                  );
                }
                return (
                  <span
                    key={it.id}
                    className={clsx(
                      styles.dot,
                      "w-2 h-2 rounded-full bg-gray-500 inline-block"
                    )}
                  ></span>
                );
              })}
            </div>
          </div>
          <div
            className={clsx(
              styles.banner_top_right,
              "flex flex-col items-center justify-between gap-4"
            )}
          >
            {bannerTop.map((it) => (
              <BannerMove key={it.id} imgURL={it.imgURL} />
            ))}
          </div>
        </div>
        <div
          className={clsx(styles.banner_bottom, "flex items-center px-4 gap-8")}
        >
          {bannerBottom.map((it) => (
            <BannerScale key={it.id} imgURL={it.imgURL} />
          ))}
        </div>
      </div>
      {/* ----------------------- */}
      <Products
        title={"SẢN PHẨM KHUYẾN MÃI"}
        childrenTop={
          <div className="flex gap-2">
            <div className="py-1 px-2 bg-amber-400 flex flex-col rounded text-black items-center">
              <span className="text-base">212</span>
              <span className="text-xs capitalize">ngay</span>
            </div>
            <div className="py-1 px-2 bg-amber-400 flex flex-col rounded text-black items-center">
              <span className="text-base">12</span>
              <span className="text-xs capitalize">giờ</span>
            </div>
            <div className="py-1 px-2 bg-amber-400 flex flex-col rounded text-black items-center">
              <span className="text-base">43</span>
              <span className="text-xs capitalize">phút</span>
            </div>
            <div className="py-1 px-2 bg-amber-400 flex flex-col rounded text-black items-center">
              <span className="text-base">22</span>
              <span className="text-xs capitalize">giây</span>
            </div>
          </div>
        }
        buttonBottom={
          <ButtonCustom
            title={"sản phẩm khuyến mãi"}
            onClick={() => {
              navigate(`/search-category/product-sale`);
            }}
          />
        }
        dataUI={{
          bgColorWrapper: "rgb(131, 23, 19)",
          bgColorItem: "#fff",
          colorTitle: "#fff",
        }}
        data={dataComponents.productSale}
      />
      {/* ---------------------- */}
      <Products
        title={"TOP SẢN PHẨM BÁN CHẠY"}
        childrenTop={""}
        buttonBottom={""}
        dataUI={{
          bgColorWrapper: "#fff",
          bgColorItem: "#fff",
          colorTitle: "#000",
        }}
        data={dataComponents.productSale}
      />
      {/* --------------------- */}
      <div className="w-full px-4 mt-16">
        <div className="w-full bg-white rounded flex flex-col ">
          <div className="w-full p-5 uppercase text-2xl font-bold">
            <h2>danh mục nổi bật</h2>
          </div>
          <div className="flex flex-wrap">
            {category.map((it) => (
              <Link
                to={it.path}
                key={it.id}
                className={clsx(styles.category_item)}
              >
                <img src={it.imgURL} />
                <span>{it.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* -------------------- */}
      <div className="w-full px-4 mt-10">
        <div className={clsx(styles.wrapper_banners, "w-full flex gap-8")}>
          {bannerSuggest.map((it) => (
            <BannerMove key={it.id} imgURL={it.imgURL} />
          ))}
        </div>
      </div>
      {/* ----------- album product new */}
      <div className="w-full px-4 mt-16">
        <div className="w-full">
          <HeaderCategory
            listButton={listBtnCategory}
            type={categoryType.type}
            title={"bộ sưu tập mới"}
            handleOnClickCategory={handleOnClickCategory}
          />
          <div className={clsx(styles.wrapper_new_product, "flex")}>
            <div className="pr-4">
              <img src={bannerCategory} className="w-full h-full" />
            </div>
            <div className="flex flex-wrap w-3/4 gap-4 md:gap-2 md:justify-around">
              {categoryType.listData.map((it) => (
                <div className={clsx(styles.wrapper_product_album)}>
                  <ItemProduct key={it.id} data={it} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <ButtonCustom
              title={categoryType.type}
              onClick={() => {
                navigate(`/search-category/${categoryType.type}`);
              }}
            />
          </div>
        </div>
      </div>
      {/* ---------- product luxury */}
      <div className="w-full px-4 mt-16">
        <div className="w-full">
          <HeaderCategory
            listButton={listBtnLuxury}
            type={categoryLuxury.type}
            title={"Sản phẩm cao cấp"}
            handleOnClickCategory={handleOnClickCategoryLuxury}
          />
          <div
            className={clsx(
              styles.wrapper_new_product,
              "flex flex-wrap gap-4 md:gap-2"
            )}
          >
            {categoryLuxury.listData.map((it) => (
              <div className={clsx(styles.wrapper_product_album)}>
                <ItemProduct key={it.id} data={it} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ------- banner */}
      <div className="w-full px-4 mt-16">
        <div className="w-full flex">
          <div className="w-1/2 pr-4">
            <BannerMove imgURL={banner1} />
          </div>
          <div className="w-1/2 pl-4">
            <BannerMove imgURL={banner2} />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-full px-4 mt-16">
        <div className="w-full bg-white px-4 py-5 rounded">
          <div className="flex mb-5">
            <div className="w-1/2 text-2xl capitalize font-bold">
              <h2>FLYCAM DJI CHÍNH HÃNG</h2>
            </div>
            <div
              className={clsx(styles.flycamBtn, "flex gap-4 w-1/2 justify-end")}
            >
              <Button
                className={clsx(styles.btn_control)}
                // disabled={!slide.index}
                onClick={handlePrevSlideFlycam}
              >
                <FaAngleLeft />
              </Button>
              <Button
                className={clsx(styles.btn_control)}
                onClick={handleNextSlideFlycam}
                // disabled={slide.index === slide.slide.length - 1}
              >
                <FaAngleRight />
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              styles.flyCamItem_wrapper,
              "flex flex-wrap gap-5 md:gap-3"
            )}
          >
            {slideFlyCam.listData.map((it) => (
              <div key={it.id} className={clsx(styles.flyCamItem, "flex")}>
                <div className="p-2">
                  <img src={it.count[0].imgURL} />
                </div>
                <div className="py-2 pl-1 flex-grow">
                  <span className={clsx(styles.product_name)}>
                    {it.productName}
                  </span>
                  <div className="flex justify-between items-center w-full">
                    <div
                      style={{ minHeight: "48px" }}
                      className="flex flex-col"
                    >
                      {it.sale ? (
                        <>
                          {" "}
                          <span className="text-red-600 font-semibold">
                            {VND.format(+it.sale)}
                          </span>
                          <del className="text-gray-500">
                            {VND.format(+it.price)}
                          </del>{" "}
                        </>
                      ) : (
                        <span className="text-black font-semibold">
                          {VND.format(+it.price)}
                        </span>
                      )}
                    </div>
                    {it.sale ? (
                      <span className="w-10 h-6 flex items-center justify-center font-semibold bg-pink-100 text-red-600 rounded text-xs">
                        - {it.percentSale}%
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* --------- news */}
      {/* <div className="w-full px-4 mt-16">
        <div className="w-full flex gap-7 ">
          <div className="w-3/4 bg-white rounded p-4">
            <div className="flex">
              <div className="w-1/2 text-2xl uppercase font-bold">
                <h2>Bài Viết Mới Nhất</h2>
              </div>
              <Link
                to=""
                className="w-1/2 flex items-center capitalize justify-end text-blue-600"
              >
                xem thêm <FaAngleRight />
              </Link>
            </div>
            <div className="py-4 flex h-full">
              <div className="w-1/2  pr-2 h-full flex flex-col gap-4">
                <div className="w-full h-2/3 overflow-hidden">
                  <BannerScale imgURL={newsCategory.main.imgURL} />
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="" className="text-lg font-bold hover:text-blue-600">
                    {newsCategory.main.title}
                  </Link>
                  <span className="text-xs font-normal">
                    {newsCategory.main.time}
                  </span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col pl-2 gap-4 h-full">
                {newsCategory.listData.map((it) => (
                  <div key={it.id} className="w-full flex gap-4">
                    <div className="w-1/3 overflow-hidden">
                      <BannerScale imgURL={it.imgURL} />
                    </div>
                    <div className="flex w-2/3 flex-col gap-2">
                      <Link
                        to=""
                        className="text-sm font-medium hover:text-blue-600"
                      >
                        {convertText(it.title, 70)}
                      </Link>
                      <span className="text-xs font-normal">{it.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <img src={bannerNews} className="rounded" />
          </div>
        </div>
      </div> */}
      {/* ---------- trend search */}
      <div className={clsx(styles.wrapper_trend_search, "w-full px-4 mt-16")}>
        <div className="w-full bg-white rounded flex ">
          <div className="w-1/5 flex flex-col justify-center items-center px-4">
            <h2 className="capitalize text-lg font-bold">xu hướng tìm kiếm</h2>
            <div className={clsx(styles.btnTrend, "w-full")}>
              <ButtonCustom title="" />
            </div>
          </div>
          <div className="flex w-4/5">
            {trendSearch.map((it) => (
              <Link
                to={it.path}
                // style={{ width: "calc(100% / 8)" }}
                key={it.id}
                className={clsx(styles.category_item)}
              >
                <img src={it.imgURL} />
                <span>{it.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {/* ----------- */}
    </div>
  );
}

export default Home;
