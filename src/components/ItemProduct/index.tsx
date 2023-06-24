import saleIMG from "~/assets/imgs/sale.png";
import { FaShoppingBasket, FaRegEye } from "react-icons/fa";
import clsx from "clsx";
import styles from "./ItemProduct.module.scss";
import { useState } from "react";
import { VND, convertText } from "~/function";
import defaultIMG from "~/assets/imgs/hint.jpg";
import { Link } from "react-router-dom";
type ItemProps = {
  data: {
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
  };
};
const ItemProduct = ({ data }: ItemProps) => {
  const { id, productName, price, sale, percentSale, nsx, count } = data;
  const [isMouseLeave, setIsMouseLeave] = useState(false);
  return (
    <Link
      to={`/detail-product/${id}`}
      className="bg-white w-full h-full rounded-md cursor-pointer shadow-xl inline-block"
    >
      <div
        className={clsx(styles.item_top)}
        onMouseLeave={() => setIsMouseLeave(true)}
        onMouseOver={() => setIsMouseLeave(false)}
      >
        <div>
          <img
            src={count[0].imgURL || defaultIMG}
            className={clsx(
              styles.thumb,
              "w-full rounded-md object-contain img_product_item"
            )}
          />
        </div>
        <img
          src={count[1] ? count[1].imgURL : count[0].imgURL}
          className={clsx(
            styles.thumb,
            isMouseLeave ? styles.thumbIn : "",
            "w-full rounded-md  img_product_item"
          )}
        />
        <img src={saleIMG} style={{ width: "100%", height: "32px" }} />
        <span>
          <FaRegEye />
        </span>
      </div>
      <div className="px-3 flex flex-col gap-1 capitalize">
        <span className="uppercase text-gray-500 text-xs">{nsx}</span>
        <span className={clsx(styles.product_name)}>
          {convertText(productName,30)}
        </span>
        <span className="text-gray-500">+ {count.length} màu sắc</span>
        <div className="flex justify-between items-center">
          <div style={{ minHeight: "48px" }} className="flex flex-col">
            {sale ? (
              <>
                {" "}
                <span className="text-red-600 font-semibold">
                  {VND.format(+sale)}
                </span>
                <del className="text-gray-500">{VND.format(+price)}</del>{" "}
              </>
            ) : (
              <span className="text-red-600 font-semibold">
                {VND.format(+price)}
              </span>
            )}
          </div>
          {sale ? (
            <span className="w-10 h-6 flex items-center justify-center font-medium bg-red-600 text-white rounded text-xs">
              - {percentSale}%
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        className={clsx(styles.item_btn, "flex gap-2 px-4 py-2 items-center ")}
      >
        <span
          className={clsx(
            styles.item_btn_icon,
            "w-10 h-10 rounded-full bg-blue-700 flex justify-center items-center text-lg text-white"
          )}
        >
          <FaShoppingBasket />
          <span className="uppercase text-xs font-medium hidden">
            thêm vào giỏ hàng
          </span>
        </span>
        <span
          className={clsx(
            styles.item_btn_text,
            "uppercase text-xs font-medium"
          )}
        >
          thêm vào giỏ
        </span>
      </button>
    </Link>
  );
};
export default ItemProduct;
