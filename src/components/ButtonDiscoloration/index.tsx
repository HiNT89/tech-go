import { memo } from "react";
import styles from "./ButtonDiscoloration.module.scss";
const ButtonDiscoloration = ({
  context,
  handleOnClick,
}: {
  context: string;
  handleOnClick: any;
}) => {
  return (
    <button className={styles.wrapper} onClick={handleOnClick}>
      <div></div>
      <span>{context}</span>
    </button>
  );
};
export default memo(ButtonDiscoloration);
