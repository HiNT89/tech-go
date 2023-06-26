import "./chart.scss";
import { chartOder, chartProduct } from "./chart";
import styles from "./Admin.module.scss";
import clsx from "clsx";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { listProductSE, orderSE, listUserSE } from "~/rootSaga/selectors";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { VND } from "~/function";
import { listNav } from "~/components/Header/dataUI";
function Dashboard() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const listProduct = useSelector(listProductSE);
  const orderData = useSelector(orderSE);
  const listUser = useSelector(listUserSE);
  const filterOrder = (
    orderData: {
      account: string;
      address: string;
      phone: string;
      id: string;
      products: {
        productName: string;
        price: number;
        count: number;
        color: string;
        productID: string;
      }[];
      total: number;
      name: string;
      status: string;
      description: string;
      date: {
        time: string;
        date: string;
      };
    }[],
    type: string
  ) => {
    return orderData.filter((it) => it.status === type);
  };
  const sumOrder = (
    orderData: {
      account: string;
      address: string;
      phone: string;
      id: string;
      products: {
        productName: string;
        price: number;
        count: number;
        color: string;
        productID: string;
      }[];
      total: number;
      name: string;
      status: string;
      description: string;
      date: {
        time: string;
        date: string;
      };
    }[],
    type: string
  ) => {
    return filterOrder(orderData, type).reduce(
      (sum, it) => (sum = sum + it.total),
      0
    );
  };

  const orderToday = (
    orderData: {
      account: string;
      address: string;
      phone: string;
      id: string;
      products: {
        productName: string;
        price: number;
        count: number;
        color: string;
        productID: string;
      }[];
      total: number;
      name: string;
      status: string;
      description: string;
      date: {
        time: string;
        date: string;
      };
    }[]
  ) => {
    let currentDate = new Date();
    const today = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const listOrder = orderData.filter((it) => it.date.date === today);
    return listOrder;
  };
  chartOder.series[0].data = chartOder.series[0].data.map((it) => {
    let newY = 0;
    switch (it.name) {
      case "Đã bán":
        {
          newY = Math.floor(
            (filterOrder(orderData, "delivered").length * 100) /
              orderData.length
          );
        }
        break;
      case "Đang giao":
        {
          newY = Math.floor(
            (filterOrder(orderData, "delivery").length * 100) / orderData.length
          );
        }
        break;
      case "Đang chờ xử lí":
        {
          newY = Math.floor(
            (filterOrder(orderData, "processing").length * 100) /
              orderData.length
          );
        }
        break;
    }

    return { ...it, y: newY };
  });
  chartProduct.series[0].data = chartProduct.series[0].data.map((it) => {
    const typeProduct = listNav.filter((i) => i.content === it.name)[0].type;
    const newY = Math.floor(
      (listProduct.filter((item) => item.type === typeProduct).length * 100) /
        listProduct.length
    );
    return { ...it, y: newY };
  });
  return (
    <div className="p-4">
      <section className={clsx(styles.wrapper_statistical, "flex")}>
        <div className="w-1/4 px-4">
          <div className=" bg-red-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">user</div>
            <div className="text-lg">{(listUser || []).length}</div>
          </div>
        </div>

        <div className="w-1/4 px-4">
          <div className=" bg-blue-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">order</div>
            <div className="text-lg">{orderData.length}</div>
          </div>
        </div>
        <div className="w-1/4 px-4">
          <div className=" bg-amber-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">product</div>
            <div className="text-lg">{listProduct.length}</div>
          </div>
        </div>
        <div className="w-1/4 px-4">
          <div className=" bg-green-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">revenue</div>
            <div className="text-lg">
              {VND.format(sumOrder(orderData, "delivered"))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full p-4 bg-white rounded-lg mt-4 flex flex-col gap-4">
        <h3 className="font-bold text-red-600 uppercase text-2xl">
          đơn hàng và doanh thu
        </h3>
        <div className="capitalize text-black flex gap-4">
          <b className="w-1/4">số đơn trong ngày : </b>
          <span className="font-bold text-lg text-red-600">
            {orderToday(orderData).length}
          </span>
        </div>
        <div className="capitalize text-black flex gap-4">
          <b className="w-1/4">doanh thu : </b>
          <span className="font-bold text-lg text-red-600">
            {VND.format(sumOrder(orderToday(orderData), "delivered"))}
          </span>
        </div>
      </section>
      <section className={clsx(styles.wrapper_charts, "py-4 flex")}>
        <div className="w-1/2 pr-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartProduct}
            ref={chartComponentRef}
          />
        </div>
        <div className="w-1/2 pl-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOder}
            ref={chartComponentRef}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
