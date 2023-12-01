import { useEffect, useState } from "react";
import ProductItems from "../product/ProductItems";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [allProduct, setAllProduct] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/upload");
  };

  useEffect(() => {
    axios
      .get("/product/getAllProduct")
      .then((res) => setAllProduct(res.data.allProducts))
      .catch((error) => console.log("Can't access to products", error));
  }, []);
  return (
    <div className="flex flex-col m-6 gap-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold">Product list</h1>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full p-5"
          onClick={handleNavigate}
        >
          Store
        </button>
      </div>
      <div className=" gap-3 justify-center flex items-center">
        <div className="grid grid-cols-5 gap-10 ">
          {allProduct.map((el) => (
            <ProductItems key={el.id} productInfo={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
