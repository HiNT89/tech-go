import clsx from "clsx";
import styles from "../Admin.module.scss";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { numberToArray } from "~/function";
import { Link } from "react-router-dom";
const listData = numberToArray(20);
function Order() {
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: listData.slice(0, 5),
    sumPage: Math.floor(listData.length / 5),
  });
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
    <div className={clsx(styles.wrapper_order, "p-4")}>
      <h2 className="font-bold uppercase text-2xl text-red-600">
        danh sách đơn hàng
      </h2>
      <div className="capitalize my-4 font-semibold">
        {" "}
        trang : {page.pageIndex} / {page.sumPage}
      </div>
      <table
        className="border w-full border-gray-500 capitalize mt-6"
        cellSpacing={"0"}
        cellPadding={"8"}
      >
        <thead>
          <th>STT</th>
          <th>mã đơn hàng</th>
          <th>sản phẩm</th>
          <th>số lượng SP</th>
          <th>địa chỉ</th>
          <th>tổng tiền</th>
          <th>điện thoại</th>
          <th>xem chi tiết</th>
        </thead>
        <tbody>
          {page.listData.map((it, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>123abc</td>
              <td>iphone 12 , iphone 13</td>
              <td>2</td>
              <td>g3 trung tu dong da ha noi</td>
              <td>2000000</td>
              <td>0962611801</td>
              <td><Link to = "" className="hover:text-black text-white p-2  rounded-md bg-amber-500 font-semibold">chi tiết</Link></td>
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

export default Order;
