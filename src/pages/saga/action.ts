import {
  ADD_ORDER_FAILED,
  CREATE_CART,
  DELETE_CART,
  DELETE_CART_FALSE,
  DELETE_CART_SUCCESS,
  DELETE_ORDER,
  DELETE_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
  GET_CART,
  GET_CART_FALSE,
  GET_CART_SUCCESS,
  UPDATE_CART,
  UPDATE_CART_FALSE,
  UPDATE_CART_SUCCESS,
  UPDATE_ORDER_FAILED,
  UPDATE_ORDER_SUCCESS,
  //----------
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_FALSE,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FALSE,
  DELETE_PRODUCT_SUCCESS,
  GET_DATA_ORDER,
  GET_DATA_ORDER_FAILED,
  GET_DATA_ORDER_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_FALSE,
  GET_PRODUCT_SUCCESS,
  UPDATE_ORDER,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FALSE,
  UPDATE_PRODUCT_SUCCESS,
  CREATE_CART_SUCCESS,
  CREATE_CART_FALSE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FALSE,
  LOGIN,
  LOGIN_FALSE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FALSE,
  LOGOUT_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FALSE,
  GET_USER,
  GET_USER_SUCCESS,
} from "~/constants";
import { toast } from "react-toastify";
//get product
const actionGetProduct = (payload?: any) => {
  return {
    type: GET_PRODUCT,
    payload,
  };
};
const actionGetProductSuccess = (payload: any) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload,
  };
};
const actionGetProductFalse = (payload: any) => {
  return {
    type: GET_PRODUCT_FALSE,
    payload,
  };
};
//  create product
const actionCreateProduct = (payload: any) => {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
};
const actionCreateProductSuccess = (payload: any) => {
  setTimeout(() => {
    toast.success("thêm sản phẩm thành công");
  }, 1000);

  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload,
  };
};
const actionCreateProductFalse = (payload: any) => {
  setTimeout(() => {
    toast.error("thêm sản phẩm thất bại");
  }, 1000);
  return {
    type: CREATE_PRODUCT_FALSE,
    payload,
  };
};
// update product
const actionUpdateProduct = (payload: any) => {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
};
const actionUpdateProductSuccess = (payload: any) => {
  setTimeout(() => {
    toast.success("cập nhật sản phẩm thành công");
  }, 1000);
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload,
  };
};
const actionUpdateProductFalse = (payload: any) => {
  setTimeout(() => {
    toast.error("cập nhật sản phẩm thất bại");
  }, 1000);
  return {
    type: UPDATE_PRODUCT_FALSE,
    payload,
  };
};
//  delete product
const actionDeleteProduct = (payload: { account: string; id: string }) => {
  return {
    type: DELETE_PRODUCT,
    payload,
  };
};
const actionDeleteProductSuccess = (payload: []) => {
  setTimeout(() => {
    toast.success("xóa sản phẩm thành công");
  }, 1000);
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload,
  };
};
const actionDeleteProductFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("xóa sản phẩm thất bại");
  }, 1000);
  return {
    type: DELETE_PRODUCT_FALSE,
    payload,
  };
};
// get order
const actionGetDataOrder = (payload: string) => {
  return {
    type: GET_DATA_ORDER,
    payload,
  };
};
const actionGetDataOrderSuccess = (payload: any) => {
  return {
    type: GET_DATA_ORDER_SUCCESS,
    payload,
  };
};
const actionGetDataOrderFalse = (payload?: any) => {
  return {
    type: GET_DATA_ORDER_FAILED,
    payload,
  };
};
// create order
const actionCreateDataOrder = (payload: { order: {}; cartID: string[] }) => {
  return {
    type: ADD_ORDER,
    payload,
  };
};

