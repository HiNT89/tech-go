import { FaAward, FaCheckCircle, FaShippingFast } from "react-icons/fa";
const listBoxText = [
  {
    icon: <FaAward />,
    content: "Đảm bảo chất lượng",
  },
  {
    icon: <FaCheckCircle />,
    content: "Miễn phí vận chuyển",
  },
  {
    icon: <FaShippingFast />,
    content: "Mở hộp kiểm tra nhận hàng",
  },
];
const listNav = [
  {
    content: "techgo",
    isShowHover: true,
    subNav: [
      {
        id: 1,
        title: "sản phẩm mới",
        arrNav: [
          {
            id: 1,
            name: "Sản phẩm bán chạy",
            path: "",
          },
          {
            id: 2,
            name: "Sản phẩm khuyến mãi",
            path: "",
          },
          {
            id: 3,
            name: "Sản phẩm nổi bật",
            path: "",
          },
          {
            id: 4,
            name: "Landing Page",
            path: "",
          },
        ],
      },
      {
        id: 2,
        title: "Product Views",
        arrNav: [
          {
            id: 1,
            name: "Kiểu hiển thị 1",
            path: "",
          },
          {
            id: 2,
            name: "Kiểu hiển thị 2",
            path: "",
          },
          {
            id: 3,
            name: "Kiểu hiển thị 3",
            path: "",
          },
          {
            id: 4,
            name: "Kiểu hiển thị 4",
            path: "",
          },
        ],
      },
      {
        id: 3,
        title: "Trang nội dung",
        arrNav: [
          {
            id: 1,
            name: "Giới thiệu 01",
            path: "",
          },
          {
            id: 2,
            name: "Giới thiệu 02",
            path: "",
          },
          {
            id: 3,
            name: "Giới thiệu 03",
            path: "",
          },
          {
            id: 4,
            name: "Về chúng tôi",
            path: "",
          },
          {
            id: 5,
            name: "Tin tức",
            path: "",
          },
          {
            id: 6,
            name: "Hệ thống cửa hàng",
            path: "",
          },
          {
            id: 7,
            name: "Liên hệ",
            path: "",
          },
          {
            id: 8,
            name: "Landing Page",
            path: "",
          },
        ],
      },
      {
        id: 4,
        title: "Chính sách",
        arrNav: [
          {
            id: 1,
            name: "Chính sách đổi trả",
            path: "",
          },
          {
            id: 2,
            name: "Chính sách bảo mật",
            path: "",
          },
          {
            id: 3,
            name: "Điều khoản dịch vụ",
            path: "",
          },
        ],
      },
    ],
  },
  {
    content: "điện máy - điện gia dụng",
    isShowHover: true,
    subNav: [
      {
        id: 1,
        title: "Điều hòa - Máy lạnh",
        arrNav: [
          {
            id: 1,
            name: "Samsung",
            path: "",
          },
          {
            id: 2,
            name: "LG",
            path: "",
          },
          {
            id: 3,
            name: "Daikin",
            path: "",
          },
          {
            id: 4,
            name: "Toshiba",
            path: "",
          },
          {
            id: 5,
            name: "Aqua",
            path: "",
          },
          {
            id: 6,
            name: "Asanzo",
            path: "",
          },
        ],
      },
      {
        id: 2,
        title: "Máy giặt",
        arrNav: [
          {
            id: 1,
            name: "LG",
            path: "",
          },
          {
            id: 2,
            name: "Samsung",
            path: "",
          },

          {
            id: 3,
            name: "Panasonic",
            path: "",
          },
          {
            id: 4,
            name: "Aqua",
            path: "",
          },
          {
            id: 5,
            name: "Toshiba",
            path: "",
          },
        ],
      },
      {
        id: 3,
        title: "tủ lạnh",
        arrNav: [
          {
            id: 1,
            name: "Samsung",
            path: "",
          },

          {
            id: 2,
            name: "Panasonic",
            path: "",
          },
          {
            id: 3,
            name: "Aqua",
            path: "",
          },
          {
            id: 4,
            name: "Toshiba",
            path: "",
          },
        ],
      },
    ],
  },
  {
    content: "tivi - màn hình TV",
    isShowHover: false,
  },
  {
    content: "điện thoại",
    isShowHover: false,
  },
  {
    content: "PC - máy tình bộ",
    isShowHover: false,
  },
  {
    content: "màn hình máy tình",
    isShowHover: false,
  },
  {
    content: "phụ kiện & thiết bị ngoại vi",
    isShowHover: false,
  },
  {
    content: "máy ảnh",
    isShowHover: false,
  },
  {
    content: "máy quay phim",
    isShowHover: false,
  },
  {
    content: "thiết bị văn phòng",
    isShowHover: false,
  },
  {
    content: "thiết bị thông minh",
    isShowHover: false,
  },
  {
    content: "laptop & macbook",
    isShowHover: true,
    subNav: [
      {
        id: 1,
        title: "Laptop theo thương hiệu",
        arrNav: [
          {
            id: 1,
            name: "Apple",
            path: "",
          },
          {
            id: 2,
            name: "Dell",
            path: "",
          },
          {
            id: 3,
            name: "Hp",
            path: "",
          },
          {
            id: 4,
            name: "Asus",
            path: "",
          },
          {
            id: 5,
            name: "MSI",
            path: "",
          },
          {
            id: 6,
            name: "Asus",
            path: "",
          },
        ],
      },
      {
        id: 2,
        title: "Laptop theo giá",
        arrNav: [
          {
            id: 1,
            name: "Dưới 10 triệu",
            path: "",
          },
          {
            id: 2,
            name: " 10 - 15 triệu",
            path: "",
          },
          {
            id: 3,
            name: " 15 - 20 triệu",
            path: "",
          },
          {
            id: 4,
            name: "20 - 25 triệu",
            path: "",
          },
          {
            id: 5,
            name: " 25 - 30 triệu",
            path: "",
          },
          {
            id: 6,
            name: "Trên 30 triệu",
            path: "",
          },
        ],
      },
      {
        id: 3,
        title: "Laptop theo kích thước",
        arrNav: [
          {
            id: 1,
            name: "Dưới 13 inch",
            path: "",
          },
          {
            id: 2,
            name: "13 - 15 inch",
            path: "",
          },
          {
            id: 3,
            name: "Trên 15 inch",
            path: "",
          },
        ],
      },
      {
        id: 4,
        title: "Linh kiện laptop",
        arrNav: [
          {
            id: 1,
            name: "Bàn phím laptop",
            path: "",
          },
          {
            id: 2,
            name: " Pin laptop",
            path: "",
          },
          {
            id: 3,
            name: "Sạc laptop",
            path: "",
          },
        ],
      },
    ],
  },
  {
    content: "giải pháp doanh nghiệp",
    isShowHover: false,
  },
  {
    content: "đồng hồ thông minh",
    isShowHover: false,
  },
  {
    content: "link kiện máy tính",
    isShowHover: false,
  },
  {
    content: "thiết bị mạng",
    isShowHover: false,
  },
];
export { listBoxText, listNav };
