import clsx from "clsx";
import styles from "./Search.module.scss";
import { useState, useEffect } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { removeVietnameseTones } from "~/function";
import ItemProduct from "~/components/ItemProduct";
import { listBtnCategory } from "../Home/dataUI";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Empty from "./empty";
import Pagination from "~/components/Pagination";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { listProductSE } from "~/rootSaga/selectors";
import ButtonBackToTop from "~/components/ButtonBackToTop";

function Search() {
  const { keySearch, typeProduct } = useParams();
  const listProduct = useSelector(listProductSE);
  const [showNav, setShowNav] = useState(false);
  const [data, setData] = useState(
    listProduct.filter((it) =>
      it.productName.toLowerCase().includes(keySearch?.replace(/-/g, " ") || "")
    )
  );
  const limit = 8;
  const [page, setPage] = useState({
    pageIndex: [1],
    listData: data.slice(0, limit),
    sumPage: Math.ceil(data.length / limit),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setPage({
      ...page,
      listData: data.slice(
        (page.pageIndex[0] - 1) * limit,
        page.pageIndex[0] * limit
      ),
    });
  }, [page.pageIndex]);
  useEffect(() => {
    const newData = listProduct.filter((it) =>
      removeVietnameseTones(it.productName.toLowerCase()).includes(
        removeVietnameseTones(keySearch?.replace(/-/g, " ") || "".toLowerCase())
      )
    );
    setData(newData);
    setPage({
      ...page,
      pageIndex: [1],
      sumPage: Math.ceil(newData.length / limit),
    });
  }, [keySearch]);
  useEffect(() => {
    if (typeProduct) {
      if (typeProduct === "product-sale") {
        const newData = listProduct.filter((it) => +it.sale);
        setData(newData);
        setPage({
          ...page,
          pageIndex: [1],
          sumPage: Math.ceil(newData.length / 8),
        });
      } else {
        const newData = listProduct.filter((it) => it.type === typeProduct);
        setData(newData);
        setPage({
          ...page,
          pageIndex: [1],
          sumPage: Math.ceil(newData.length / 8),
        });
      }
    }
  }, [typeProduct]);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  const handlePrevPage = () => {
    setPage({ ...page, pageIndex: [page.pageIndex[0] - 1] });
  };
  const handleChangePage = (it: number) => {
    setPage({ ...page, pageIndex: [it] });
  };
  const handleNextPage = () => {
    setPage({ ...page, pageIndex: [page.pageIndex[0] + 1] });
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
      {data.length ? (
        <main className="w-full px-4 relative">
           <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
          <div className="flex flex-col items-center gap-3 py-4">
            <h1 className="font-bold text-3xl capitalize">Tìm kiếm</h1>
            <p className="capitalize text-sm font-normal">
              có <b>{data.length} sản phẩm</b> cho tìm kiếm
            </p>
            <div className="w-28 h-2 bg-black"></div>
          </div>
          {typeProduct ? (
            <p className="py-3 text-sm font-normal">
              Kết quả tìm kiếm cho "
              <b>
                {typeProduct !== "product-sale"
                  ? listBtnCategory.filter((it) => it.type === typeProduct)[0]
                      .name
                  : "sản phẩm khuyến mãi"}
              </b>
              "
            </p>
          ) : (
            <p className="py-3 text-sm font-normal">
              Kết quả tìm kiếm cho " <b>{keySearch?.replace(/-/g, " ")}</b> "
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {page.listData.map((it) => (
              <div className={clsx(styles.product_wrapper)}>
                <ItemProduct key={it.id} data={it} />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <Pagination
              page={{ ...page, pageIndex: page.pageIndex[0] }}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleChangePage={handleChangePage}
            />
          </div>
        </main>
      ) : (
        <Empty />
      )}

      <Footer />
    </>
  );
}

export default Search;
