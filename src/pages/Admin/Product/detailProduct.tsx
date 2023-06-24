import { useParams } from "react-router-dom";
import EditProduct from "./editProduct";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionUpdateProduct } from "../../saga/action";
interface Action {
  type: string;
  payload: any;
}
function DetailProduct() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const submitBtn = ({
    option,
    id,
  }: {
    option: {
      productName: string;
      nsx: string;
      price: number;
      sale: number;
      percentSale: number;
      description: string;
      productID: string;
      count: {
        id: string;
        color: string;
        count: number;
        remaining: number;
        imgURL: string;
        codeColor: string;
      }[];
    };
    id: string;
  }) => {
    dispatch<Action>(actionUpdateProduct({ option, id }));
  };
  return (
    <div className="p-4">
      <Link
        className="py-1 px-2 capitalize rounded-lg bg-amber-500 text-white font-semibold"
        to="/admin/product"
      >
        quay lại
      </Link>
      <EditProduct
        handleToggleCreate={() => {}}
        title={"chi tiết sản phẩm"}
        contentBtn={"cập nhật sản phẩm "}
        submitBtn={submitBtn}
        id={productID || "1"}
      />
    </div>
  );
}

export default DetailProduct;
