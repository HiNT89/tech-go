import clsx from "clsx";
import styles from "./BannerScale.module.scss";
type BannerScaleProps = {
  imgURL: string;
};
function BannerScale({ imgURL }: BannerScaleProps) {
  return (
   
     <a className={clsx(styles.wrapper, "w-full")}>
     <img src={imgURL} className="w-full" />
   </a>
  );
}

export default BannerScale;
