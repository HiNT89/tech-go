import axios from "axios";
import { URL_PRODUCT } from "~/constants";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "~/firebase/firebase";
import { truncate } from "fs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//----- get product
const getProductService = (payload?: any) => {
  let url = `${URL_PRODUCT}product`;
  if (payload) {
    url = `${URL_PRODUCT}product/${payload}`;
  }
  return axios.get(url);
};
// -------- create product
const createProductService = (payload: any) => {
  const url = `${URL_PRODUCT}product`;
  return axios.post(url, payload);
};
// ---- update product
const updateProductService = (payload: any) => {
  const url = `${URL_PRODUCT}product/${payload.id}`;
  return axios.put(url, payload.option);
};
// ---- delete product
const deleteProductService = (payload: any) => {
  const url = `${URL_PRODUCT}product/${payload}`;
  return axios.delete(url);
};
// get order
const getDataOrderService = async (account: string) => {
  let arrOrder: any[] = [];
  if (account === "all") {
    const querySnapshot = await getDocs(collection(db, "order"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().order) {
        arrOrder = [...arrOrder, ...doc.data().order];
      }
    });
  } else {
    const docSnap = await getDoc(doc(db, "order", account));
    if (docSnap.exists()) {
      arrOrder = docSnap.data().order;
    } else {
      // docSnap.data() will be undefined in this case
      arrOrder = [];
    }
  }
  return arrOrder;
};
// create order
const addOrderService = async (payload: {
  cartID: string[];
  order: {
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
  };
}) => {
  let arrOrder: any = [];
  let isSuccess: boolean = false;
  const listCartID = payload.cartID;
  try {
    let lengthBefore: number = 0;
    const docSnap = await getDoc(doc(db, "order", payload.order.account));
    if (docSnap.exists()) {
      arrOrder = docSnap.data().order;
      lengthBefore = docSnap.data().order.length;
    } else {
      // docSnap.data() will be undefined in this case
      lengthBefore = 0;
    }
    let convertData = { order: [payload.order, ...arrOrder] };

    await setDoc(doc(db, "order", payload.order.account), convertData);
    const docSnapAfter = await getDoc(doc(db, "order", payload.order.account));
    if (docSnapAfter.exists()) {
      arrOrder = docSnapAfter.data().order;

      isSuccess = lengthBefore + 1 == docSnapAfter.data().order.length;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return {
    isSuccess,
    arrOrder,
    listCartID,
  };
};
// delete order
const deleteOrderService = async (payload: { account: string; id: string }) => {
  const { account, id } = payload;
  let arrProduct: {
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
  }[] = [];
  let isSuccess: boolean = false;
  try {
    let lengthBefore: number = 0;
    const docSnap = await getDoc(doc(db, "order", account));
    if (docSnap.exists()) {
      arrProduct = docSnap.data().order;
      lengthBefore = docSnap.data().order.length;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    let convertData = { order: arrProduct.filter((it) => it.id !== id) };

    await setDoc(doc(db, "order", account), convertData);
    const docSnapAfter = await getDoc(doc(db, "order", account));
    if (docSnapAfter.exists()) {
      arrProduct = docSnapAfter.data().order;
      isSuccess = lengthBefore == docSnapAfter.data().order.length + 1;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return {
    isSuccess,
    arrProduct,
  };

  //  delete doc
};
// update order
const updateOrderService = async (payload: {
  products: {
    productName: string;
    nsx: string;
    price: number;
    sale: number;
    percentSale: number;
    description: string;
    productID: string;
    type: string;
    count: {
      id: string;
      color: string;
      count: number;
      remaining: number;
      imgURL: string;
      codeColor: string;
    }[];
    id: string;
  }[];
  order: {
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
  };
}) => {
  const { order, products } = payload;
  let arrOrder: {
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
  }[] = [];
  let isSuccess: boolean = true;
  try {
    let lengthBefore: number = 0;
    const docSnap = await getDoc(doc(db, "order", order.account));
    if (docSnap.exists()) {
      arrOrder = docSnap.data().order;
      lengthBefore = docSnap.data().order.length;
    } else {
      // docSnap.data() will be undefined in this case
      lengthBefore = 0;
    }
    let convertData = {
      order: arrOrder.map((it) => (it.id === order.id ? order : it)),
    };

    await setDoc(doc(db, "order", order.account), convertData);
    arrOrder = [];
    const querySnapshot = await getDocs(collection(db, "order"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arrOrder = [...arrOrder, ...doc.data().order];
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return {
    isSuccess,
    arrOrder,
    products,
  };
};
// ==== get cart
const getCartService = async (account: string | null) => {
  const accountTS = account === null ? "" : account;
  let arrProduct: any = [];
  try {
    const docSnap = await getDoc(doc(db, "cart", accountTS));
    if (docSnap.exists()) {
      arrProduct = docSnap.data().products;
    } else {
      // docSnap.data() will be undefined in this case
      arrProduct = [];
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return arrProduct;
};
// create cart
const createCartService = async (payload: {
  data: { id: string; productID: string; color: string; count: number };
  account: string;
}) => {
  const { data, account } = payload;
  let arrProduct: any = [];
  try {
    const docSnapBefore = await getDoc(doc(db, "cart", account));
    if (docSnapBefore.exists()) {
      arrProduct = docSnapBefore.data().products;
    } else {
      // docSnap.data() will be undefined in this case
      arrProduct = [];
    }
    const confident = arrProduct.filter(
      (it: { id: string; productID: string; color: string; count: number }) =>
        it.color === data.color && it.productID === data.productID
    );
    let convertData = { products: [data, ...arrProduct] };
    if (confident.length) {
      convertData = {
        products: arrProduct.map(
          (it: {
            id: string;
            productID: string;
            color: string;
            count: number;
          }) =>
            it.id === confident[0].id
              ? {
                  ...confident[0],
                  count: confident[0].count + 1,
                }
              : it
        ),
      };
    }
    await setDoc(doc(db, "cart", account), convertData);
    const docSnap = await getDoc(doc(db, "cart", account));
    if (docSnap.exists()) {
      arrProduct = docSnap.data().products;
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return arrProduct;
};
// update cart
const updateCartService = async (payload: {
  account: string;
  data: { id: string; productID: string; color: string; count: number };
}) => {
  const { account, data } = payload;

  let arrCart = [];
  try {
    const docSnap = await getDoc(doc(db, "cart", account));
    if (docSnap.exists()) {
      arrCart = docSnap
        .data()
        .products.map(
          (it: {
            id: string;
            productID: string;
            color: string;
            number: number;
          }) => (it.id === data.id ? data : it)
        );
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
      alert("error");
    }
    await setDoc(doc(db, "cart", account), { products: arrCart });
  } catch (e) {
    alert("error");
  }
  return arrCart;
};
// delete cart
const deleteCartService = async (payload: {
  account: string;
  arrID: string[];
}) => {
  const { account, arrID } = payload;
  let arrCart = [];
  try {
    const docSnap = await getDoc(doc(db, "cart", account));
    if (docSnap.exists()) {
      arrCart = docSnap
        .data()
        .products.filter(
          (it: {
            id: string;
            productID: string;
            color: string;
            number: number;
          }) => !arrID.includes(it.id)
        );
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
      alert("error");
    }
    await setDoc(doc(db, "cart", account), { products: arrCart });
  } catch (e) {
    alert("error");
  }
  return arrCart;
};

// get user
const getUserService = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((it) => it.data());
};
// create user
const createUserService = async (payload: {
  account: string;
  typeAccount: string;
  password: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
}) => {
  let objUser = {};
  let isSuccess: boolean = false;
  let status: string = "";
  const arrAccount: string[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arrAccount.push(doc.id);
    });
    if (!arrAccount.includes(payload.account)) {
      isSuccess = true;
      const data = Object.fromEntries(Object.entries(payload).slice(1));
      await setDoc(doc(db, "users", payload.account), data);
      objUser = payload;
    } else if (payload.typeAccount !== "account") {
      isSuccess = false;
      status = "tài khoản đã tồn tại";
    } else {
      isSuccess = true;
      const docRef = doc(db, "users", payload.account);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        objUser = docSnap.data();
      }
    }
    // if (
    //   payload.typeAccount === "account" &&
    //   !arrAccount.includes(payload.account)
    // ) {
    //   isSuccess = true;
    //   const data = Object.fromEntries(Object.entries(payload).slice(1));
    //   await setDoc(doc(db, "users", payload.account), data);
    // } else if (
    //   payload.typeAccount !== "account" &&
    //   arrAccount.includes(payload.account)
    // ) {
    //   isSuccess = false;
    //   status = "tài khoản đã tồn tại";
    // } else {
    //   const data = Object.fromEntries(Object.entries(payload).slice(1));
    //   await setDoc(doc(db, "users", payload.account), data);
    // }
  } catch (e) {}
  return {
    objUser,
    isSuccess,
    status,
  };
};
// update user
const updateUserService = async (payload: {
  account: string;
  typeAccount: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
  password: string;
}) => {
  let objUser = payload;
  try {
    const data = {
      ...payload,
    };
    await setDoc(doc(db, "users", payload.account), data);
  } catch (e) {}
  return objUser;
};
// login user /
const loginUserService = async (payload: {
  account: string;
  password: string;
}) => {
  let arrUser: {} = {};
  let isSuccess: boolean = false;
  let status: string = "";
  try {
    const docRef = doc(db, "users", payload.account);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const response = docSnap.data();
      if (payload.password === response.password) {
        arrUser = {
          ...response,
          account: payload.account,
        };
        isSuccess = true;
      } else {
        status = "mật khẩu không chính xác";
        arrUser = {
          account: "",
          typeAccount: "",
          name: "",
          avatar: "",
          address: "",
          phone: "",
        };
      }
    } else {
      // docSnap.data() will be undefined in this case
      status = "tài khoản không tồn tại";
      arrUser = {
        account: "",
        typeAccount: "",
        name: "",
        avatar: "",
        address: "",
        phone: "",
      };
    }
  } catch (e) {}
  return {
    arrUser,
    isSuccess,
    status,
  };
};
export {
  createProductService,
  getProductService,
  updateProductService,
  deleteProductService,
  getDataOrderService,
  addOrderService,
  getCartService,
  createCartService,
  updateCartService,
  deleteCartService,
  deleteOrderService,
  updateOrderService,
  loginUserService,
  createUserService,
  updateUserService,
  getUserService,
};
