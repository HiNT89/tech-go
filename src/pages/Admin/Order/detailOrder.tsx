import { useDispatch, useSelector } from "react-redux";
import { orderSE, listProductSE } from "~/rootSaga/selectors";
import { typeOrders } from "~/pages/Order/dataUI";
import { useState } from "react";
import { VND } from "~/function";
function DetailOrder({ orderID }: { orderID: string }) {
  const orderData = useSelector(orderSE);
  const listProduct = useSelector(listProductSE);

  const [orderItem, setOrderItem] = useState(
    orderData.filter((it) => it.id === orderID)[0]
  );
  const filterImgProduct = ({
    id,
    color,
  }: {
    id: string;
    color: string;
  }): string => {
    let result: string = "";
    const productItem = listProduct.filter((it) => it.id === id)[0];
    result = productItem.count.filter((it) => it.color === color)[0].imgURL;
    return result;
  };
  return (
    <div className="py-6 px-4 flex flex-col items-center">
      <h1 className="uppercase text-3xl font-bold mb-6">thông tin đơn hàng</h1>
      <div className="flex w-full flex-col shadow-lg bg-gray-200 rounded-xl p-4 gap-6 capitalize">
        <div>
          {orderItem.products.map((it, index) => (
            <div key={index} className="flex">
              <div className="w-1/6">
                <img
                  src={filterImgProduct({
                    id: it.productID,
                    color: it.color,
                  })}
                  className="w-20 h-20 rounded"
                />
              </div>
              <div className="w-2/3 px-4">
                <h3 className="font-bold">{it.productName}</h3>
                <p className="text-gray-500">
                  <span>phân loại hàng :</span>
                  <span> {it.color}</span>
                </p>
                <span>X {it.count}</span>
                <p>
                  {
                    typeOrders.filter(
                      (item) => item.type === orderItem.status
                    )[0].name
                  }
                </p>
              </div>
              <div className="w-1/6">{VND.format(it.price)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span>thành tiền :</span>
          <span className="text-red-500 font-semibold">
            {VND.format(orderItem.total)}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-start">
        <h2 className="uppercase text-2xl font-bold my-4">
          thông tin người nhận
        </h2>
        <div className="capitalize flex flex-col gap-2">
          <div>
            <b className="w-40 inline-block">người nhận </b>
            <span>: {orderItem.name}</span>
          </div>
          <div>
            <b className="w-40 inline-block">địa chỉ </b>
            <span>: {orderItem.address}</span>
          </div>
          <div>
            <b className="w-40 inline-block">điện thoại </b>
            <span>: {orderItem.phone}</span>
          </div>
          <div>
            <b className="w-40 inline-block">thời gian đặt hàng </b>
            <span>: {orderItem.date.time} {orderItem.date.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
