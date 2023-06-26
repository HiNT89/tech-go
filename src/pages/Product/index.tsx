import clsx from "clsx";
import styles from "./Product.module.scss";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCheck,
  FaSort,
  FaSortDown,
  FaFilter,
  FaArrowLeft,
} from "react-icons/fa";
import banner from "~/assets/imgs/collection_banner.jpg";
import { listNSX, listPrice, listSort } from "./dataUI";
import ItemProduct from "~/components/ItemProduct";
import "./style.css";
import { useSelector } from "react-redux";
import { listProductSE } from "~/rootSaga/selectors";
import Pagination from "~/components/Pagination";
import { removeVietnameseTones } from "~/function";
import ButtonBackToTop from "~/components/ButtonBackToTop";

function Product() {
  const { productType, product, nsx } = useParams();
  const arrFilter: string[] = [];
  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  const [filterMobile, setFilterMobile] = useState({
    isShowFilterMobile: -1,
    isScreenMobile: false,
  });
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [limit, setLimit] = useState(10);
  const listProduct = useSelector(listProductSE);
  const [listFilter, setListFilter] = useState(arrFilter);
  const [data, setData] = useState(listProduct);
  const [sort, setSort] = useState("az");
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState({
    totalPage: Math.ceil(data.length / limit),
    arrItem: data.slice((page - 1) * limit, page * limit),
  });
  const handleCheck = (value: string) => {
    const confident = listFilter.includes(value);
    if (confident) {
      setListFilter(listFilter.filter((it) => it !== value));
    } else {
      setListFilter([...listFilter, value]);
    }
  };
  const handleParam = () => {
    let newData: {
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
      id: string;
    }[] = [];
    if (product && nsx) {
      const productFormat = product.replace(/-/g, "").toLowerCase();
      newData = listProduct.filter((it) => {
        const name = removeVietnameseTones(it.productName).toLowerCase();
        const confident =
          it.type === productType &&
          name.includes(productFormat) &&
          it.nsx.toLowerCase() === nsx;
        return confident;
      });
    } else {
      switch (productType) {
        case "all":
          {
            newData = listProduct;
          }
          break;
        case "/product-sale":
          {
            newData = listProduct.filter((it) => it.sale);
          }
          break;
        default:
          {
            newData = listProduct.filter(
              (it) => it.type.toLowerCase() === productType
            );
          }
          break;
      }
    }
    return newData;
  };
  useEffect(() => {
    setData(handleParam());
    setPage(1);
  }, [productType]);
  useEffect(() => {
    setListData({
      totalPage: Math.ceil(data.length / limit),
      arrItem: data.slice((page - 1) * 10, page * limit),
    });
  }, [page, data]);
  useEffect(() => {
    if (listFilter.length) {
      const listFilterByPrice = listFilter.filter((it) =>
        listPrice.map((item) => item.value).includes(it)
      );
      const listFilterByNSX = listFilter.filter((it) =>
        listNSX
          .map((item) => item.name.toLowerCase())
          .includes(it.toLowerCase())
      );

      const listDataFilterByNSX = listFilterByNSX.length
        ? handleParam().filter((it) =>
            listFilterByNSX.includes(it.nsx.toLowerCase())
          )
        : handleParam();
      const handleListFilterByPrice = (
        item: {
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
          id: string;
        },
        min: number,
        max: number
      ): boolean => {
        let result = false;
        const valuePrice = item.sale ? item.sale : item.price;
        if (max && min) {
          result = valuePrice >= min && valuePrice <= max ? true : false;
        } else if (!max && min) {
          result = valuePrice >= min ? true : false;
        } else if (!min && max) {
          result = valuePrice <= max ? true : false;
        }
        return result;
      };
      const newData = listFilterByPrice.length
        ? listDataFilterByNSX.filter((item) => {
            return listFilterByPrice
              .map((it) => {
                if (it === "<1000000") {
                  return handleListFilterByPrice(item, 0, 1000000);
                } else if (it === ">4000000") {
                  return handleListFilterByPrice(item, 4000000, 0);
                } else {
                  const itFormat = +it;
                  return handleListFilterByPrice(
                    item,
                    itFormat - 1000000,
                    itFormat
                  );
                }
              })
              .some((it) => it === true);
          })
        : listDataFilterByNSX;
      setData(newData);
    } else {
      setData(handleParam());
    }
  }, [listFilter]);
  // useEffect(() => {
  //   let newData: {
  //     productName: string;
  //     nsx: string;
  //     price: number;
  //     sale: number;
  //     percentSale: number;
  //     description: string;
  //     productID: string;
  //     type: string;
  //     count: {
  //       id: string;
  //       color: string;
  //       count: number;
  //       remaining: number;
  //       imgURL: string;
  //       codeColor: string;
  //     }[];
  //     id: string;
  //   }[] = data;
  //   switch (sort) {
  //     case "az":
  //       {
  //         newData = data.sort((a, b) => {
  //           return a.productName
  //             .toLowerCase()
  //             .localeCompare(b.productName.toLowerCase());
  //         });
  //       }
  //       break;
  //     case "za":
  //       {
  //         newData = data.sort((a, b) => {
  //           return b.productName
  //             .toLowerCase()
  //             .localeCompare(a.productName.toLowerCase());
  //         });
  //       }
  //       break;
  //     case "priceDown":
  //       {
  //         newData = data.sort((a, b) => {
  //           const priceA = a.sale ? a.sale : a.price;
  //           const priceB = b.sale ? b.sale : b.price;
  //           return priceB - priceA;
  //         });
  //       }
  //       break;
  //     case "priceUp":
  //       {
  //         newData = data.sort((a, b) => {
  //           const priceA = a.sale ? a.sale : a.price;
  //           const priceB = b.sale ? b.sale : b.price;
  //           return priceA - priceB;
  //         });
  //       }
  //       break;
  //     default:
  //       {
  //         newData = data.sort((a, b) => {
  //           const countA = a.count.reduce(
  //             (sum, it) => (sum += it.count - it.remaining),
  //             0
  //           );
  //           const countB = b.count.reduce(
  //             (sum, it) => (sum += it.count - it.remaining),
  //             0
  //           );
  //           return countB - countA;
  //         });
  //       }
  //       break;
  //   }
  //   setData([...newData]);
  // }, [sort]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (window.outerWidth < 767) {
      setFilterMobile({
        ...filterMobile,
        isScreenMobile: true,
      });
      setLimit(6);
    } else if (window.outerWidth < 1024) {
      setLimit(9);
    } else {
      setFilterMobile({
        isShowFilterMobile: -1,
        isScreenMobile: false,
      });
    }
  }, [window.outerWidth]);
  const [isShowBtnToTop, setIsShowBtnToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setIsShowBtnToTop(true);
      } else {
        setIsShowBtnToTop(false);
      }
    });
  }, []);
  const renderClassFilter = () => {
    if (filterMobile.isShowFilterMobile === -1) return "filter_default";
    if (filterMobile.isShowFilterMobile === 0) return "filter_hidden";
    if (filterMobile.isShowFilterMobile === 1) return "filter_visible";
  };
  useEffect(() => {
    if (filterMobile.isShowFilterMobile) {
      setIsDisableScroll(true);
    } else {
      setIsDisableScroll(false);
    }
  }, [filterMobile.isShowFilterMobile]);
  return (
    <div className={isDisableScroll ? "disableScroll" : ""}>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main
        className={clsx(styles.wrapper, "w-full px-4 bg-gray-200 relative")}
      >
        <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
        {/* ---  */}
        <div className="w-full capitalize text-sm font-normal py-2 flex gap-2">
          <Link to="/">trang chủ</Link>
          <span> / </span>
          <span>tất cả sản phẩm</span>
        </div>
        {/* ---- */}
        <div className={clsx(styles.wrapper_content, "flex p-6 relative")}>
          <div
            className={clsx(
              renderClassFilter(),
              "w-1/5 h-full flex flex-col gap-3"
            )}
          >
            <div className="flex flex-col rounded bg-white">
              <h2 className="w-full p-3 capitalize text-lg font-bold border-b-2">
                danh mục sản phẩm
              </h2>
              <div className="w-full px-3 py-2 capitalize text-sm font-medium flex flex-col gap-2">
                <Link
                  to="/product/product-sale"
                  className="hover:text-blue-500"
                >
                  sản phẩm khuyến mãi
                </Link>
                <Link to="/" className="hover:text-blue-500">
                  sản phẩm nổi bật
                </Link>
                <Link to="/product/all" className="hover:text-blue-500">
                  tất cả sản phẩm
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded bg-white">
              <h2 className="w-full p-3 capitalize text-lg font-bold border-b-2">
                nhà cung cấp
              </h2>
              <div className="w-full px-3 py-2 capitalize text-sm font-medium flex flex-col gap-2">
                {listNSX.map((it) => (
                  <label
                    key={it.id}
                    className={clsx(
                      styles.filter_item,
                      listFilter.includes(it.name) ? styles.active : "",
                      "hover:text-amber-400 cursor-pointer flex items-center gap-2"
                    )}
                  >
                    <div onClick={() => handleCheck(it.name)}>
                      {listFilter.includes(it.name) ? <FaCheck /> : ""}
                    </div>
                    <input type="checkbox" />
                    <span onClick={() => handleCheck(it.name)}>{it.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded bg-white">
              <h2 className="w-full p-3 capitalize text-lg font-bold border-b-2">
                lọc giá
              </h2>
              <div className="w-full px-3 py-2 capitalize text-sm font-medium flex flex-col gap-2">
                {listPrice.map((it) => (
                  <label
                    key={it.id}
                    className={clsx(
                      styles.filter_item,
                      listFilter.includes(it.value) ? styles.active : "",
                      "hover:text-amber-400 cursor-pointer flex items-center gap-2"
                    )}
                  >
                    <div onClick={() => handleCheck(it.value)}>
                      {listFilter.includes(it.value) ? <FaCheck /> : ""}
                    </div>
                    <input type="checkbox" />
                    <span onClick={() => handleCheck(it.value)}>{it.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="w-4/5 h-full  pl-4">
            <div>
              <img src={banner} className="rounded-lg" />
            </div>
            <div className="capitalize flex py-2 items-center justify-between">
              <div className="flex items-center gap-5">
                {filterMobile.isScreenMobile ? (
                  <button
                    onClick={() =>
                      setFilterMobile({
                        ...filterMobile,
                        isShowFilterMobile:
                          filterMobile.isShowFilterMobile === 1 ? 0 : 1,
                      })
                    }
                  >
                    {filterMobile.isShowFilterMobile === 1 ? (
                      <FaArrowLeft />
                    ) : (
                      <FaFilter />
                    )}
                  </button>
                ) : (
                  ""
                )}
                <h2 className="text-2xl font-bold">Tất cả sản phẩm</h2>
                <span className="text-xs">
                  <b className="text-base">{data.length}</b> sản phẩm
                </span>
              </div>
              {listData.arrItem.length ? (
                <div
                  className={clsx(
                    styles.box_sort,
                    "flex gap-2 items-center font-bold px-2 py-1 bg-white rounded relative border border-gray-500 "
                  )}
                >
                  <FaSort />
                  <span>sắp xếp</span>
                  <FaSortDown />
                  <div className="absolute right-0  w-40 pt-2 z-10">
                    <div className="bg-white flex-col gap-2  p-2 rounded">
                      {listSort.map((it) => (
                        <button
                          className="text-left capitalize font-medium flex gap-2 items-center hover:text-amber-400"
                          onClick={() => setSort(it.value)}
                        >
                          <span className="text-amber-400 inline-block w-4">
                            {sort.includes(it.value) ? <FaCheck /> : ""}
                          </span>

                          {it.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-3 flex-wrap mb-4">
              {listPrice.filter((it) => listFilter.includes(it.value))
                .length ? (
                <div className="flex gap-3 capitalize items-center px-2 py-1 bg-white rounded-lg">
                  <span>lọc giá :</span>
                  <div className="flex gap-2">
                    {listPrice
                      .filter((it) => listFilter.includes(it.value))
                      .map((it) => (
                        <b className="border border-amber-400 px-2 py-1 rounded">
                          {it.name}
                        </b>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {listNSX.filter((it) => listFilter.includes(it.name)).length ? (
                <div className="flex gap-3 capitalize items-center px-2 py-1 bg-white rounded-lg">
                  <span>nhà sản xuất :</span>
                  <div className="flex gap-2 ">
                    {listNSX
                      .filter((it) => listFilter.includes(it.name))
                      .map((it) => (
                        <b className="border border-amber-400 px-2 py-1 rounded">
                          {it.name}
                        </b>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {listFilter.length ? (
                <button
                  className="capitalize text-amber-400 px-2 py-1 bg-white rounded font-semibold"
                  onClick={() => setListFilter([])}
                >
                  xóa hết
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {listData.arrItem.length ? (
                listData.arrItem.map((it) => (
                  <div className={styles.wrapper_item}>
                    <ItemProduct key={it.id} data={it} />
                  </div>
                ))
              ) : (
                <p className="capitalize text-sm font-normal pl-4">
                  Chưa có sản phẩm nào trong danh mục này !
                </p>
              )}
            </div>
            <Pagination
              page={{
                pageIndex: page,
                sumPage: listData.totalPage,
                listData: listData.arrItem,
              }}
              handleChangePage={(page: number) => {
                setPage(page);
              }}
              handlePrevPage={() => {
                setPage(page - 1);
              }}
              handleNextPage={() => {
                setPage(page + 1);
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Product;
