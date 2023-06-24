import { call, put } from "redux-saga/effects";
import { signInGoogle, signOutGoogle } from "~/components/Header/firebase";
import {
  actionCreateProductFalse,
  actionCreateProductSuccess,
  actionDeleteProductFalse,
  actionDeleteProductSuccess,
  actionGetProductFalse,
  actionGetProductSuccess,
  actionUpdateProductFalse,
  actionUpdateProductSuccess,
  actionGetDataOrderSuccess,
  actionGetDataCartFalse,
  actionGetDataCartSuccess,
  actionCreateDataCartFalse,
  actionCreateDataCartSuccess,
  actionUpdateDataCartSuccess,
  actionUpdateDataCartFalse,
  actionCreateDataOrderSuccess,
  actionCreateDataOrderFalse,
  actionDeleteDataOrderSuccess,
  actionDeleteDataOrderFalse,
  actionDeleteDataCart,
  actionUpdateDataOrderSuccess,
  actionUpdateDataOrderFalse,
  actionLoginFalse,
  actionLoginSuccess,
  actionLogoutFalse,
  actionLogoutSuccess,
  actionCreateUserSuccess,
  actionCreateUserFalse,
  actionUpdateUserSuccess,
  actionGetUserSuccess,
  actionUpdateProduct,
} from "./action";
import {
  getProductService,
  createProductService,
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
} from "~/service";
// ------- get product
function* getProductSaga(action: any) {
  try {
    const response: {
      status: number;
      data: [];
    } = yield call(getProductService, action.payload);
    if (response.status === 200) {
      yield put(actionGetProductSuccess(response.data));
    }
  } catch (err) {
    yield put(actionGetProductFalse(err));
  }
}
// --------- create product
function* createProductSaga(action: any) {
  try {
    const response: {
      status: number;
      data: [];
    } = yield call(createProductService, action.payload);
    if (response.status === 201) {
      yield put(actionCreateProductSuccess(response.data));
    }
  } catch (err) {
    yield put(actionCreateProductFalse(err));
  }
}

// --------- update product
function* updateProductSaga(action: any) {
  try {
    const response: {
      status: number;
      data: [];
    } = yield call(updateProductService, action.payload);
    if (response.status === 200) {
      yield put(actionUpdateProductSuccess(response.data));
    }
  } catch (err) {
    yield put(actionUpdateProductFalse(err));
  }
}

