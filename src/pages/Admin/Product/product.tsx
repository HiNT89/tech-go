import clsx from "clsx";
import styles from "../Admin.module.scss";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { numberToArray } from "~/function";
import { Link } from "react-router-dom";
import { data } from "~/db";
import CreateProduct from "./createProduct";
// import { v4 as uuidv4 } from "uuid"
const listData = numberToArray(20);

function Product() {
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: listData.slice(0, 5),
    sumPage: Math.floor(listData.length / 5),
  });

  const [isCreate, setIsCreate] = useState(true);
  const handlePrevPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex - 1 });
  };
  const handleChangePage = (it: number) => {
    setPage({ ...page, pageIndex: it });
  };
  const handleNextPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex + 1 });
  };
  const handleToggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <div className={clsx(styles.wrapper_product, "p-4")}>
      {isCreate ? (
        <CreateProduct handleToggleCreate={handleToggleCreate} />
      ) : (
        ""
      )}
      <h2 className="font-bold uppercase text-2xl text-red-600">
        danh sách sản phẩm
      </h2>
      <div className="flex justify-between">
        <div className="capitalize my-4 font-semibold">
          trang : {page.pageIndex} / {page.sumPage}
        </div>
        {!isCreate ? (
          <button className="capitalize bg-amber-500 py-1 px-2 text-black rounded-lg font-bold text-sm" onClick={handleToggleCreate}>
            thêm sản phẩm
          </button>
        ) : (
          ""
        )}
      </div>

      <table
        className="border w-full border-gray-500 capitalize mt-6"
        cellSpacing={"0"}
        cellPadding={"8"}
      >
        <thead>
          <th>STT</th>
          <th>mã sản phẩm</th>
          <th>tên sản phẩm</th>
          <th>số lượng còn lại</th>
          <th>số lượng còn lại đã bán</th>
          <th>màu sắc</th>
          <th>giá</th>

          <th>giá khuyễn mại</th>
          <th style={{ minWidth: "100px" }}>xem chi tiết</th>
        </thead>
        <tbody>
          {page.listData.map((it, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>123abc</td>
              <td>iphone 12</td>
              <td>2</td>
              <td>2</td>
              <td>blue (1),black(1)</td>
              <td>2000000</td>
              <td>2000000</td>
              <td style={{ minWidth: "100px" }}>
                <Link
                  to=""
                  className="hover:text-black text-white p-2  rounded-md bg-amber-500 font-semibold"
                >
                  chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}

export default Product;
