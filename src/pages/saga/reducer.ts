import {
  GET_USER,
  UPDATE_USER_FALSE,
  UPDATE_USER_SUCCESS,
  ADD_ORDER,
  ADD_ORDER_FAILED,
  ADD_ORDER_SUCCESS,
  GET_DATA_ORDER,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  CREATE_CART,
  CREATE_PRODUCT,
  CREATE_PRODUCT_FALSE,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  GET_CART,
  GET_CART_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FALSE,
  LOGOUT,
  LOGOUT_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FALSE,
  UPDATE_PRODUCT_SUCCESS,
  GET_DATA_ORDER_SUCCESS,
  GET_DATA_ORDER_FAILED,
  DELETE_ORDER_FAILED,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  CREATE_CART_SUCCESS,
  DELETE_CART,
  DELETE_CART_SUCCESS,
  DELETE_CART_FALSE,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
  UPDATE_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  GET_USER_SUCCESS,
  CREATE_USER_FALSE,
} from "~/constants";
type stateParameters = {
  user: {
    account: string;
    typeAccount: string;
    avatar: string;
    name: string;
    address: string;
    phone: string;
    password: string;
  };
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
  isLoading: boolean;
  cart: {
    id: string;
    productID: string;
    count: number;
    color: string;
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
  listUser: [];
};
const initState: stateParameters = {
  user: {
    // account: "",
    // typeAccount: "",
    // name: "",
    // avatar: "",
    // address: "",
    // phone: "",
    // password: "",
    account: "1",
    typeAccount: "",
    name: "1",
    avatar: "1",
    address: "1",
    phone: "1",
    password: "1",
  },
  listProduct: [
    {
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
          imgURL:
            "https://firebasestorage.googleapis.com/v0/b/techgo-b1a51.appspot.com/o/product_12_1_f5ccbd4611264aa689ade7ac66582992_343191087259479a81b8e9e878d6abd1_master.png?alt=media&token=64a68e34-88c9-4f23-8a34-5636a61de2f1",
          codeColor: "#000",
        },
      ],
      id: "1",
    },
  ],
  isLoading: false,
  cart: [],
  order: [],
  listUser: [],
};
const reducerAdmin = (state: stateParameters = initState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    //  get product
    case GET_PRODUCT: {
      return { ...state, isLoading: true };
    }
    case GET_PRODUCT_SUCCESS: {
      return { ...state, listProduct: payload, isLoading: false };
    }
    // create product
    case CREATE_PRODUCT: {
      return { ...state, isLoading: true };
    }
    case CREATE_PRODUCT_SUCCESS: {
      const newListProduct = [...state.listProduct, payload];
      return {
        ...state,
        listProduct: newListProduct,
        isLoading: false,
      };
    }
    // update product
    case UPDATE_PRODUCT: {
      return { ...state, isLoading: true };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      const newListProduct = state.listProduct.map((it) =>
        it.id === payload.id ? payload : it
      );
      return {
        ...state,
        listProduct: newListProduct,
        isLoading: false,
      };
    }

    // delete product
    case DELETE_PRODUCT: {
      return { ...state, isLoading: true };
    }
    case DELETE_PRODUCT_SUCCESS: {
      const newListProduct = state.listProduct.filter(
        (it) => it.id !== payload.id
      );
      return {
        ...state,
        listProduct: newListProduct,
        isLoading: false,
      };
    }
    // login
    case LOGIN: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    }
    case LOGIN_FALSE: {
      return {
        ...state,
        isLoading: false,
        toast: {
          content: payload,
          type: "error",
        },
      };
    }
    // sign in
    case CREATE_USER: {
      return { ...state, isLoading: true };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: payload,
        toast: {
          content: `hello ${payload.name || payload.account}`,
          type: "success",
        },
      };
    }
    case CREATE_USER_FALSE: {
      return {
        ...state,
        isLoading: false,
        toast: {
          content: payload,
          type: "error",
        },
      };
    }
    // logout
    case LOGOUT: {
      return { ...state, isLoading: true };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: payload,
        isLoading: false,
        cart: [],
      };
    }
    // get cart
    case GET_CART: {
      return { ...state };
    }
    case GET_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
      };
    }
    // create cart
    case CREATE_CART: {
      return { ...state, isLoading: true };
    }
    case CREATE_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
        isLoading: false,
        toast: {
          content: "thêm sản phẩm thành công",
          type: "success",
        },
      };
    }
    // update cart
    case UPDATE_CART: {
      return { ...state, isLoading: true };
    }
    case UPDATE_CART_SUCCESS: {
      return {
        ...state,
        cart: [...payload],
        isLoading: false,
      };
    }
    // delete cart
    case DELETE_CART: {
      return { ...state, isLoading: true };
    }
    case DELETE_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
        isLoading: false,
        toast: {
          content: "xóa sản phẩm thành công",
          type: "success",
        },
      };
    }
    case DELETE_CART_FALSE: {
      return {
        ...state,
        cart: payload,
        isLoading: false,
        toast: {
          content: "xóa sản phẩm thất bại",
          type: "error",
        },
      };
    }
    // add order
    case ADD_ORDER: {
      return { ...state, isLoading: true };
    }
    case ADD_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: payload,
      };
    }
    case ADD_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        order: payload,
      };
    }
    // get order
    case GET_DATA_ORDER: {
      return { ...state };
    }
    case GET_DATA_ORDER_SUCCESS: {
      return {
        ...state,
        order: payload,
      };
    }
    case GET_DATA_ORDER_FAILED: {
      return {
        ...state,
        order: payload,
      };
    }
    // update order
    case UPDATE_ORDER: {
      return { ...state, isLoading: true };
    }
    case UPDATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: [...payload],
        isLoading: false,
      };
    }
    case UPDATE_ORDER_FAILED: {
      return {
        ...state,
        order: [...payload],
        isLoading: false,
      };
    }
    // delete order
    case DELETE_ORDER: {
      return { ...state, isLoading: true };
    }
    case DELETE_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: payload,
      };
    }
    case DELETE_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        order: payload,
      };
    }
    // get user
    case GET_USER: {
      return {
        ...state,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        listUser: payload,
      };
    }
    // update user
    case UPDATE_USER: {
      return { ...state, isLoading: true };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    }
    case UPDATE_USER_FALSE: {
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default reducerAdmin;
