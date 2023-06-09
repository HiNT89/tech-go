import { Button, createStyles } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import bgTop from "~/assets/imgs/topbar_img.jpg";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaChevronDown,
  FaAlignJustify,
  FaPlus,
  FaRegWindowMinimize,
  FaBackspace,
  FaMinus,
} from "react-icons/fa";
import { VND, convertText } from "~/function";
import NavBoxText from "./NavBoxText";
import { listBoxText, listNav } from "./dataMap";
import NavItem from "./NavItem";
import ResultSearchItem from "./ResultSearch";
import { data } from "~/db";
import HeadlessTippy from "@tippyjs/react/headless";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Loading";
import pr1 from "~/assets/imgs/pr1.jpg";
import pr2 from "~/assets/imgs/pr2.jpg";
type HeaderProps = {
  isShowNav: boolean;
  toggleNav?: any;
};
function Header({ isShowNav, toggleNav }: HeaderProps) {
  //state
  const [isBanner, setIsBanner] = useState(true);
  const [isShowMiddleRight, setIsShowMiddleRight] = useState({
    login: false,
    shopCart: false,
  });
  const [NavItems, setNavItems] = useState(listNav.slice(0, 10));
  const [navItemIndex, setNavItemIndex] = useState({
    content: "",
    isShowHover: false,
  });
  const [isShowAllNav, setIsShowAllNav] = useState(false);
  const [isShowResultSearch, setIsShowResultSearch] = useState({
    show: false,
    result: "default",
    listData: [
      {
        id: 3,
        productName: "iPhone 11 64GB",
        nsx: "apple",
        price: "1200000",
        sale: "1199999",
        productIMG: [
          {
            id: 1,
            name: "blue",
            imgURL: "",
          },
        ],
        color: ["black", "blue"],
        status: true,
        percentSale: "12",
        description:
          "Apple iPhone 11 sở hữu cụm camera kép mặt sau, bao gồm camera góc rộng và camera góc siêu rộng. Cảm biến camera góc rộng 12MP có khả năng lấy nét tự động nhanh gấp 3 lần trong điều kiện thiếu sáng. Bên cạnh đó cảm biến góc siêu rộng cho khả năng chụp cảnh rộng gấp 4 lần, là phương tiện ghi hình tuyệt vời cho những chuyến du lịch, chụp hình nhóm. Nhanh chóng chụp ảnh, quay video, chỉnh sửa và chia sẻ ngay trên&nbsp;",
        specifications: {
          screen: '6.1", Liquid Retina HD, IPS LCD, 828 x 1792 Pixel',
          cameraAfter: "12.0 MP + 12.0 MP",
          cameraBefore: "12.0 MP",
          ram: "4 GB",
          cpu: "A13 Bionic",
          gpu: "Apple GPU 4 nhân",
          sim: "2, 1 eSIM, 1 Nano SIM",
          power: "3110 mAh",
          os: "iOS 14",
          memory: "64 GB",
        },
      },
    ],
  });
  const [subNav, setSubNav] = useState([
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
  ]);
  const [keySearch, setKeySearch] = useState("");
  // effect
  useEffect(() => {
    setNavItems(listNav.slice(0, 10));
    if (isShowAllNav) {
      setNavItems(listNav);
    }
  }, [isShowAllNav]);
  useEffect(() => {
    if (navItemIndex.isShowHover) {
      const subNavFind = listNav.filter(
        (it) => it.content === navItemIndex.content
      )[0].subNav;
      setSubNav(
        subNavFind || [
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
        ]
      );
    }
  }, [navItemIndex]);
  //function
  const a = async () => {
    await setIsShowResultSearch({
      ...isShowResultSearch,
      show: true,
      result: "loading",
    });
    let isResult = "result";
    const find = data.filter((it) =>
      it.productName.toLowerCase().includes(keySearch.toLowerCase())
    );
    if (!find.length) isResult = "empty";
    setTimeout(() => {
      setIsShowResultSearch({
        ...isShowResultSearch,
        listData: find.slice(0, 5),
        result: isResult,
      });
    }, 3000);
  };
  useEffect(() => {
    if (keySearch) {
      a();
    }
  }, [keySearch]);
  const handleOnMouse = ({
    itemIndex,
    isShowHover,
  }: {
    itemIndex: string;
    isShowHover: boolean;
  }): void => {
    setNavItemIndex({
      content: itemIndex,
      isShowHover: isShowHover,
    });
  };
  return (
    <header className={clsx(styles.wrapper)}>
      {isBanner ? (
        <div className={clsx(styles.banner_top)}>
          <img src={bgTop} alt="banner top" className={clsx(styles.img)} />

          <Button
            className={clsx(styles.btn)}
            onClick={() => setIsBanner(false)}
          >
            <ClearIcon />
          </Button>
        </div>
      ) : (
        ""
      )}

      <div
        className={clsx(
          styles.site,
          "container px-4 h-8 flex justify-between items-center text-sm font-light"
        )}
      >
        <div className={clsx(styles.site_left)}>
          <span className={clsx("capitalize pr-4")}>
            hotline: <b>0987.654.321</b> (8h - 12h, 13h30 - 17h)
          </span>
          <button
            className={clsx(
              "capitalize border-l-2 pl-4 border-gray-900 hover:text-sky-600"
            )}
            onClick={() => {}}
          >
            liên hệ hợp tác
          </button>
        </div>
        <div className={clsx(styles.site_right)}>
          <button className={clsx("capitalize px-4 hover:text-sky-600")}>
            hệ thống cửa hàng
          </button>
          <button
            className={clsx(
              "capitalize px-4 border-x-2 border-gray-900 hover:text-sky-600"
            )}
          >
            kiểm tra đơn hàng
          </button>
          <button className={clsx("capitalize px-4 hover:text-sky-600")}>
            liên hệ
          </button>
        </div>
      </div>
      <div className={clsx(styles.middle, "container px-4 py-4 flex")}>
        <Link
          to="/"
          className={clsx(
            "uppercase text-2xl text-white font-semibold",
            styles.middle_logo
          )}
        >
          <h1>techgo</h1>
        </Link>
        <HeadlessTippy
          interactive
          visible={isShowResultSearch.show}
          render={(attrs) => {
            switch (isShowResultSearch.result) {
              case "loading":
                {
                  return (
                    <div
                      className={clsx(
                        styles.result_search,
                        "p-4 flex items-center content-center",
                        { ...attrs }
                      )}
                    >
                      <Loading />
                    </div>
                  );
                }
                break;
              case "default":
                {
                  return (
                    <div
                      className={clsx(
                        styles.result_search,
                        "p-4 flex items-center content-center",
                        { ...attrs }
                      )}
                    >
                      <div>
                        <span className="capitalize text-sm font-light mb-2 inline-block">
                          gợi ý cho bạn :
                        </span>
                        <ul>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            điện thoại
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            PC - máy tính đồng bộ
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            laptop & macbook
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            đồng hồ thông minh
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            linh kiện máy tính
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                }
                break;
              case "empty":
                {
                  return (
                    <div
                      className={clsx(
                        styles.result_search,
                        "p-4 flex items-center content-center"
                      )}
                    >
                      <div className="w-full text-center capitalize">
                        không có sản phẩm nào
                      </div>
                    </div>
                  );
                }
                break;
              case "result":
                {
                  return (
                    <div
                      className={clsx(
                        styles.result_search,
                        "p-4 flex items-center content-center"
                      )}
                    >
                      <div className="flex-col w-full">
                        {isShowResultSearch.listData.map(
                          (it) =>
                            <ResultSearchItem key={it.id} data={it} /> || (
                              <Skeleton count={5} />
                            )
                        )}
                      </div>
                    </div>
                  );
                }
                break;

              default: {
              }
            }
          }}
          onClickOutside={() => {
            setIsShowResultSearch({
              ...isShowResultSearch,
              show: false,
              result: "default",
            });
            setKeySearch("");
          }}
        >
          <div
            className={clsx(styles.search, "bg-white rounded-lg relative h-9")}
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm ..."
              className={clsx(
                "w-full absolute top-0 right-0 left-0 bottom-0 rounded-lg px-4",
                styles.input
              )}
              onClick={() =>
                setIsShowResultSearch({ ...isShowResultSearch, show: true })
              }
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
            />
            <button
              className={clsx(
                "absolute right-1 flex items-center justify-center rounded-lg",
                styles.btn_search
              )}
            >
              <SearchIcon />
            </button>
          </div>
        </HeadlessTippy>
        <div className={clsx(styles.middle_right, "flex items-center w-1/3")}>
          <button
            className={clsx(
              styles.middle_right_btn,
              "text-white capitalize flex items-center gap-2 border-solid border-l-2 px-4"
            )}
          >
            <FaMapMarkerAlt />
            <div>
              <span className="block flex items-center gap-1 text-xs">
                giao hoặc đến lấy tại <FaChevronDown />
              </span>
              <span className="block text-xs">
                {convertText("182 Lê Đại Hành, , Quận 11", 22)}
              </span>
            </div>
          </button>
          <button
            className={clsx(
              styles.middle_right_btn,
              "text-white capitalize flex items-center gap-2 border-solid border-l-2 px-4 relative"
            )}
            onClick={() =>
              setIsShowMiddleRight({
                ...isShowMiddleRight,
                login: !isShowMiddleRight.login,
              })
            }
          >
            <FaUserAlt />
            <div>
              <span className="block text-xs">đăng nhập / đăng ký</span>
              <span className="block flex items-center gap-1 text-xs">
                tài khoản của tôi <FaChevronDown />
              </span>
            </div>
            <div
              className={clsx(
                styles.middle_right_login,
                isShowMiddleRight.login ? "block" : "hidden",
                "p-4 z-10"
              )}
            >
              <span className={clsx(styles.middle_right_login_triangle)}></span>
              <h3 className={clsx("uppercase")}>đăng nhập tài khoản</h3>
              <button>
                <div></div>
                <span>đăng nhập bằng facebook</span>
              </button>
              <button>
                <div></div>
                <span>đăng nhập bằng google</span>
              </button>
            </div>
          </button>
          <button
            className={clsx(styles.middle_right_btn, "relative")}
            onClick={() =>
              setIsShowMiddleRight({
                ...isShowMiddleRight,
                shopCart: !isShowMiddleRight.shopCart,
              })
            }
          >
            <div className="text-white capitalize flex items-center gap-2 border-solid border-l-2 px-4">
              <div className="relative">
                <ShoppingCartIcon />
                <span className="absolute bg-red-600 w-4 h-4 text-xs rounded-full left-4">
                  0
                </span>
              </div>
              <span>giỏ hàng</span>
            </div>

            <div
              className={clsx(
                styles.middle_right_login,
                isShowMiddleRight.shopCart ? "block" : "hidden",
                "p-4 z-10"
              )}
            >
              <span className={clsx(styles.middle_right_login_triangle)}></span>
              <h3 className={clsx("uppercase")}>giỏ hàng</h3>
              <div className="">
                {true ? (
                  <a>
                    {data.slice(0, 2).map((it) => (
                      <div key={it.id} className="flex relative py-4 border-b">
                        <div className="w-1/4">
                          <img src={it.productIMG[0].imgURL} />
                        </div>
                        <div className="w-3/4 pl-3 flex flex-col gap-1 items-start relative">
                          <b className="text-xs uppercase">{it.productName}</b>
                          <span className="text-xs capitalize">
                            {it.color[0]}
                          </span>
                          <div className="flex w-full">
                            <div className="flex w-1/2">
                              <button className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400">
                                <FaMinus />
                              </button>
                              <div className="w-8 h-full bg-white text-xl font-bold border">
                                1
                              </div>
                              <button className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400">
                                <FaPlus />
                              </button>
                            </div>
                            <b className="w-1/2 text-right">
                              {VND.format(+it.price * 1)}
                            </b>
                          </div>
                          <button className="absolute top-0 text-2xl hover:text-amber-400 right-2">
                            <FaBackspace />
                          </button>
                        </div>
                      </div>
                    ))}
                  </a>
                ) : (
                  <div className="flex flex-col gap-4 py-4">
                    <div className="text-amber-400">
                      <ShoppingCartIcon />
                    </div>
                    <p className="capitalize text-sm font-medium">
                      Hiện chưa có sản phẩm
                    </p>
                  </div>
                )}
              </div>
              <button>
                <div></div>
                <span>xem giỏ hàng</span>
              </button>
            </div>
          </button>
        </div>
      </div>

      <div className={clsx(styles.nav, "h-10 bg-white px-4 flex items-center")}>
        <div
          className={clsx(
            styles.nav_wrapper,
            "flex items-center gap-2 shadow h-full px-4 relative"
          )}
          onClick={toggleNav}
        >
          <FaAlignJustify />{" "}
          <span className={clsx("uppercase")}>danh mục sản phẩm</span>
          {isShowNav ? (
            <div
              className={clsx(
                styles.nav_list,
                "w-full bg-white absolute top-10 left-0 shadow"
              )}
            >
              {NavItems.map((it, index) => (
                <NavItem
                  content={it.content}
                  isShowHover={it.isShowHover}
                  handleOnMouse={handleOnMouse}
                />
              ))}
              {isShowAllNav ? (
                <button
                  className="capitalize to-black flex items-center gap-2 p-2"
                  onClick={(e) => {
                    setIsShowAllNav(false);
                    e.stopPropagation();
                  }}
                >
                  <FaRegWindowMinimize /> ẩn bớt
                </button>
              ) : (
                <button
                  className="capitalize to-black flex items-center gap-2 p-2"
                  onClick={(e) => {
                    setIsShowAllNav(true);
                    e.stopPropagation();
                  }}
                >
                  <FaPlus /> xem thêm
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {listBoxText.map((it, index) => (
          <NavBoxText content={it.content} icon={it.icon} />
        ))}
        {navItemIndex.isShowHover && isShowNav ? (
          <div
            className={clsx(
              styles.sub_nav,
              "flex content-between px-2 z-10 relative"
            )}
            onMouseLeave={() =>
              setNavItemIndex({
                content: "",
                isShowHover: false,
              })
            }
          >
            {subNav.map((it) => (
              <div className="w-1/4 capitalize">
                <h3 className="font-semibold mb-1">{it.title}</h3>
                <ul>
                  {it.arrNav.map((item) => (
                    <a className="hover:text-sky-500 cursor-pointer">
                      <li className="">{item.name}</li>
                    </a>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default Header;
