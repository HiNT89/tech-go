import { Link } from "react-router-dom";

type ResultSearchItemProps = {
  data: {
    productName: string;
    price: string;
    sale: string;
    productIMG: {
      id : number,
      name : string,
      imgURL : string,
    }[]
  };
};
const ResultSearchItem = ({ data }: ResultSearchItemProps) => {
  const { productName, price, sale, productIMG } = data;
  return (
    <Link to = "" className="w-full flex justify-between py-3 items-center">
      <div className="w-2/3">
        <span className="text-sm mt-2 mb-1 inline-block text-neutral-500">
          {productName}
        </span>
        <div>
          <span className="text-xs">
            {(+price).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          {sale ? (
            <del className="ml-4 text-xs">
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
        <img src={productIMG[0].imgURL} className="w-full" />
      </div>
    </Link>
  );
};

export default ResultSearchItem;