const actionCreateDataOrderSuccess = (payload?: any) => {
  setTimeout(() => {
    toast.success("đặt hàng thành công");
  }, 1000);
  return {
    type: ADD_ORDER_SUCCESS,
    payload,
  };
};
const actionCreateDataOrderFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("đặt hàng thất bại");
  }, 1000);
  return {
    type: ADD_ORDER_FAILED,
    payload,
  };
};
// update order
const actionUpdateDataOrder = (payload: {
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
  return {
    type: UPDATE_ORDER,
    payload,
  };
};
const actionUpdateDataOrderSuccess = (payload?: any) => {
  setTimeout(() => {
    toast.success("cập nhật đơn hàng thành công");
  }, 1000);
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload,
  };
};
const actionUpdateDataOrderFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("cập nhật đơn hàng thất bại");
  }, 1000);
  return {
    type: UPDATE_ORDER_FAILED,
    payload,
  };
};
// delete order
const actionDeleteDataOrder = (payload?: any) => {
  return {
    type: DELETE_ORDER,
    payload,
  };
};
const actionDeleteDataOrderSuccess = (payload?: any) => {
  setTimeout(() => {
    toast.success("hủy đơn hàng thành công");
  }, 1000);
  return {
    type: DELETE_ORDER_SUCCESS,
    payload,
  };
};
const actionDeleteDataOrderFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("xóa đơn hàng thất bại");
  }, 1000);
  return {
    type: DELETE_ORDER_FAILED,
    payload,
  };
};
// get cart
const actionGetDataCart = (payload: string | null) => {
  return {
    type: GET_CART,
    payload,
  };
};
const actionGetDataCartSuccess = (payload?: any) => {
  return {
    type: GET_CART_SUCCESS,
    payload,
  };
};
const actionGetDataCartFalse = (payload?: any) => {
  return {
    type: GET_CART_FALSE,
    payload,
  };
};
// create cart
const actionCreateDataCart = (payload: {
  account: string;
  data: { id: string; productID: string; color: string; count: number };
}) => {
  return {
    type: CREATE_CART,
    payload,
  };
};
const actionCreateDataCartSuccess = (payload: []) => {
  setTimeout(() => {
    toast.success("thêm sản phẩm thành công");
  }, 1000);

  return {
    type: CREATE_CART_SUCCESS,
    payload,
  };
};
const actionCreateDataCartFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("thêm sản phẩm thất bại");
  }, 1000);

  return {
    type: CREATE_CART_FALSE,
    payload,
  };
};
// update cart
const actionUpdateDataCart = (payload: {
  account: string;
  data: { id: string; productID: string; color: string; count: number };
}) => {
  return {
    type: UPDATE_CART,
    payload,
  };
};
const actionUpdateDataCartSuccess = (payload?: any) => {
  return {
    type: UPDATE_CART_SUCCESS,
    payload,
  };
};
const actionUpdateDataCartFalse = (payload?: any) => {
  return {
    type: UPDATE_CART_FALSE,
    payload,
  };
};
// delete cart
const actionDeleteDataCart = (payload: {
  account: string;
  arrID: string[];
}) => {
  return {
    type: DELETE_CART,
    payload,
  };
};
const actionDeleteDataCartSuccess = (payload: []) => {
  setTimeout(() => {
    toast.success("xóa sản phẩm thành công");
  }, 1000);
  return {
    type: DELETE_CART_SUCCESS,
    payload,
  };
};
const actionDeleteDataCartFalse = (payload?: any) => {
  setTimeout(() => {
    toast.error("xóa sản phẩm thất bại");
  }, 1000);

  return {
    type: DELETE_CART_FALSE,
    payload,
  };
};
// get user
const actionGetUser = (payload?: any) => {
  return {
    type: GET_USER,
    payload,
  };
};
const actionGetUserSuccess = (payload: any) => {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
};
// create user
const actionCreateUser = (payload: {
  account: string;
  typeAccount: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
  password: string;
}) => {
  return {
    type: CREATE_USER,
    payload,
  };
};
const actionCreateUserSuccess = (payload: {
  name: string;
  account: string;
}) => {
  setTimeout(() => {
    toast.success(`hello ${payload.name || payload.account}`);
  }, 1000);

  return {
    type: CREATE_USER_SUCCESS,
    payload,
  };
};
const actionCreateUserFalse = (payload: string) => {
  return {
    type: CREATE_USER_FALSE,
    payload,
  };
};
// update user
const actionUpdateUser = (payload: {
  account: string;
  typeAccount: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
  password: string;
}) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};
const actionUpdateUserSuccess = (payload: {
  account: string;
  typeAccount: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
  password: string;
}) => {
  setTimeout(() => {
    toast.success("cập nhật thông tin thành công");
  }, 1000);
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};
const actionUpdateUserFalse = (payload: any) => {
  setTimeout(() => {
    toast.success("cập nhật thông tin thất bại");
  }, 1000);

  return {
    type: UPDATE_USER_FALSE,
    payload,
  };
};
// login
export const actionLogin = (payload: { account: string; password: string }) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const actionLoginSuccess = (payload: {
  name: string;
  account: string;
}) => {
  setTimeout(() => {
    toast.success(`hello ${payload.name || payload.account}`);
  }, 1000);
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
export const actionLoginFalse = (payload: string) => {
  setTimeout(() => {
    toast.error(payload);
  }, 1000);
  return {
    type: LOGIN_FALSE,
    payload,
  };
};
// logout
export const actionLogout = (payload?: any) => {
  return {
    type: LOGOUT,
    payload,
  };
};
export const actionLogoutSuccess = (payload: {
  account: string;
  typeAccount: string;
  avatar: string;
  name: string;
  address: string;
  phone: string;
}) => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};
export const actionLogoutFalse = (payload: any) => {
  return {
    type: LOGOUT_FALSE,
    payload,
  };
};
export {
  // create product
  actionCreateProduct,
  actionCreateProductSuccess,
  actionCreateProductFalse,
  // delete product
  actionDeleteProductFalse,
  actionDeleteProduct,
  actionDeleteProductSuccess,
  // update product
  actionUpdateProduct,
  actionUpdateProductFalse,
  actionUpdateProductSuccess,
  // get product
  actionGetProduct,
  actionGetProductFalse,
  actionGetProductSuccess,
  // create order
  actionCreateDataOrder,
  actionCreateDataOrderSuccess,
  actionCreateDataOrderFalse,
  // delete order
  actionDeleteDataOrder,
  actionDeleteDataOrderSuccess,
  actionDeleteDataOrderFalse,
  // update order
  actionUpdateDataOrder,
  actionUpdateDataOrderSuccess,
  actionUpdateDataOrderFalse,
  // get order
  actionGetDataOrder,
  actionGetDataOrderSuccess,
  actionGetDataOrderFalse,
  // get cart
  actionGetDataCart,
  actionGetDataCartSuccess,
  actionGetDataCartFalse,
  //delete product cart
  actionDeleteDataCart,
  actionDeleteDataCartSuccess,
  actionDeleteDataCartFalse,
  //update cart
  actionUpdateDataCartFalse,
  actionUpdateDataCart,
  actionUpdateDataCartSuccess,
  // add product cart
  actionCreateDataCartFalse,
  actionCreateDataCartSuccess,
  actionCreateDataCart,
  // create user
  actionCreateUser,
  actionCreateUserSuccess,
  actionCreateUserFalse,
  // update user
  actionUpdateUser,
  actionUpdateUserSuccess,
  actionUpdateUserFalse,
  //get user
  actionGetUser,
  actionGetUserSuccess,
};
