import "./chart.scss";
import { chartOder, chartProduct } from "./chart";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function Dashboard() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <div className="p-4">
      <section className="flex">
        <div className="w-1/4 px-4">
          <div className=" bg-red-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">user</div>
            <div className="text-lg">12</div>
          </div>
        </div>

        <div className="w-1/4 px-4">
          <div className=" bg-blue-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">order</div>
            <div className="text-lg">12</div>
          </div>
        </div>
        <div className="w-1/4 px-4">
          <div className=" bg-amber-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">product</div>
            <div className="text-lg">12</div>
          </div>
        </div>
        <div className="w-1/4 px-4">
          <div className=" bg-green-500 p-4 rounded capitalize flex flex-col text-white font-bold">
            <div className="text-xl">revenue</div>
            <div className="text-lg">12</div>
          </div>
        </div>
      </section>
      <section className="w-full p-4 bg-white rounded-lg mt-4 flex flex-col gap-4">
        <h3 className="font-bold text-red-600 uppercase text-2xl">
          đơn hàng và doanh thu
        </h3>
        <div className="capitalize text-black flex gap-4">
          <b className="w-1/4">số đơn trong ngày : </b>
          <span className="font-bold text-lg text-red-600">2</span>
        </div>
        <div className="capitalize text-black flex gap-4">
          <b className="w-1/4">doanh thu : </b>
          <span className="font-bold text-lg text-red-600">2000000</span>
        </div>
      </section>
      <section className="py-4 flex">
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
