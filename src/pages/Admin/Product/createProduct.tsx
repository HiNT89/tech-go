import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CreateProduct({ handleToggleCreate }: { handleToggleCreate: any }) {
  const { v4: uuidv4 } = require("uuid");
  const [dataCreate, setDataCreate] = useState({
    name: "",
    price: 0,
    sale: 0,
    nsx: "default",
    count: [
      {
        id: uuidv4(),
        color: "default",
        count: 1,
        imgURL: "",
      },
    ],
    info: "",
  });

  const [colorName, setColorName] = useState("");
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
        { id: uuidv4(), color: colorName, count: 1, imgURL: "" },
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
          console.log(downloadURL);
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
    <div className="mb-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold uppercase text-2xl text-red-600">
          thêm sản phẩm
        </h2>
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
            name="name"
            value={dataCreate.name}
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
            <option value="apple">apple</option>
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
              onChange={(e) => setColorName(e.target.value)}
              className="w-1/2 outline-none"
            />
          </label>
          <button className="absolute top-1/2 -translate-y-1/2 right-0 capitalize px-2 py-1 bg-amber-500 text-white font-semibold rounded-md" onClick={handleAddColor}>thêm</button>
        </div>
        <div className="capitalize w-full p-2">
          <table>
            <thead>
              <th>STT</th>
              <th>tên màu</th>
              <th>số lượng sản phẩm</th>
              <th>hình ảnh</th>
              <th>thay đổi hình ảnh</th>
            </thead>
            <tbody>
              {dataCreate.count.map((it, index) => (
                <tr>
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
                    <input
                      type="number"
                      name="count"
                      value={it.count}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-4">
        <span className="capitalize font-bold py-4 inline-block">thông tin và thông số : </span>
        <CKEditor
          editor={ClassicEditor}
          data={dataCreate.info}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDataCreate({ ...dataCreate, info: data });
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

      <button>thêm sản phẩm</button>
    </div>
  );
}

export default CreateProduct;
