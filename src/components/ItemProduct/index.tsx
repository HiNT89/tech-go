import saleIMG from "~/assets/imgs/sale.png";
import { FaShoppingBasket, FaRegEye } from "react-icons/fa";
import clsx from "clsx";
import styles from "./ItemProduct.module.scss";
import { useState } from "react";
import { VND } from "~/function";
type ItemProps = {
  data: {
    id: number;
    productName: string;
    nsx: string;
    price: string;
    sale: string;
    productIMG: {
      id : number,
      name: string;
      imgURL: string;
    }[];
    color: string[];
    status: boolean;
    percentSale: string;
    description: string;
    specifications: {
      screen: string;
      cameraAfter: string;
      cameraBefore: string;
      ram: string;
      cpu: string;
      gpu: string;
      sim: string;
      power: string;
      os: string;
      memory: string;
    };
  };
};
const ItemProduct = ({ data }: ItemProps) => {
  const {id, productName, productIMG, price, sale, percentSale,nsx,color } = data;
  const [isMouseLeave, setIsMouseLeave] = useState(false);
  return (
    <a className="bg-white w-full h-full rounded-md cursor-pointer shadow-xl">
      <div
        className={clsx(styles.item_top,)}
        onMouseLeave={() => setIsMouseLeave(true)}
        onMouseOver={() => setIsMouseLeave(false)}
      >
        <div>
          <img
            src={productIMG[0].imgURL}
            className="w-full rounded-md object-contain"
          />
        </div>
        <img
          src={productIMG[1].imgURL}
          className={clsx(
            styles.thumb,
            isMouseLeave ? styles.thumbIn : "",
            "w-full rounded-md object-contain"
          )}
        />
        <img src={saleIMG} className="w-full" />
        <span>
          <FaRegEye />
        </span>
      </div>
      <div className="px-3 flex flex-col gap-1 capitalize">
        <span className="uppercase text-gray-500 text-xs">{nsx}</span>
        <span className={clsx(styles.product_name)}>{productName} {id}</span>
        <span className="text-gray-500">+ {color.length} màu sắc</span>
        <div className="flex justify-between items-center">
          <div style={{minHeight : '48px'}} className="flex flex-col">
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
    </a>
  );
};
export default ItemProduct;
