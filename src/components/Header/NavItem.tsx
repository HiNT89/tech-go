import { FaAngleRight } from "react-icons/fa";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
type NavItemProps = {
    link: string;
  content: string;
  isShowHover: boolean;
  handleOnMouse: any;
};
const NavItem = ({
  link,
  content,
  isShowHover,
  handleOnMouse,
}: NavItemProps) => {
  return (
    <Link
      to={link}
      className={clsx(
        "flex gap-2 items-center text-sm py-2 px-4 cursor-pointer",
        styles.nav_item
      )}
      onMouseOver={() =>
        handleOnMouse({ itemIndex: content, isShowHover: isShowHover })
      }
    >
      <span className="capitalize">{content}</span>
      <span className={clsx(styles.nav_item_left)}></span>
      {isShowHover ? <FaAngleRight /> : ""}
    </Link>
  );
};

export default NavItem;
