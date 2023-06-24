import clsx from "clsx";
import styles from "./Admin.module.scss";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { useSelector } from "react-redux";
import { listUserSE, orderSE } from "~/rootSaga/selectors";
import { VND } from "~/function";
function Customer() {
  const listUser = useSelector(listUserSE);
  const orderData = useSelector(orderSE);
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: listUser.slice(0, 5),
    sumPage: Math.ceil(listUser.length / 5),
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
              <td>{it.name}</td>
              <td>{it.address}</td>
              <td>
                {orderData.filter((item) => item.account === it.account).length}
              </td>
              <td>
                {VND.format(
                  orderData
                    .filter(
                      (item) =>
                        item.account === it.account && item.status === "delivered"
                    )
                    .reduce((sum, it) => (sum = sum + it.total), 0)
                )}
              </td>
              <td>{it.phone}</td>
              <td>{it.typeAccount}</td>
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
