// Create the chart
import { listNav } from "~/components/Header/dataUI";
const chartProduct = {
  chart: {
    type: "pie",
    className: "hight_chart",
  },
  title: {
    text: "Sản phẩm",
    align: "left",
  },

  accessibility: {
    announceNewData: {
      enabled: true,
    },
    point: {
      valueSuffix: "%",
    },
  },

  plotOptions: {
    series: {
      borderRadius: 5,
      dataLabels: {
        enabled: true,
        format: "{point.name}: {point.y:.1f}%",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
  },

  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: listNav.slice(1).map((it, index) => {
        return {
          name: it.content,
          y: index,
          drilldown: it.content,
        };
      }),
      // data: [
      //   {
      //     name: "Chrome",
      //     y: 61.04,
      //     drilldown: "Chrome",
      //   },
      //   {
      //     name: "Safari",
      //     y: 9.47,
      //     drilldown: "Safari",
      //   },
      //   {
      //     name: "Edge",
      //     y: 9.32,
      //     drilldown: "Edge",
      //   },
      //   {
      //     name: "Firefox",
      //     y: 8.15,
      //     drilldown: "Firefox",
      //   },
      //   {
      //     name: "Other",
      //     y: 11.02,
      //     drilldown: null,
      //   },
      // ],
    },
  ],
  // drilldown: {
  //   series: [
  //     {
  //       name: "Chrome",
  //       id: "Chrome",
  //       data: [
  //         ["v97.0", 36.89],
  //         ["v96.0", 18.16],
  //         ["v95.0", 0.54],
  //         ["v94.0", 0.7],
  //         ["v93.0", 0.8],
  //         ["v92.0", 0.41],
  //         ["v91.0", 0.31],
  //         ["v90.0", 0.13],
  //         ["v89.0", 0.14],
  //         ["v88.0", 0.1],
  //         ["v87.0", 0.35],
  //         ["v86.0", 0.17],
  //         ["v85.0", 0.18],
  //         ["v84.0", 0.17],
  //         ["v83.0", 0.21],
  //         ["v81.0", 0.1],
  //         ["v80.0", 0.16],
  //         ["v79.0", 0.43],
  //         ["v78.0", 0.11],
  //         ["v76.0", 0.16],
  //         ["v75.0", 0.15],
  //         ["v72.0", 0.14],
  //         ["v70.0", 0.11],
  //         ["v69.0", 0.13],
  //         ["v56.0", 0.12],
  //         ["v49.0", 0.17],
  //       ],
  //     },
  //     {
  //       name: "Safari",
  //       id: "Safari",
  //       data: [
  //         ["v15.3", 0.1],
  //         ["v15.2", 2.01],
  //         ["v15.1", 2.29],
  //         ["v15.0", 0.49],
  //         ["v14.1", 2.48],
  //         ["v14.0", 0.64],
  //         ["v13.1", 1.17],
  //         ["v13.0", 0.13],
  //         ["v12.1", 0.16],
  //       ],
  //     },
  //     {
  //       name: "Edge",
  //       id: "Edge",
  //       data: [
  //         ["v97", 6.62],
  //         ["v96", 2.55],
  //         ["v95", 0.15],
  //       ],
  //     },
  //     {
  //       name: "Firefox",
  //       id: "Firefox",
  //       data: [
  //         ["v96.0", 4.17],
  //         ["v95.0", 3.33],
  //         ["v94.0", 0.11],
  //         ["v91.0", 0.23],
  //         ["v78.0", 0.16],
  //         ["v52.0", 0.15],
  //       ],
  //     },
  //   ],
  // },
};
const chartOder = {
  chart: {
    type: "pie",
    className: "hight_chart",
  },
  title: {
    text: "Đơn hàng",
    align: "left",
  },

  accessibility: {
    announceNewData: {
      enabled: true,
    },
    point: {
      valueSuffix: "%",
    },
  },

  plotOptions: {
    series: {
      borderRadius: 5,
      dataLabels: {
        enabled: true,
        format: "{point.name}: {point.y:.1f}%",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
  },

  series: [
    {
      name: "Đơn hàng",
      colorByPoint: true,
      data: [
        {
          name: "Đã bán",
          y: 60,
          drilldown: "Đã bán",
        },
        {
          name: "Đang giao",
          y: 30,
          drilldown: "Đang giao",
        },
        {
          name: "Đang chờ xử lí",
          y: 10,
          drilldown: "Đang chờ xử lí",
        },
      ],
    },
  ],
  // drilldown: {
  //   series: [
  //     {
  //       name: "Chrome",
  //       id: "Chrome",
  //       data: [
  //         ["v97.0", 36.89],
  //         ["v96.0", 18.16],
  //         ["v95.0", 0.54],
  //         ["v94.0", 0.7],
  //         ["v93.0", 0.8],
  //         ["v92.0", 0.41],
  //         ["v91.0", 0.31],
  //         ["v90.0", 0.13],
  //         ["v89.0", 0.14],
  //         ["v88.0", 0.1],
  //         ["v87.0", 0.35],
  //         ["v86.0", 0.17],
  //         ["v85.0", 0.18],
  //         ["v84.0", 0.17],
  //         ["v83.0", 0.21],
  //         ["v81.0", 0.1],
  //         ["v80.0", 0.16],
  //         ["v79.0", 0.43],
  //         ["v78.0", 0.11],
  //         ["v76.0", 0.16],
  //         ["v75.0", 0.15],
  //         ["v72.0", 0.14],
  //         ["v70.0", 0.11],
  //         ["v69.0", 0.13],
  //         ["v56.0", 0.12],
  //         ["v49.0", 0.17],
  //       ],
  //     },
  //     {
  //       name: "Safari",
  //       id: "Safari",
  //       data: [
  //         ["v15.3", 0.1],
  //         ["v15.2", 2.01],
  //         ["v15.1", 2.29],
  //         ["v15.0", 0.49],
  //         ["v14.1", 2.48],
  //         ["v14.0", 0.64],
  //         ["v13.1", 1.17],
  //         ["v13.0", 0.13],
  //         ["v12.1", 0.16],
  //       ],
  //     },
  //     {
  //       name: "Edge",
  //       id: "Edge",
  //       data: [
  //         ["v97", 6.62],
  //         ["v96", 2.55],
  //         ["v95", 0.15],
  //       ],
  //     },
  //     {
  //       name: "Firefox",
  //       id: "Firefox",
  //       data: [
  //         ["v96.0", 4.17],
  //         ["v95.0", 3.33],
  //         ["v94.0", 0.11],
  //         ["v91.0", 0.23],
  //         ["v78.0", 0.16],
  //         ["v52.0", 0.15],
  //       ],
  //     },
  //   ],
  // },
};
export { chartProduct, chartOder };