// --------- delete product
function* deleteProductSaga(action: any) {
  try {
    const response: {
      status: number;
      data: [];
    } = yield call(deleteProductService, action.payload);
    if (response.status === 200) {
      yield put(actionDeleteProductSuccess(response.data));
    }
  } catch (err) {
    yield put(actionDeleteProductFalse(err));
  }
}
// get order
function* getDataOrderSaga(action: { type: string; payload: string }) {
  try {
    const response: [] = yield call(getDataOrderService, action.payload);
    yield put(actionGetDataOrderSuccess(response));
  } catch (e) {}
}
// create order
function* createOrderSaga(action: {
  type: string;
  payload: {
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
  };
}) {
  try {
    const response: {
      isSuccess: boolean;
      listCartID: string[];
      arrOrder: {
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
      }[];
    } = yield call(addOrderService, action.payload);
    if (response.isSuccess) {
      yield put(
        actionDeleteDataCart({
          account: action.payload.order.account,
          arrID: response.listCartID,
        })
      );

      yield put(actionCreateDataOrderSuccess(response.arrOrder));
    } else {
      yield put(actionCreateDataOrderFalse(response.arrOrder));
    }
  } catch (e) {}
}
// delete order
function* deleteOrderSaga(action: {
  type: string;
  payload: { account: string; id: string };
}) {
  try {
    const response: { isSuccess: boolean; arrProduct: [] } = yield call(
      deleteOrderService,
      action.payload
    );
    if (response.isSuccess) {
      yield put(actionDeleteDataOrderSuccess(response.arrProduct));
    } else {
      yield put(actionDeleteDataOrderFalse());
    }
  } catch (e) {}
}
// update order
function* updateOrderSaga(action: {
  type: string;
  payload: {
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
  };
}) {
  try {
    const response: {
      isSuccess: boolean;
      arrOrder: [];
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
    } = yield call(updateOrderService, action.payload);
    if (response.isSuccess) {
      console.log(action.payload.order.status !== "processing");
      if (action.payload.order.status !== "processing") {
        for (let product of response.products) {
          const productOrder = action.payload.order.products;
          const newCount = product.count.map((it) => {
            const subtrahend = productOrder.filter(
              (item) => item.color === it.color
            );
            return subtrahend.length
              ? {
                  ...it,
                  remaining: it.remaining - subtrahend[0].count,
                }
              : it;
          });
          product.count = newCount;
          yield put(
            actionUpdateProduct({
              option: product,
              id: product.id,
            })
          );
        }
      }
      yield put(actionUpdateDataOrderSuccess(response.arrOrder));
    } else {
      yield put(actionUpdateDataOrderFalse());
    }
  } catch (e) {}
}
// get cart
function* getCartSaga(action: { type: string; payload: string | null }) {
  try {
    const response: [] = yield call(getCartService, action.payload);
    yield put(actionGetDataCartSuccess(response));
  } catch (e) {
    yield put(actionGetDataCartFalse(e));
  }
}
// create cart
function* createCartSaga(action: {
  type: string;
  payload: {
    account: string;
    data: { id: string; productID: string; color: string; count: number };
  };
}) {
  try {
    const response: [] = yield call(createCartService, action.payload);
    yield put(actionCreateDataCartSuccess(response));
  } catch (e) {
    yield put(actionCreateDataCartFalse(e));
  }
}
// update cart
function* updateCartSaga(action: {
  type: string;
  payload: {
    account: string;
    data: { id: string; productID: string; color: string; count: number };
  };
}) {
  try {
    const response: [] = yield call(updateCartService, action.payload);
    yield put(actionUpdateDataCartSuccess(response));
  } catch (e) {
    yield put(actionUpdateDataCartFalse(e));
  }
}
// delete cart
function* deleteCartSaga(action: {
  type: string;
  payload: {
    account: string;
    arrID: string[];
  };
}) {
  try {
    const response: [] = yield call(deleteCartService, action.payload);
    yield put(actionUpdateDataCartSuccess(response));
  } catch (e) {
    yield put(actionUpdateDataCartFalse(e));
  }
}
// logout
function* logoutSaga() {
  try {
    const response: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
    } = yield call(signOutGoogle);
    if (!response.account) {
      yield put(actionLogoutSuccess(response));
    }
  } catch (e) {
    yield put(actionLogoutFalse(e));
  }
}
// login
function* loginSaga(action: {
  type: string;
  payload: {
    account: string;
    password: string;
  };
}) {
  try {
    const response: {
      arrUser: { name: string; account: string };
      isSuccess: boolean;
      status: string;
    } = yield call(loginUserService, action.payload);
    if (response.isSuccess) {
      yield put(actionLoginSuccess(response.arrUser));
    } else {
      yield put(actionLoginFalse(response.status));
    }
  } catch (e) {}
}
// get user
function* getUserSaga() {
  try {
    const response: [] = yield call(getUserService);
    yield put(actionGetUserSuccess(response));
  } catch (e) {}
}
// create user
function* createUserSaga(action: {
  type: string;
  payload: {
    account: string;
    typeAccount: string;
    avatar: string;
    name: string;
    address: string;
    phone: string;
    password: string;
  };
}) {
  try {
    const response: {
      objUser: { name: string; account: string };
      isSuccess: boolean;
      status: string;
    } = yield call(createUserService, action.payload);
    if (response.isSuccess) {
      yield put(actionCreateUserSuccess(response.objUser));
    } else {
      yield put(actionCreateUserFalse(response.status));
    }
  } catch (e) {}
}
// update user
function* updateUserSaga(action: {
  type: string;
  payload: {
    account: string;
    typeAccount: string;
    avatar: string;
    name: string;
    address: string;
    phone: string;
    password: string;
  };
}) {
  try {
    const response: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
      password: string;
    } = yield call(updateUserService, action.payload);
    yield put(actionUpdateUserSuccess(response));
  } catch (e) {}
}
export {
  getProductSaga,
  createProductSaga,
  updateProductSaga,
  deleteProductSaga,
  getCartSaga,
  createCartSaga,
  updateCartSaga,
  deleteCartSaga,
  loginSaga,
  logoutSaga,
  createOrderSaga,
  getDataOrderSaga,
  deleteOrderSaga,
  updateOrderSaga,
  createUserSaga,
  updateUserSaga,
  getUserSaga,
};
