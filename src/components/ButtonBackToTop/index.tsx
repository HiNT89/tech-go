import clsx from "clsx";
import { FaArrowUp } from "react-icons/fa";
function ButtonBackToTop({ isShowBtnToTop }: { isShowBtnToTop: boolean }) {
  return (
    <button
      style={{ zIndex: "200" }}
      className={clsx(
        isShowBtnToTop ? "block" : "hidden",
        "fixed bottom-16 right-24 bg-blue-500 p-4 text-2xl rounded-full text-white hover:bg-amber-400 hover:shadow-lg"
      )}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // for smoothly scrolling
        });
      }}
    >
      <FaArrowUp />
    </button>
  );
}

export default ButtonBackToTop;
