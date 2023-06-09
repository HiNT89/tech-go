import clsx from "clsx";
import styles from "./ButtonCustom.module.scss";
type ButtonCustomProps = {
  title: string;
};
function ButtonCustom({ title }: ButtonCustomProps) {
  return (
    <button className={clsx(styles.wrapper,"capitalize mt-4 bg-white rounded")}>
      <span></span>
      <div>
        xem tất cả <span className="uppercase">{title}</span>
      </div>
    </button>
  );
}

export default ButtonCustom;
