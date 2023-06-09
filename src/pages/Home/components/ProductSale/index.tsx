import clsx from "clsx";
import styles from "./ProductSale.module.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ItemProduct from "~/components/ItemProduct";
import Button from "@mui/material/Button";
import { data } from "~/db";
import { useEffect, useState } from "react";
type ProductProps = {
  title: string;
  childrenTop: React.ReactNode;
  buttonBottom: React.ReactNode;
  dataUI : {
    bgColorWrapper: string;
    bgColorItem : string,
    colorTitle : string,
  }
};
function ProductSale({
  title,
  childrenTop,
  buttonBottom,
  dataUI,
}: ProductProps) {
  const [slide, setSlide] = useState({
    index: 0,
    listData: data,
    slide: data.slice(0, 5),
  });
  useEffect(() => {
    let newSlide = slide.listData.slice(slide.index, slide.index + 5);
    if (newSlide.length < 5) {
      const remaining = 5 - newSlide.length;
      const arrRemaining = slide.listData.slice(0, remaining);
      newSlide = [...newSlide, ...arrRemaining];
    }
    setSlide({ ...slide, slide: newSlide });
  }, [slide.index]);
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
            <h2 style={{color : `${dataUI.colorTitle}`}} className="uppercase text-2xl">{title}</h2>
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
              disabled={slide.index === slide.slide.length - 1}
            >
              <FaAngleRight />
            </Button>
          </div>
        </div>
        <div
          className={clsx(styles.product_sale_slide, "flex gap-3 items-center")}
        >
          {slide.slide.map((it) => (
            <ItemProduct data={it} />
          ))}
        </div>
        {buttonBottom}
      </div>
    </div>
  );
}

export default ProductSale;
