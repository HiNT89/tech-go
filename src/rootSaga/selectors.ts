import { createSelector } from "reselect";
const stateAdmin = (state: {
  reducerAdmin: {
    listProduct: [];
    isLoading: boolean;
    user: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
      password: string;
    };
    cart: {
      id: string;
      productID: string;
      count: number;
      color: string;
    }[];
    listUser: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
      password: string;
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
    }[];
  };
}) => state.reducerAdmin;
// global

export const listProductSE = createSelector(
  stateAdmin,
  (state: {
    listProduct: {
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
  }) => state.listProduct
);
export const isLoadingSE = createSelector(
  stateAdmin,
  (state: { isLoading: boolean }) => state.isLoading
);
export const userSE = createSelector(
  stateAdmin,
  (state: {
    user: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
      password: string;
    };
  }) => state.user
);
export const cartSE = createSelector(
  stateAdmin,
  (state: {
    cart: {
      id: string;
      productID: string;
      count: number;
      color: string;
    }[];
  }) => state.cart
);
export const orderSE = createSelector(
  stateAdmin,
  (state: {
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
    }[];
  }) => state.order
);
export const listUserSE = createSelector(
  stateAdmin,
  (state: {
    listUser: {
      account: string;
      typeAccount: string;
      avatar: string;
      name: string;
      address: string;
      phone: string;
      password: string;
    }[];
  }) => state.listUser
);
