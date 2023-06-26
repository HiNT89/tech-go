import clsx from "clsx";
import styles from "../Admin.module.scss";
import { useEffect, useState } from "react";
import Pagination from "~/components/Pagination";
import { VND } from "~/function";
import { Link } from "react-router-dom";
import EditProduct from "./editProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCreateProduct,
  actionGetProduct,
  actionDeleteProduct,
} from "../../saga/action";
import { listProductSE, userSE } from "~/rootSaga/selectors";
interface Action {
  type: string;
  payload: any;
}
function Product() {
  const dispatch = useDispatch();
  const listProduct = useSelector(listProductSE);
  const user = useSelector(userSE);
  const [page, setPage] = useState({
    pageIndex: 1,
    listData: listProduct.slice(0, 5),
    sumPage: Math.ceil(listProduct.length / 5),
  });

  useEffect(() => {
    setPage({
      pageIndex: 1,
      listData: listProduct.slice(0, 5),
      sumPage: Math.ceil(listProduct.length / 5),
    });
  }, [listProduct]);
  useEffect(() => {
    setPage({
      ...page,
      listData: listProduct.slice((page.pageIndex - 1) * 5, page.pageIndex * 5),
    });
  }, [page.pageIndex]);
  const [isCreate, setIsCreate] = useState(false);
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
  const submitBtn = (option: {
    productName: string;
    nsx: string;
    price: number;
    sale: number;
    percentSale: number;
    description: string;
    productID: string;
    type: string;
    count: {
      id: string;
      color: string;
      count: number;
      remaining: number;
      imgURL: string;
      codeColor: string;
    }[];
  }) => {
    dispatch<Action>(actionCreateProduct(option));
  };
  const showColor = (
    count: {
      id: string;
      color: string;
      count: number;
      remaining: number;
      imgURL: string;
      codeColor: string;
    }[]
  ) => {
    let result: string = count.reduce(
      (sum, it) => (sum = sum + `${it.color}(${it.remaining}) ,`),
      ""
    );
    return result;
  };
  const handleDeleteProduct = (id: string) => {
    dispatch<Action>(actionDeleteProduct({ account: user.account, id: id }));
  };
  return (
    <div className={clsx(styles.wrapper_product, "p-4")}>
      {isCreate ? (
        <EditProduct
          handleToggleCreate={handleToggleCreate}
          title={"thêm sản phẩm"}
          contentBtn={"thêm sản phẩm"}
          submitBtn={submitBtn}
          id={"0"}
        />
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
          <button
            className="capitalize bg-amber-500 py-1 px-2 text-black rounded-lg font-bold text-sm"
            onClick={handleToggleCreate}
          >
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
          <th style={{ minWidth: "100px" }}>xóa</th>
        </thead>
        <tbody>
          {page.listData.map((it, index) => (
            <tr key={it.id}>
              <td>{index + 1}</td>
              <td>{it.id}</td>
              <td>{it.productName}</td>
              <td>
                {it.count.reduce((sum, item) => (sum += +item.remaining), 0)}
              </td>
              <td>
                {it.count.reduce((sum, item) => (sum += +item.count), 0) -
                  it.count.reduce((sum, item) => (sum += +item.remaining), 0)}
              </td>
              <td>{showColor(it.count)}</td>
              <td>{VND.format(+it.price)}</td>
              <td>{VND.format(+it.sale)}</td>
              <td style={{ minWidth: "100px" }}>
                <Link
                  to={`/admin/product/${it.id}`}
                  className="hover:text-black text-white p-2 capitalize rounded-md bg-amber-500 font-semibold"
                >
                  chi tiết
                </Link>
              </td>
              <td>
                <button
                  className="hover:text-black text-white p-2  rounded-md bg-amber-500 font-semibold capitalize"
                  onClick={() => handleDeleteProduct(it.id)}
                >
                  xóa
                </button>
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
