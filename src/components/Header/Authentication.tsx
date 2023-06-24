import { useState } from "react";
import ButtonDiscoloration from "~/components/ButtonDiscoloration";
import clsx from "clsx";
import { removeVietnameseTones } from "~/function";
import { useDispatch } from "react-redux";
import { actionCreateUser, actionLogin } from "~/pages/saga/action";
import { FaBackspace } from "react-icons/fa";
interface Action {
  type: string;
  payload: any;
}
function Authentication({ handleClose }: { handleClose: any }) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [inputLogin, setInputLogin] = useState({
    userName: "",
    password: "",
    passwordRepeat: "",
  });
  const [messError, setMessError] = useState({
    content: "",
    type: "",
  });
  const handleOnChangeInputLogin = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    const valueFormat = removeVietnameseTones(value);
    setInputLogin({ ...inputLogin, [name]: valueFormat });
  };
  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
    setInputLogin({
      userName: "",
      password: "",
      passwordRepeat: "",
    });
  };
  const handleLogin = () => {
    if (!inputLogin.userName) {
      setMessError({
        content: "vui lòng nhập tên đăng nhập !",
        type: "userName",
      });
    } else if (!inputLogin.password) {
      setMessError({
        content: "vui lòng nhập mật khẩu !",
        type: "password",
      });
    } else {
      setMessError({
        content: "",
        type: "",
      });
      handleClose();
      dispatch<Action>(
        actionLogin({
          account: inputLogin.userName,
          password: inputLogin.password,
        })
      );
    }
  };
  const handleSignIn = () => {
    if (!inputLogin.userName) {
      setMessError({
        content: "vui lòng nhập tên đăng nhập !",
        type: "userName",
      });
    } else if (!inputLogin.password) {
      setMessError({
        content: "vui lòng nhập mật khẩu !",
        type: "password",
      });
    } else if (!inputLogin.passwordRepeat) {
      setMessError({
        content: "vui lòng nhập mật khẩu !",
        type: "passwordRepeat",
      });
    } else if (inputLogin.passwordRepeat !== inputLogin.password) {
      setMessError({
        content: "vui lòng nhập trùng khớp mật khẩu !",
        type: "passwordRepeat",
      });
    } else {
      setMessError({
        content: "",
        type: "",
      });
      handleClose();
      dispatch<Action>(
        actionCreateUser({
          account: inputLogin.userName,
          password: inputLogin.password,
          typeAccount: "userName",
          name: "",
          avatar: "",
          address: "",
          phone: "",
        })
      );
    }
  };
  const showError = (type: string): string => {
    let result = messError.type === type ? messError.content : "";

    return result;
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      style={{ zIndex: "102", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-1/3 bg-white capitalize p-4 rounded relative">
        <button
          className="hover:bg-blue-500 absolute -top-5 -right-5 w-12 h-12 rounded-full bg-amber-400 text-white flex justify-center items-center text-2xl"
          onClick={handleClose}
        >
          <FaBackspace />
        </button>
        <div className="flex gap-4">
          <button
            className={clsx(
              isLogin ? "bg-blue-400" : "bg-amber-400",
              "px-2 py-1 capitalize  text-white rounded-md text-xl font-semibold"
            )}
            onClick={toggleIsLogin}
          >
            đăng nhập
          </button>
          <button
            className={clsx(
              !isLogin ? "bg-blue-400" : "bg-amber-400",
              "px-2 py-1 capitalize bg-amber-400 text-white rounded-md text-xl font-semibold"
            )}
            onClick={toggleIsLogin}
          >
            đăng kí
          </button>
        </div>
        {isLogin ? (
          <div className="w-full p-4 flex flex-col gap-2 ">
            <label className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-black">tên đăng nhập :</span>
              <input
                className="w-full outline-none border-2 border-amber-400 rounded-md p-1"
                type="text"
                name="userName"
                value={inputLogin.userName}
                onChange={(e) => handleOnChangeInputLogin(e)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <p className="text-red-600 h-4 text-xs font-semibold">
              {showError("userName")}
            </p>
            <label className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-black">mật khẩu :</span>
              <input
                className="w-full outline-none border-2 border-amber-400 rounded-md p-1"
                type="password"
                name="password"
                value={inputLogin.password}
                onChange={(e) => handleOnChangeInputLogin(e)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <p className="text-red-600 h-4 text-xs font-semibold">
              {showError("password")}
            </p>
            <div className="flex justify-center">
              <ButtonDiscoloration
                context="đăng nhập"
                handleOnClick={handleLogin}
              />
            </div>
          </div>
        ) : (
          <div className="w-full p-4 flex flex-col gap-4 ">
            <label className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-black">tên đăng nhập :</span>
              <input
                className="w-full outline-none border-2 border-amber-400 rounded-md p-1"
                type="text"
                name="userName"
                value={inputLogin.userName}
                onChange={(e) => handleOnChangeInputLogin(e)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <p className="text-red-600 h-4 text-xs font-semibold">
              {showError("userName")}
            </p>
            <label className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-black">mật khẩu :</span>
              <input
                className="w-full outline-none border-2 border-amber-400 rounded-md p-1"
                type="password"
                name="password"
                value={inputLogin.password}
                onChange={(e) => handleOnChangeInputLogin(e)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <p className="text-red-600 h-4 text-xs font-semibold">
              {showError("password")}
            </p>
            <label className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-black">
                nhập lại mật khẩu :
              </span>
              <input
                className="w-full outline-none border-2 border-amber-400 rounded-md p-1"
                type="password"
                name="passwordRepeat"
                value={inputLogin.passwordRepeat}
                onChange={(e) => handleOnChangeInputLogin(e)}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
            <p className="text-red-600 h-4 text-xs font-semibold">
              {showError("passwordRepeat")}
            </p>
            <div className="flex justify-center">
              <ButtonDiscoloration
                context="đăng kí"
                handleOnClick={handleSignIn}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authentication;
