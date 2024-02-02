import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const BASE_URL = process.env.BASE_URL
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/product/all`
        );
        const {products} =await response.data.body;
        if(Array.isArray(products)){
          const selectedProd=  products.find((product)=>product._id===productId)
          if(selectedProd){
            setSelectedProduct(selectedProd)
            console.log({selectedProd})
          }
          else{
            console.log("Product not found.")
          }
        }else{
          console.log("Products is not an array")
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);
  return (
    <div className="mt-[5rem]">
    <div className="mt-5">
      <h1 className="text-2xl font-semibold mb-3">Product Details</h1>
      {selectedProduct && (
        <div className=" p-4 rounded-md shadow-md w-[250px] bg-[#FCF4EC]">
          <img
            src={`${BASE_URL}${selectedProduct.gallery.images[0]}`}
            alt={selectedProduct.title}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
          <p className="text-gray-600 mb-4">Detail: {selectedProduct.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-indigo-700">
             Price: ${selectedProduct.price}
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
