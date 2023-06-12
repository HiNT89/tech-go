import clsx from "clsx";
import styles from "./Search.module.scss";
import { useState, useEffect } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { data } from "~/db";
import ItemProduct from "~/components/ItemProduct";
import { numberToArray } from "~/function";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Empty from "./empty";
import Pagination from "~/components/Pagination";
function Search() {
  const [showNav, setShowNav] = useState(false);
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: data.slice(0, 4),
    sumPage: Math.floor(data.length / 4),
  });
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  const handlePrevPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex - 1 });
  };
  const handleChangePage = (it: number) => {
    setPage({ ...page, pageIndex: it });
  };
  const handleNextPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex + 1 });
  };
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      {false ? (
        <main className="w-full px-4">
          <div className="flex flex-col items-center gap-3 py-4">
            <h1 className="font-bold text-3xl capitalize">Tìm kiếm</h1>
            <p className="capitalize text-sm font-normal">
              có <b>27 sản phẩm</b> cho tìm kiếm
            </p>
            <div className="w-28 h-2 bg-black"></div>
          </div>
          <p className="py-3 text-sm font-normal">
            Kết quả tìm kiếm cho <b>"i"</b>
          </p>
          <div className="flex flex-wrap gap-3">
            {page.listData.map((it) => (
              <div style={{ width: "calc(25% - 12px)" }}>
                <ItemProduct key={it.id} data={it} />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <Pagination
              page={page}
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
