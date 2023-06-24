import { listNav } from "./dataUI";
import { useState } from "react";
import styles from "./Header.module.scss";
import clsx from "clsx";
function NavMobile({ classProp }: { classProp: string }) {
  return (
    <div
      style={{
        zIndex: "150",
        maxHeight: "60vh",
        left: "-16px",
        width: "375px",
      }}
      className={clsx(
        classProp,
        "absolute hidden bg-white translate-y-full text-black -bottom-2 overflow-auto  flex-col gap-2"
      )}
    >
      {listNav.map((it, index) => (
        <a
          className={clsx(
            "flex gap-2 items-center font-semibold text-base py-2 px-4 cursor-pointer ",
            styles.nav_item
          )}
        >
          <span className="capitalize">{it.content}</span>
        </a>
      ))}
    </div>
  );
}

export default NavMobile;
