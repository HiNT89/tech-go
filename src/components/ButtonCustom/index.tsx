import clsx from "clsx";
import styles from "./ButtonCustom.module.scss";
type ButtonCustomProps = {
  title: string;
  onClick?: any;
};
function ButtonCustom({ title, onClick }: ButtonCustomProps) {
  return (
    <button
      className={clsx(styles.wrapper, "capitalize mt-4 bg-white rounded")}
      onClick={onClick}
    >
      <span></span>
      <div>
        xem tất cả <span className="uppercase">{title}</span>
      </div>
    </button>
  );
}

export default ButtonCustom;
