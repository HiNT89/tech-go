import { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
function ButtonContact() {
  const [chat, setChat] = useState({
    isShow: false,
  });
  return (
    <div className="w-16 h-16 rounded-full bg-blue-500  text-white text-3xl z-20 relative">
      {chat.isShow ? (
        <div className="absolute w-96 h-96 p-6 bg-white rounded-xl bottom-0 right-0 -translate-y-20"></div>
      ) : (
        ""
      )}

      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => setChat({ ...chat, isShow: !chat.isShow })}
      >
        <FaFacebookMessenger />
      </button>
    </div>
  );
}

export default ButtonContact;
