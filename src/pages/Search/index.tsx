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
            <div className="flex gap-2">
              {page.pageIndex > 1 ? (
                <button
                  className={clsx(
                    "w-8 h-8 border flex justify-center items-center text-lg font-bold hover:bg-blue-600 hover:text-white"
                  )}
                  onClick={() =>
                    setPage({ ...page, pageIndex: page.pageIndex - 1 })
                  }
                >
                  <FaAngleDoubleLeft />
                </button>
              ) : (
                ""
              )}
              {numberToArray(page.sumPage).map((it) => (
                <button
                  className={clsx(
                    "w-8 h-8 border flex justify-center items-center text-lg font-bold hover:bg-blue-600 hover:text-white",
                    it === page.pageIndex ? "bg-amber-400 text-white" : ""
                  )}
                  onClick={() => setPage({ ...page, pageIndex: it })}
                >
                  {it}
                </button>
              ))}
              {page.pageIndex < page.sumPage ? (
                <button
                  className={clsx(
                    "w-8 h-8 border flex justify-center items-center text-lg font-bold hover:bg-blue-600 hover:text-white"
                  )}
                  onClick={() =>
                    setPage({ ...page, pageIndex: page.pageIndex + 1 })
                  }
                >
                  <FaAngleDoubleRight />
                </button>
              ) : (
                ""
              )}
            </div>
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
