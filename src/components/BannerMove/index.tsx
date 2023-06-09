import clsx from "clsx";
import styles from "./BannerMove.module.scss";
type BannerMoveProps = {
  imgURL: string;
};
function BannerMove({ imgURL }: BannerMoveProps) {
  return (
    <div className={clsx(styles.wrapper, "cursor-pointer")}>
      <span></span>
      <img src={imgURL || ""} />
    </div>
  );
}

export default BannerMove;
