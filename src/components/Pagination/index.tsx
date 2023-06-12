import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import clsx from "clsx";
import { numberToArray } from "~/function";
function Pagination({
  page,
  handlePrevPage,
  handleNextPage,
  handleChangePage,
}: {
  page: { pageIndex: number; listData: {}[]; sumPage: number };
  handlePrevPage: any;
  handleNextPage: any;
  handleChangePage: any;
}) {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex gap-2">
        {page.pageIndex > 1 ? (
          <button
            className={clsx(
              "w-8 h-8 border flex justify-center items-center text-lg font-bold hover:bg-blue-600 hover:text-white"
            )}
            onClick={handlePrevPage}
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
            onClick={() => handleChangePage(it)}
          >
            {it}
          </button>
        ))}
        {page.pageIndex < page.sumPage ? (
          <button
            className={clsx(
              "w-8 h-8 border flex justify-center items-center text-lg font-bold hover:bg-blue-600 hover:text-white"
            )}
            onClick={handleNextPage}
          >
            <FaAngleDoubleRight />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Pagination;
