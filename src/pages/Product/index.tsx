import clsx from "clsx";
import styles from "./Product.module.scss";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaSort, FaSortDown } from "react-icons/fa";
import banner from "~/assets/imgs/collection_banner.jpg";
import { listNSX, listPrice, listSort } from "./dataUI";
import { data } from "~/db";
import ItemProduct from "~/components/ItemProduct";
import ButtonCustom from "~/components/ButtonCustom";
function Product() {
  const arrFilter: string[] = [];
  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  const [listFilter, setListFilter] = useState(arrFilter);
  const [sort, setSort] = useState("az");
  const [listData, setListData] = useState(data.slice(0, 0));
  const handleCheck = (value: string) => {
    const confident = listFilter.includes(value);
    if (confident) {
      setListFilter(listFilter.filter((it) => it !== value));
    } else {
      setListFilter([...listFilter, value]);
    }
  };
  return (
    <>
      <Header isShowNav={showNav} toggleNav={toggleShowNav} />
      <main className="w-full px-4 bg-gray-200">
        {/* ---  */}
        <div className="w-full capitalize text-sm font-normal py-2 flex gap-2">
          <Link to="/">trang chủ</Link>
          <span> / </span>
          <span>tất cả sản phẩm</span>
        </div>
        {/* ---- */}
        <div className="flex p-6">
          <div className="w-1/5 h-full flex flex-col gap-3">
            <div className="flex flex-col rounded bg-white">
              <h2 className="w-full p-3 capitalize text-lg font-bold border-b-2">
                danh mục sản phẩm
              </h2>
              <div className="w-full px-3 py-2 capitalize text-sm font-medium flex flex-col gap-2">
                <Link to="/" className="hover:text-blue-500">
                  sản phẩm khuyến mãi
                </Link>
                <Link to="/" className="hover:text-blue-500">
                  sản phẩm nổi bật
                </Link>
                <Link to="/" className="hover:text-blue-500">
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
                <h2 className="text-2xl font-bold">Tất cả sản phẩm</h2>
                <span className="text-xs">
                  <b className="text-base">5</b> sản phẩm
                </span>
              </div>
              {listData.length ? (
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
              {listData.length ? (
                listData.map((it) => (
                  <div
                    style={{ width: "calc(20% - 12px)" }}
                    className=" bg-white"
                  >
                    <ItemProduct key={it.id} data={it} />
                  </div>
                ))
              ) : (
                <p className="capitalize text-sm font-normal pl-4">
                  Chưa có sản phẩm nào trong danh mục này !
                </p>
              )}
            </div>
            {listData.length ? (
              <div className="flex justify-center items-center">
                <ButtonCustom title={"sản phẩm"} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Product;
