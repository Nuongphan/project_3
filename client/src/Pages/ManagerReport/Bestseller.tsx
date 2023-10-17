import { useEffect, useState } from "react";
import { IProduct } from "../../redux/Type";
import axios from "axios";

export const Bestseller = () => {
  const [productList, setProductList] = useState<any>();
  useEffect(() => {
    axios
      .get("http://localhost:8080/proucts")
      .then((response) => setProductList(response.data));
  }, []);
  const bestsellerProduct = productList?.filter(
    (product: any) => product.bestsellers > 30
  );
  return (
    <>
      <div
        className="relative overflow-x-auto "
        style={{
          margin: "10px 33px 20px 7px",
          borderRadius: "4px",
          boxShadow: "0px 2px #ccc",
          backgroundColor: "#FFFFFF",
        }}
      >
        <p
          style={{
            margin: "15px 0 20px 20px ",
            letterSpacing: "1px",
            fontWeight: "bolder",
            borderBottom: "3px solid #ffd43b",
            paddingBottom: "5px",
            fontSize: "large",
          }}
        >
          {" "}
          SẢN PHẨM BÁN CHẠY
        </p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Tình trạng
              </th>
            </tr>
          </thead>
          <tbody>
            {bestsellerProduct?.map((product: any) => (
              <tr
                key={product?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product?.id}
                </th>
                <td className="px-6 py-4"> {product?.name}</td>
                <td className="px-6 py-4">{product?.price}</td>
                <td className="px-6 py-4">
                  {product?.status == true ? "Stock" : "Instock"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
