import clsx from "clsx";
import styles from "./Admin.module.scss";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { numberToArray } from "~/function";
const listData = numberToArray(20);
function Customer() {
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
    <div className={clsx(styles.wrapper_customer, "p-4")}>
      <h2 className="font-bold uppercase text-2xl text-red-600">
        danh sách khách hàng
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
          <th>tên</th>
          <th>địa chỉ</th>
          <th>số đơn hàng</th>
          <th>tổng tiền</th>
          <th>điện thoại</th>
          <th>email</th>
        </thead>
        <tbody>
          {page.listData.map((it, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>nguyen trung hieu</td>
              <td>g3 trung tu dong da ha noi</td>
              <td>2</td>
              <td>2000000</td>
              <td>0962611801</td>
              <td>2001hieunt89@gmail.com</td>
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

export default Customer;
