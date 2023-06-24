import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SketchPicker } from "react-color";
import clsx from "clsx";
import styles from "../Admin.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductSE } from "~/rootSaga/selectors";
import { listNSX } from "../dataUI";
import { listNav } from "~/components/Header/dataUI";
function EditProduct({
  handleToggleCreate,
  title,
  contentBtn,
  submitBtn,
  id,
}: {
  id: string;
  handleToggleCreate: any;
  title: string;
  contentBtn: string;
  submitBtn: any;
}) {
  const listProduct = useSelector(listProductSE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = () => {
    let result = {
      productName: "",
      nsx: "",
      price: 0,
      sale: 0,
      percentSale: 0,
      description: "",
      productID: "",
      type: "",
      count: [
        {
          id: uuidv4(),
          color: "đen",
          count: 1,
          remaining: 1,
          imgURL: "",
          codeColor: "#000",
        },
      ],
      id: "1",
    };
    if (+id) {
      result = listProduct.filter((it) => it.id === id)[0];
    }
    return result;
  };
  const { v4: uuidv4 } = require("uuid");
  const [dataCreate, setDataCreate] = useState(initState());

  const [colorName, setColorName] = useState("");
  // ---------- effect
  ///----------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataCreate({ ...dataCreate, [name]: value });
  };
  const handlePercentSale = () => {
    let result =
      100 - Math.floor((+dataCreate.sale / +dataCreate.price) * 100) || 0;
    result = +dataCreate.sale ? result : 0;
    return result;
  };
  const handleAddColor = async () => {
    await setDataCreate({
      ...dataCreate,
      count: [
        ...dataCreate.count,
        {
          id: uuidv4(),
          color: colorName,
          count: 1,
          remaining: 1,
          imgURL: "",
          codeColor: "",
        },
      ],
    });
    setColorName("");
  };
  const handleUpdateColor = (e: any, id: string) => {
    const { name, value } = e.target;
    setDataCreate({
      ...dataCreate,
      count: dataCreate.count.map((it) =>
        it.id === id
          ? {
              ...it,
              [name]: value,
            }
          : it
      ),
    });
  };

  const handleFileUpload = async (file: any, fileName: string, id: string) => {
    const storageRef = ref(storage, `${fileName.slice(12)}`);

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file[0], metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDataCreate({
            ...dataCreate,
            count: dataCreate.count.map((it) =>
              it.id === id
                ? {
                    ...it,
                    imgURL: downloadURL,
                  }
                : it
            ),
          });
        });
      }
    );
  };
  return (
    <div className="mb-6 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold uppercase text-2xl text-red-600">{title}</h2>
        <button
          className="py-1 px-2  rounded-lg bg-amber-500 text-white font-semibold"
          onClick={handleToggleCreate}
        >
          Đóng
        </button>
      </div>
      <div className="flex flex-wrap ">
        <label className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">tên sản phẩm :</span>
          <input
            type="text"
            name="productName"
            value={dataCreate.productName}
            onChange={(e) => handleChange(e)}
            className="w-2/3 outline-none p-1"
          />
        </label>
        <label className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">nhà sản xuất:</span>
          <select
            name="nsx"
            value={dataCreate.nsx}
            onChange={(e) => handleChange(e)}
            className="w-2/3 outline-none p-1 capitalize"
          >
            <option value="default">nhà sản xuất</option>
            {listNSX.map((it) => (
              <option key={it.id} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </label>
        <label className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">loại sản phẩm:</span>
          <select
            name="type"
            value={dataCreate.type}
            onChange={(e) => handleChange(e)}
            className="w-2/3 outline-none p-1 capitalize"
          >
            <option value="default">loại sản phẩm</option>
            {listNav.slice(1).map((it) => (
              <option key={it.type} value={it.type}>
                {it.content}
              </option>
            ))}
          </select>
        </label>
        <label className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">giá sản phẩm :</span>
          <input
            type="number"
            name="price"
            value={dataCreate.price}
            onChange={(e) => handleChange(e)}
            className="w-2/3 outline-none p-1"
          />
        </label>
        <label className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">giá khuyễn mại:</span>
          <input
            type="number"
            name="sale"
            value={dataCreate.sale}
            onChange={(e) => handleChange(e)}
            className="w-2/3 outline-none p-1"
          />
        </label>
        <div className="capitalize w-1/2 flex p-2">
          <span className="w-1/3 font-bold">phần trăm khuyễn mãi :</span>
          <b className="w-2/3 ">{handlePercentSale()} %</b>
        </div>
        <div className="capitalize w-1/2 flex p-2 relative">
          <label className="w-full flex">
            <span className="w-1/3 font-bold">color :</span>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="w-1/2 outline-none"
            />
          </label>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 capitalize px-2 py-1 bg-amber-500 text-white font-semibold rounded-md"
            onClick={handleAddColor}
          >
            thêm
          </button>
        </div>
        <div className="capitalize w-full p-2">
          <table>
            <thead>
              <th>STT</th>
              <th>tên màu</th>
              <th>màu</th>
              <th>số lượng sản phẩm</th>
              <th>số lượng còn lại</th>
              <th>hình ảnh</th>
              <th>thay đổi hình ảnh</th>
              <th>xóa</th>
            </thead>
            <tbody>
              {dataCreate.count.map((it, index) => (
                <tr key={it.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="color"
                      value={it.color}
                      onChange={(e) => handleUpdateColor(e, it.id)}
                      className="w-11/12 py-3 px-2"
                    />
                  </td>
                  <td>
                    <div className={clsx(styles.box_color, "relative w-20")}>
                      <div className="absolute z-10">
                        <SketchPicker
                          color={dataCreate.count[0].codeColor}
                          onChange={(updatedColor: any) =>
                            setDataCreate({
                              ...dataCreate,
                              count: dataCreate.count.map((item) =>
                                item.id === it.id
                                  ? { ...item, codeColor: updatedColor.hex }
                                  : item
                              ),
                            })
                          }
                        />
                      </div>
                      <span style={{ backgroundColor: it.codeColor }}></span>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="count"
                      value={it.count}
                      onChange={(e) => handleUpdateColor(e, it.id)}
                      className="w-11/12 py-3 px-2"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="remaining"
                      value={it.remaining}
                      onChange={(e) => handleUpdateColor(e, it.id)}
                      className="w-11/12 py-3 px-2"
                    />
                  </td>
                  <td>
                    <img src={it.imgURL} />
                  </td>
                  <td>
                    <input
                      type="file"
                      name="imgURL"
                      onChange={async (e) =>
                        handleFileUpload(e.target.files, e.target.value, it.id)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className=" capitalize px-2 py-1 bg-amber-500 text-white font-semibold rounded-md"
                      onClick={() =>
                        setDataCreate({
                          ...dataCreate,
                          count: dataCreate.count.filter(
                            (item) => item.id !== it.id
                          ),
                        })
                      }
                    >
                      xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-4">
        <span className="capitalize font-bold py-4 inline-block">
          thông tin và thông số :
        </span>
        <CKEditor
          editor={ClassicEditor}
          data={dataCreate.description}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDataCreate({ ...dataCreate, description: data });
            // console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>
      {+id ? (
        <button
          onClick={() => {
            submitBtn({
              option: {
                productName: dataCreate.productName,
                nsx: dataCreate.nsx,
                price: +dataCreate.price,
                sale: +dataCreate.sale,
                percentSale: Math.round(
                  (1 - dataCreate.sale / dataCreate.price) * 100
                ),
                description: dataCreate.description,
                productID: uuidv4(),
                type: dataCreate.type,
                count: dataCreate.count,
              },
              id: id,
            });
            navigate("/admin/product");
          }}
          className="px-2 py-1 bg-amber-500 text-white rounded-lg capitalize"
        >
          {contentBtn}
        </button>
      ) : (
        <button
          onClick={() => {
            submitBtn({
              productName: dataCreate.productName,
              nsx: dataCreate.nsx,
              price: +dataCreate.price,
              sale: +dataCreate.sale,
              percentSale: Math.round(
                (1 - dataCreate.sale / dataCreate.price) * 100
              ),
              type: dataCreate.type,
              description: dataCreate.description,
              productID: uuidv4(),
              count: dataCreate.count,
            });
            setDataCreate({
              productName: "",
              nsx: "",
              price: 0,
              sale: 0,
              percentSale: 0,
              description: "",
              productID: "",
              type: "",
              count: [
                {
                  id: "",
                  color: "đen",
                  count: 1,
                  remaining: 1,
                  imgURL: "",
                  codeColor: "#000",
                },
              ],
              id: "1",
            });
          }}
          className="px-2 py-1 bg-amber-500 text-white rounded-lg capitalize"
        >
          {contentBtn}
        </button>
      )}
    </div>
  );
}

export default EditProduct;
