import { Link } from "react-router-dom";

type ResultSearchItemProps = {
  data: {
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
  };
};
const ResultSearchItem = ({ data }: ResultSearchItemProps) => {
  const { productName, price, sale, count, id } = data;
  return (
    <Link
      to={`/detail-product/${id}`}
      className="w-full flex justify-between py-3 items-center"
    >
      <div className="w-2/3">
        <span className="text-sm mt-2 mb-1 inline-block text-black font-semibold">
          {productName}
        </span>
        <div>
          <span className="text-base font-semibold  text-red-600">
            {(+price).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          {sale ? (
            <del className="ml-4 text-xs text-gray-500 ">
              {(+sale).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </del>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-10">
        <img src={count[0].imgURL} className="w-full" />
      </div>
    </Link>
  );
};

export default ResultSearchItem;
