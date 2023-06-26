import {
  FaPlaneDeparture,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGooglePlusG,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import styles from "./Footer.module.scss";
import clsx from "clsx";
function Footer() {
  const listSocial = [
    {
      id: 1,
      icon: <FaFacebookF />,
      path: "",
    },
    {
      id: 2,
      icon: <FaTwitter />,
      path: "",
    },
    {
      id: 3,
      icon: <FaInstagram />,
      path: "",
    },
    {
      id: 4,
      icon: <FaGooglePlusG />,
      path: "",
    },
    {
      id: 5,
      icon: <FaYoutube />,
      path: "",
    },
  ];
  const listBlockUl = [
    {
      id: 1,
      title: "Hỗ trợ khách hàng",
      list: [
        {
          id: 1,
          title: "Tìm kiếm",
          path: "",
        },
        {
          id: 2,
          title: "Giới thiệu",
          path: "",
        },
        {
          id: 3,
          title: "Chính sách đổi trả",
          path: "",
        },
        {
          id: 4,
          title: "Chính sách bảo mật",
          path: "",
        },
        {
          id: 5,
          title: "Điều khoản dịch vụ",
          path: "",
        },
        {
          id: 6,
          title: "Liên hệ",
          path: "",
        },
      ],
    },
    {
      id: 2,
      title: "Liên kết",
      list: [
        {
          id: 1,
          title: " Sản phẩm khuyến mãi",
          path: "",
        },
        {
          id: 2,
          title: "Sản phẩm nổi bật",
          path: "",
        },
        {
          id: 3,
          title: "Tất cả sản phẩm",
          path: "",
        },
      ],
    },
    {
      id: 3,
      title: "Chính sách",
      list: [
        {
          id: 1,
          title: "Chính sách đổi trả",
          path: "",
        },
        {
          id: 2,
          title: "Chính sách bán hàng",
          path: "",
        },
        {
          id: 3,
          title: "Chính sách giao hàng",
          path: "",
        },
      ],
    },
  ];
  return (
    <footer>
      {/* --------- */}
      <div className={clsx(styles.email, "w-full px-4 mt-16 bg-blue-600")}>
        <div className="w-full flex py-4 text-white ">
          <div className="w-1/2 pr-2">
            <div className="flex gap-4 capitalize items-center justify-end text-2xl font-bold">
              <FaPlaneDeparture />
              <h2>đăng kí nhận bản tin</h2>
            </div>
            <p className="text-right text-sm font-normal">
              Đế nhận các thông tin mới từ Techgo cũng như các chương trình
              khuyến mãi .
            </p>
          </div>
          <div className="w-1/2 pl-2 pr-4 flex items-center">
            <div className="w-full bg-white h-3/4 rounded-lg flex items-center gap-4 pl-4 pr-2">
              <div className="text-gray-500 w-4 ">
                <FaEnvelope />
              </div>
              <input
                type="text"
                placeholder="Vui lòng nhập email của bạn ..."
                className="outline-none text-black flex-grow"
              />
              <button className="text-white font-semibold px-2 py-1 capitalize bg-amber-400 hover:bg-blue-600 rounded">
                đăng kí
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------- */}
      <div className="w-full bg-white flex flex-col px-4 pt-10">
        <div className={clsx(styles.info_top, "flex border-b-2 py-4")}>
          <div className="w-1/2 flex gap-3 pr-2">
            <div className="w-1/2">
              <h3 className="capitalize text-lg font-bold mb-7">về techgo</h3>
              <p className="text-sm font-normal">
                Với các giải pháp công nghệ tốt nhất, Haravan là tất cả những gì
                bạn cần để xây dựng thương hiệu online, thành công trong bán lẻ
                và marketing đột phá.
              </p>
              <div className="flex gap-3 mt-3">
                {listSocial.map((it) => (
                  <a
                    style={{ border: `1px solid #ccc` }}
                    className="p-2 hover:border-blue-500 hover:border-2 hover:text-blue-500 rounded cursor-pointer"
                  >
                    {it.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="capitalize text-lg font-bold mb-7">
                Thông tin liên hệ
              </h3>
              <div className="flex gap-2 text-3xl">
                <FaMapMarkerAlt />
                <p className="text-sm font-normal">
                  Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường
                  15, quận 11, Tp. Hồ Chí Minh.
                </p>
              </div>

              <div className="flex gap-3 mt-3 items-center">
                <FaPhone />
                <span>0945711801</span>
              </div>
              <div className="flex gap-3 mt-3 items-center">
                <FaEnvelope />
                <span>2001hieunt89@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex gap-3 pl-8">
            {listBlockUl.map((it) => (
              <div className="w-1/3">
                <h3 className="capitalize text-lg font-bold mb-7">
                  {it.title}
                </h3>
                <ul className="list-disc">
                  {it.list.map((item) => (
                    <li className="mb-2">
                      <a className="w-full cursor-pointer hover:text-blue-500 text-sm font-normal">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full p-3 justify-center items-center">
          <p className="text-xs font-medium ">
            Copyright © 2023 TechGO. Powered by Haravan
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
