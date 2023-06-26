import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./HeaderCategory.module.scss";
type HeaderCategoryProps = {
  title: string;
  listButton: {
    id: number;
    type: string;
    name: string;
  }[];
  type: string;
  handleOnClickCategory: any;
};
function HeaderCategory({
  title,
  listButton,
  type,
  handleOnClickCategory,
}: HeaderCategoryProps) {
  return (
    <div>
      <div className={clsx(styles.wrapper, "w-full flex flex-wrap mb-5")}>
        <div
          className={clsx(styles.title, "w-1/2 text-2xl capitalize font-bold")}
        >
          <h2>{title}</h2>
        </div>
        <div className={clsx(styles.list_type, "w-1/2 flex gap-4 justify-end")}>
          {listButton.map((it) => (
            <button
              className={clsx(
                it.type === type
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-black",
                "px-2 rounded py-2 font-medium capitalize"
              )}
              onClick={() => handleOnClickCategory(it.type)}
            >
              {it.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HeaderCategory;
