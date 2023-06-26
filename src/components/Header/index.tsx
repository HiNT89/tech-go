import { Avatar, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import bgTop from "~/assets/imgs/topbar_img.jpg";
import bgTopMb from "~/assets/imgs/bgtop_mb.jpg";
import styles from "./Header.module.scss";
import "./style.css";
import clsx from "clsx";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaChevronDown,
  FaAlignJustify,
  FaPlus,
  FaBackspace,
  FaMinus,
  FaBars,
  FaStream,
} from "react-icons/fa";
import {
  VND,
  convertText,
  removeVietnameseTones,
  filterProductCart,
} from "~/function";
import NavBoxText from "./NavBoxText";
import { listBoxText, listNav } from "./dataUI";
import NavItem from "./NavItem";
import ResultSearchItem from "./ResultSearch";
import HeadlessTippy from "@tippyjs/react/headless";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { cartSE, listProductSE, userSE } from "~/rootSaga/selectors";
import ButtonDiscoloration from "../ButtonDiscoloration";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  actionCreateDataCart,
  actionDeleteDataCart,
  actionGetDataCart,
  actionGetDataOrder,
  actionUpdateDataCart,
  actionLogin,
  actionLogout,
  actionCreateUser,
} from "~/pages/saga/action";
import { signInFacebook, signInGoogle } from "./firebase";
import Authentication from "./Authentication";
import NavMobile from "./NavMobile";
type HeaderProps = {
  isShowNav: boolean;
  toggleNav?: any;
};
interface Action {
  type: string;
  payload: any;
}
function Header({ isShowNav, toggleNav }: HeaderProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSE);
  const cart = useSelector(cartSE);
  const listProduct = useSelector(listProductSE);
  //state
  const [isLoginByUsername, setIsLoginByUsername] = useState(false);
  const [isBanner, setIsBanner] = useState(true);
  const [listProductCart, setListProductCart] = useState(
    filterProductCart(cart, listProduct)
  );
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
        productName: "",
        nsx: "",
        price: 0,
        sale: 0,
        percentSale: 0,
        description: "",
        productID: "",
        type: "",
        count: [
          {
            id: "",
            color: "đen",
            count: 1,
            remaining: 1,
            imgURL:
              "https://firebasestorage.googleapis.com/v0/b/techgo-b1a51.appspot.com/o/product_12_1_f5ccbd4611264aa689ade7ac66582992_343191087259479a81b8e9e878d6abd1_master.png?alt=media&token=64a68e34-88c9-4f23-8a34-5636a61de2f1",
            codeColor: "#000",
          },
        ],
        id: "1",
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
    const newListProductCart = filterProductCart(cart, listProduct);
    setListProductCart(newListProductCart);
  }, [cart]);
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
  const a = async () => {
    await setIsShowResultSearch({
      ...isShowResultSearch,
      show: true,
      result: "loading",
    });
    let isResult = "result";
    const find = listProduct.filter((it) =>
      removeVietnameseTones(it.productName.toLowerCase()).includes(
        removeVietnameseTones(keySearch.toLowerCase())
      )
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
  useEffect(() => {
    dispatch<Action>(actionGetDataCart(user.account));
    dispatch<Action>(actionGetDataOrder(user.account));
  }, [user.account]);
  //function
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
  const loginGoogleCB = async () => {
    const result = await signInGoogle();
    dispatch<Action>(actionCreateUser(result));
  };
  const handleLoginGoogle = useCallback(loginGoogleCB, []);
  const handleOutGoogle = useCallback(() => {
    dispatch<Action>(actionLogout());
  }, []);
  const handleUpdateCartCount = (type: number, id: string) => {
    const cartItem = cart.filter((it) => it.id === id)[0];
    let newPayload = { account: user.account, data: cartItem };
    // type 0 : reduce | 1  : increase
    if (type) {
      newPayload = {
        ...newPayload,
        data: { ...newPayload.data, count: newPayload.data.count + 1 },
      };
    } else {
      newPayload = {
        ...newPayload,
        data: { ...newPayload.data, count: newPayload.data.count - 1 },
      };
    }
    dispatch<Action>(actionUpdateDataCart(newPayload));
  };
  const handleDeleteCart = (id: string) => {
    dispatch<Action>(
      actionDeleteDataCart({ account: user.account, arrID: [id] })
    );
  };
  const handleToCart = useCallback(() => {
    navigation("/cart");
  }, []);
  const handleToAdmin = useCallback(() => {
    navigation("/admin");
  }, []);

  const [navMb, setNavMb] = useState(-1);
  const [classProp, setClassProp] = useState("");
  useEffect(() => {
    if (navMb !== -1) setClassProp(navMb ? "navMbIn" : "navMbOut");
  }, [navMb]);
  return (
    <header className={clsx(styles.wrapper)}>
      {isLoginByUsername ? (
        <Authentication handleClose={() => setIsLoginByUsername(false)} />
      ) : (
        ""
      )}
      {isBanner ? (
        <picture className={clsx(styles.banner_top)}>
          <source media="(max-width: 378px)" srcSet={bgTopMb}></source>
          {/* <img src={bgTop} alt="banner top" className={clsx(styles.img)} /> */}
          {/* <source media="(min-width: 767px)" srcSet={bgTop}></source> */}
          <img className={clsx(styles.img)} src={bgTop} alt="banner-topbar" />
          <Button
            className={clsx(styles.btn)}
            onClick={() => setIsBanner(false)}
          >
            <ClearIcon />
          </Button>
        </picture>
      ) : (
        ""
      )}
      <div className={clsx(styles.toast, "capitalize")}>
        <ToastContainer />
      </div>
      <div
        className={clsx(
          styles.site,
          "container  px-4 h-8 flex justify-between items-center text-sm font-light"
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
          <Link
            to="/order"
            className={clsx(
              "capitalize px-4 border-x-2 border-gray-900 hover:text-sky-600"
            )}
          >
            kiểm tra đơn hàng
          </Link>
          <button className={clsx("capitalize px-4 hover:text-sky-600")}>
            liên hệ
          </button>
        </div>
      </div>
      <div
        className={clsx(styles.middle, "container px-4 py-4 flex items-center")}
      >
        <button
          className={clsx(
            styles.middle_mobile_bars,
            "text-white p-2 text-3xl relative"
          )}
          onClick={() => {
            if (navMb === -1 || navMb == 0) {
              setNavMb(1);
            } else {
              setNavMb(0);
            }
          }}
        >
          {navMb === 1 ? <FaStream /> : <FaBars />}

          <NavMobile classProp={classProp} />
        </button>
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
                            <Link to="/product/phone">điện thoại</Link>
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            <Link to="/product/pc">PC - máy tính đồng bộ</Link>
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            <Link to="/product/laptop">laptop & macbook</Link>
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            <Link to="/product/samrtWatch">
                              đồng hồ thông minh
                            </Link>
                          </li>
                          <li className="capitalize font-semibold py-1 cursor-pointer">
                            <Link to="/product/accessory">
                              linh kiện máy tính
                            </Link>
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
            <Link
              to={`/search/${removeVietnameseTones(
                keySearch.toLowerCase()
              ).replace(/ /g, "-")}`}
              className={clsx(
                "absolute right-1 flex items-center justify-center rounded-lg",
                styles.btn_search
              )}
              onClick={() => {
                setIsShowResultSearch({
                  ...isShowResultSearch,
                  show: false,
                  result: "default",
                });
                setKeySearch("");
              }}
            >
              <SearchIcon />
            </Link>
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
            {user.account ? (
              <div>
                <Avatar alt={user.name} src={user.avatar} />
              </div>
            ) : (
              <>
                <FaUserAlt />
                <div>
                  <span className="block text-xs">đăng nhập / đăng ký</span>
                  <span className="block flex items-center gap-1 text-xs">
                    tài khoản của tôi <FaChevronDown />
                  </span>
                </div>
              </>
            )}

            <div
              className={clsx(
                styles.middle_right_login,
                isShowMiddleRight.login ? "block" : "hidden",
                "p-4 z-10"
              )}
            >
              {user.account ? (
                <>
                  <ButtonDiscoloration
                    context={"trang quản trị"}
                    handleOnClick={handleToAdmin}
                  />
                  <ButtonDiscoloration
                    context={"đăng xuất"}
                    handleOnClick={handleOutGoogle}
                  />
                </>
              ) : (
                <>
                  <span
                    className={clsx(styles.middle_right_login_triangle)}
                  ></span>
                  <h3 className={clsx("uppercase")}>đăng nhập tài khoản</h3>
                  <ButtonDiscoloration
                    context={"đăng nhập bằng tài khoản"}
                    handleOnClick={() => setIsLoginByUsername(true)}
                  />
                  {/* <ButtonDiscoloration
                    context={"đăng nhập bằng facebook"}
                    handleOnClick={signInFacebook}
                  /> */}
                  <ButtonDiscoloration
                    context={"đăng nhập bằng google"}
                    handleOnClick={handleLoginGoogle}
                  />
                </>
              )}
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
                  {listProductCart.length}
                </span>
              </div>
              <span>giỏ hàng</span>
            </div>

            <div
              className={clsx(
                styles.middle_right_cart,
                isShowMiddleRight.shopCart ? "block" : "hidden",
                "p-4 z-10"
              )}
            >
              <span className={clsx(styles.middle_right_cart_triangle)}></span>
              <h3 className={clsx("uppercase")}>giỏ hàng</h3>
              <div className={clsx(styles.shopCartList)}>
                {cart.length ? (
                  <a>
                    {listProductCart.map((it) => (
                      <div key={it.id} className="flex relative py-4 border-b">
                        <div className="w-1/4">
                          <img src={it.imgURL} />
                        </div>
                        <div className="w-3/4 pl-3 flex flex-col gap-1 items-start relative">
                          <b className="text-xs uppercase">{it.productName}</b>
                          <span className="text-xs capitalize">{it.color}</span>
                          <div className="flex w-full">
                            <div className="flex w-1/2">
                              <button
                                className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400"
                                onClick={(e) => {
                                  handleUpdateCartCount(0, it.id);
                                  e.stopPropagation();
                                }}
                              >
                                <FaMinus />
                              </button>
                              <div className="w-8 h-full bg-white text-xl font-bold border">
                                {it.count}
                              </div>
                              <button
                                className="bg-gray-300  w-6 h-full flex justify-center items-center hover:bg-amber-400"
                                onClick={(e) => {
                                  handleUpdateCartCount(1, it.id);
                                  e.stopPropagation();
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <b className="w-1/2 text-right">
                              {VND.format(+it.price * 1)}
                            </b>
                          </div>
                          <button
                            className="absolute top-0 text-2xl hover:text-amber-400 right-2"
                            onClick={(e) => {
                              handleDeleteCart(it.id);
                              e.stopPropagation();
                            }}
                          >
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
              <ButtonDiscoloration
                context={"xem giỏ hàng"}
                handleOnClick={handleToCart}
              />
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
          <FaAlignJustify />
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
                  link={index ? `/product/${it.type}` : "/"}
                  content={it.content}
                  isShowHover={it.isShowHover}
                  handleOnMouse={handleOnMouse}
                />
              ))}
              {isShowAllNav ? (
                <button
                  className="capitalize to-black flex items-center gap-2 p-2 text-amber-500 ml-4"
                  onClick={(e) => {
                    setIsShowAllNav(false);
                    e.stopPropagation();
                  }}
                >
                  <FaMinus /> ẩn bớt
                </button>
              ) : (
                <button
                  className="capitalize to-black flex items-center gap-2 p-2 text-amber-500 ml-4"
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
