import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useState, useEffect, useRef } from "react";
import { typeOrders } from "./dataUI";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { listProductSE, orderSE, userSE } from "~/rootSaga/selectors";
import { actionDeleteDataOrder, actionUpdateUser } from "~/pages/saga/action";
import { VND, formatNumber } from "~/function";
import ButtonDiscoloration from "~/components/ButtonDiscoloration";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { storage } from "~/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ButtonBackToTop from "~/components/ButtonBackToTop";

interface Action {
  type: string;
  payload: any;
}
const Order = () => {
  const order = useSelector(orderSE);
  const listProduct = useSelector(listProductSE);
  const user = useSelector(userSE);
  const dispatch = useDispatch();
  // state
  const [typeOrder, setTypeOrder] = useState(typeOrders[0]);
  const [isShowNav, setIsShowNav] = useState(false);
  const filterOrderByType = (): {
    account: string;
    address: string;
    phone: string;
    id: string;
    products: {
      productName: string;
      price: number;
      count: number;
      color: string;
      productID: string;
    }[];
    total: number;
    name: string;
    status: string;
    description: string;
    date: {
      time: string;
      date: string;
    };
  }[] => {
    const result: {
      account: string;
      address: string;
      phone: string;
      id: string;
      products: {
        productName: string;
        price: number;
        count: number;
        color: string;
        productID: string;
      }[];
      total: number;
      name: string;
      status: string;
      description: string;
      date: {
        time: string;
        date: string;
      };
    }[] = order.filter((it) =>
      typeOrder.type === "all" ? true : it.status === typeOrder.type
    );

    return result;
  };
  const [listOrderByType, setListOrderByType] = useState(filterOrderByType());

  const [info, setInfo] = useState({
    account: user.account,
    password: user.password,
    typeAccount: user.typeAccount,
    address: user.address,
    phone: user.phone,
    avatar: user.avatar,
    name: user.name,
  });

  // effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const newList = filterOrderByType();
    setListOrderByType(newList);
  }, [typeOrder]);
  // function
  const toggleNav = () => {
    setIsShowNav(!isShowNav);
  };
  const filterImgProduct = ({
    id,
    color,
  }: {
    id: string;
    color: string;
  }): string => {
    let result: string = "";
    const productItem = listProduct.filter((it) => it.id === id)[0];
    result = productItem.count.filter((it) => it.color === color)[0].imgURL;
    return result;
  };
  const handleOnChangeInput = (e: {
    target: { name: string; value: string };
  }) => {
    if (e.target.name === "phone") {
      setInfo({
        ...info,
        phone: formatNumber(e.target.value),
      });
    } else {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleDeleteOrder = (id: string) => {
    dispatch<Action>(actionDeleteDataOrder({ account: user.account, id: id }));
  };
  const handleUpdateUser = () => {
    const confident = !(info.name && info.phone && info.address);
    if (confident) {
      toast.error("vui lòng nhập đủ thông tin");
    } else {
      const payload = { ...info };

      dispatch<Action>(
        actionUpdateUser({
          ...payload,
        })
      );
    }
  };
  const [isShowBtnToTop, setIsShowBtnToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setIsShowBtnToTop(true);
      } else {
        setIsShowBtnToTop(false);
      }
    });
  }, []);
  return (
    <>
      <Header isShowNav={isShowNav} toggleNav={toggleNav} />
      <main className="flex flex-col gap-6 justify-center items-center py-6 relative">
        <ButtonBackToTop isShowBtnToTop={isShowBtnToTop} />
        <h1 className="capitalize text-3xl font-bold ">đơn hàng của bạn</h1>
        <div className="w-full px-4 flex">
          <div className="w-1/3 pr-2 flex flex-col items-center gap-6 capitalize bg-gray-200 p-4 rounded-md">
            <h2 className="uppercase text-2xl font-semibold mb-6">
              thông tin của bạn
            </h2>
            <div className="w-4/5 flex flex-col items-center">
              <Avatar src={info.avatar} alt={info.name} />
              <input
                type="file"
                name="avatar"
                onChange={(e) => {
                  const file = e.target.files;
                  if (file) {
                    const str = "blob:http://localhost:3000/";
                    const storageRef = ref(
                      storage,
                      `avatar/${e.target.value.slice(str.length)}`
                    );

                    // Create file metadata including the content type
                    /** @type {any} */
                    const metadata = {
                      contentType: "image/jpeg",
                    };
                    // Upload the file and metadata
                    const uploadTask = uploadBytesResumable(
                      storageRef,
                      file[0],
                      metadata
                    );
                    uploadTask.on(
                      "state_changed",
                      (snapshot) => {
                        const progress =
                          (snapshot.bytesTransferred / snapshot.totalBytes) *
                          100;
                        // console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                          case "paused":
                            break;
                          case "running":
                            break;
                        }
                      },
                      (error) => {
                        // Handle unsuccessful uploads
                      },
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            setInfo({
                              ...info,
                              avatar: downloadURL,
                            });
                          }
                        );
                      }
                    );
                  }
                }}
                id="avatar"
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="mt-4 capitalize cursor-pointer hover:bg-blue-500 bg-amber-400 text-white font-semibold py-1 px-2 rounded-md"
              >
                chọn avatar
              </label>
            </div>
            <div className="flex w-full">
              <span className="inline-block w-28">người nhận :</span>
              <input
                type="text"
                value={info.name}
                name="name"
                className="flex-grow p-1 outline-none border rounded capitalize"
                onChange={(e) => handleOnChangeInput(e)}
              />
            </div>
            <div className="flex  w-full">
              <span className="inline-block uppercase w-28">Sdt :</span>
              <input
                type="text"
                value={info.phone}
                name="phone"
                className="flex-grow p-1 outline-none border rounded capitalize"
                onChange={(e) => handleOnChangeInput(e)}
              />
            </div>
            <div className="flex  w-full">
              <span className="inline-block w-28">địa chỉ :</span>
              <input
                type="text"
                name="address"
                value={info.address}
                className="flex-grow p-1 outline-none border rounded capitalize"
                onChange={(e) => handleOnChangeInput(e)}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <ButtonDiscoloration
                context="cập nhật"
                handleOnClick={handleUpdateUser}
              />
            </div>
          </div>
          <div className="w-2/3 pl-2">
            <div className="flex gap-4 mb-6">
              {typeOrders.map((it) => (
                <button
                  key={it.id}
                  className={clsx(
                    typeOrder === it ? "bg-blue-600" : "bg-amber-500",
                    "capitalize border px-2 py-1 rounded-md text-white"
                  )}
                  onClick={() => setTypeOrder(it)}
                >
                  {it.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {listOrderByType.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-col shadow-lg bg-gray-200 rounded-xl p-4 gap-6 capitalize"
                >
                  <div>
                    {i.products.map((it, index) => (
                      <div key={index} className="flex">
                        <div className="w-1/6">
                          <img
                            src={filterImgProduct({
                              id: it.productID,
                              color: it.color,
                            })}
                            className="w-20 h-20 rounded"
                          />
                        </div>
                        <div className="w-2/3 px-4">
                          <h3 className="font-bold">{it.productName}</h3>
                          <p className="text-gray-500">
                            <span>phân loại hàng :</span>
                            <span> {it.color}</span>
                          </p>
                          <span>X {it.count}</span>
                          <p>
                            {
                              typeOrders.filter(
                                (item) => item.type === i.status
                              )[0].name
                            }
                          </p>
                        </div>
                        <div className="w-1/6">{VND.format(it.price)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {typeOrders.filter((item) => item.type === i.status)[0]
                      .type === "processing" ? (
                      <div className="w-1/3">
                        <ButtonDiscoloration
                          context="hủy đơn hàng"
                          handleOnClick={() => handleDeleteOrder(i.id)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <span>thành tiền :</span>
                    <span className="text-red-500 font-semibold">
                      {VND.format(i.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Order;
