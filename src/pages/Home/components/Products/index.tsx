import clsx from "clsx";
import styles from "./Products.module.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ItemProduct from "~/components/ItemProduct";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listProductSE } from "~/rootSaga/selectors";
type ProductProps = {
  title: string;
  childrenTop: React.ReactNode;
  buttonBottom: React.ReactNode;
  dataUI: {
    bgColorWrapper: string;
    bgColorItem: string;
    colorTitle: string;
  };
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
  }[];
};
function Products({
  title,
  childrenTop,
  buttonBottom,
  dataUI,
  data,
}: ProductProps) {
  const [limit, setLimit] = useState(5);
  const [slide, setSlide] = useState({
    index: 0,
    listData: data,
    slide: data.slice(0, limit),
  });
  useEffect(() => {
    let newSlide = slide.listData.slice(slide.index, slide.index + limit);
    if (newSlide.length < limit) {
      const remaining = limit - newSlide.length;
      const arrRemaining = slide.listData.slice(0, remaining);
      newSlide = [...newSlide, ...arrRemaining];
    }
    setSlide({ ...slide, slide: newSlide });
  }, [slide.index, limit]);
  const handleNextSlide = () => {
    if (slide.index === slide.listData.length) {
      setSlide({ ...slide, index: 0 });
    } else {
      setSlide({ ...slide, index: slide.index + 1 });
    }
  };
  const handlePrevSlide = () => {
    if (slide.index === 0) {
      setSlide({ ...slide, index: slide.listData.length - 1 });
    } else {
      setSlide({ ...slide, index: slide.index - 1 });
    }
  };
  useEffect(() => {
    if (window.outerWidth < 376) {
      setLimit(2);
    }
  }, []);
  console.log(slide.listData, slide.slide);
  return (
    <div className={clsx(styles.product_sale_wrapper, "w-full px-4 mt-14")}>
      <div
        style={{ background: `${dataUI.bgColorWrapper}` }}
        className={clsx(
          styles.product_sale,
          "p-5 flex flex-col items-center gap"
        )}
      >
        <div
          className={clsx(
            styles.product_sale_top,
            "flex justify-between text-white w-full mb-4"
          )}
        >
          <div className="w-3/4 flex gap-4 items-center">
            <h2
              style={{ color: `${dataUI.colorTitle}` }}
              className="uppercase text-2xl"
            >
              {title}
            </h2>
            {childrenTop}
          </div>
          <div className="flex gap-4 w-1/4 justify-end">
            <Button
              className={clsx(styles.btn_control)}
              disabled={!slide.index}
              onClick={handlePrevSlide}
            >
              <FaAngleLeft />
            </Button>
            <Button
              className={clsx(styles.btn_control)}
              onClick={handleNextSlide}
              disabled={slide.index === slide.listData.length - 1}
            >
              <FaAngleRight />
            </Button>
          </div>
        </div>
        <div className={clsx(styles.product_sale_slide, "flex items-center")}>
          {slide.slide.map((it) => (
            <div
              className={clsx(
                styles.product_wrapper,
                "p-2 min-h-max rounded-lg"
              )}
            >
              <ItemProduct data={it} />
            </div>
          ))}
        </div>
        {buttonBottom}
      </div>
    </div>
  );
}

export default Products;
