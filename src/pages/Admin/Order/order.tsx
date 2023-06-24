import clsx from "clsx";
import styles from "../Admin.module.scss";
import { useEffect, useState } from "react";
import Pagination from "~/components/Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductSE, orderSE } from "~/rootSaga/selectors";
import { VND, convertText } from "~/function";
import { typeOrders } from "~/pages/Order/dataUI";
import { actionUpdateDataOrder } from "~/pages/saga/action";
interface Action {
  type: string;
  payload: any;
}
function Order() {
  const dispatch = useDispatch();
  const orderData = useSelector(orderSE);
  const listProduct = useSelector(listProductSE);
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: orderData.slice(0, 5),
    sumPage: Math.ceil(orderData.length / 5),
  });
  useEffect(() => {
    const newListData = orderData.slice(
      (page.pageIndex - 1) * 5,
      page.pageIndex * 5
    );
    setPage({ ...page, listData: newListData });
  }, [page.pageIndex]);
  useEffect(() => {
    setPage({ ...page, pageIndex: 1 });
  }, [orderData]);
  const handlePrevPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex - 1 });
  };
  const handleChangePage = (it: number) => {
    setPage({ ...page, pageIndex: it });
  };
  const handleNextPage = () => {
    setPage({ ...page, pageIndex: page.pageIndex + 1 });
  };
  const showProductName = (
    products: {
      productName: string;
      price: number;
      count: number;
      color: string;
      productID: string;
    }[]
  ): string => {
    let result: string = "";
    result = products.reduce(
      (name, it) => (name = name + it.productName + `(${it.color})`),
      result
    );
    return result;
  };
  const handleOnChangeStatus = (
    e: { target: { name: string; value: string } },
    idOrder: string
  ) => {
    const orderItem = orderData.filter((it) => it.id === idOrder)[0];
    const payload = { ...orderItem, status: e.target.value };
    const productItem = listProduct.filter((it) =>
      payload.products.map((item) => item.productID).includes(it.id)
    );
    dispatch<Action>(
      actionUpdateDataOrder({ order: payload, products: productItem })
    );
  };
  return (
    <div className={clsx(styles.wrapper_order, "p-4")}>
      <h2 className="font-bold uppercase text-2xl text-red-600">
        danh sách đơn hàng
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
          <th>mã đơn hàng</th>
          <th>sản phẩm</th>
          <th>số lượng SP</th>
          <th>địa chỉ</th>
          <th>tổng tiền</th>
          <th>trạng thái</th>
          <th>xem chi tiết</th>
        </thead>
        <tbody>
          {page.listData.map((it, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{convertText(it.id, 10)}</td>
              <td>{showProductName(it.products)}</td>
              <td>{it.products.length}</td>
              <td>{it.address}</td>
              <td>{VND.format(it.total)}</td>
              <td>
                <select
                  name="status"
                  value={
                    typeOrders.slice(1).filter((i) => i.type === it.status)[0]
                      .type
                  }
                  onChange={(e) => handleOnChangeStatus(e, it.id)}
                  className="p-1 capitalize outline-none text-red-600 font-semibold"
                >
                  {typeOrders.slice(1).map((i) => (
                    <option key={i.id} value={i.type}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <Link
                  to={`/admin/order/${it.id}`}
                  className="hover:text-black text-white p-2  w-20 block rounded-md bg-amber-500 font-semibold"
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

export default Order;
