import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { country, state } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [showFilteredProducts, setShowFilteredProducts] = useState(true);
  const [productFounds, setProductFounds] = useState(false)


  const BASE_URL = "http://192.168.1.21:8008"
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/product/all`
        );
        const { products } = await response.data.body;
        if (Array.isArray(products)) {
          const selectedProd = products.find((product) => product._id === productId)
          if (selectedProd) {
            setSelectedProduct(selectedProd)
            setShowFilteredProducts(false);

            console.log({ selectedProd })
          }
          else {
            console.log("Product not found.")
          }
        } else {
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

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = [];
      if (country) queryParams.push(`country=${country}`);
      if (state) queryParams.push(`state=${state}`);
      const queryString = queryParams.join('&');

      console.log({ queryString })

      try {
        const response = await axios.get(`${BASE_URL}/api/product/all?${queryString}`);
        console.log("product response:", { response })
        const filtersData = response.data.body

        console.log({ filtersData })
        if (filtersData.products.length === 0) {
          setProductFounds(false)
        } else {
          setProductFounds(true)
        }
        setFilteredData(filtersData)
        setProducts(response.data);
        setShowFilteredProducts(true);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [country, state]);

  console.log("Filtered Data:", filteredData)
  return (
    <div className="mt-[5rem] px-4">
      <div className="mt-5">
        <h1 className="text-2xl font-semibold mb-3 pt-5">Product Details</h1>
        {!productFounds && (
          <p className="text-red-500 ">No products found for the given filters.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-[5rem] sm:px-0 pt-[2rem] ">
          {showFilteredProducts && filteredData.products && filteredData.products.map((product) => (
            <div key={product._id} className="p-4 rounded-md shadow-md bg-[#FCF4EC] mb-4 w-[300px] mx-auto">
              <img
                src={`${BASE_URL}${product.gallery.images[0]}`}
                alt={product.title}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">
                Detail: {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
              </p>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-lg font-bold text-indigo-700">
                    Price: ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && !showFilteredProducts && (
          <div className="p-4 rounded-md shadow-md bg-[#FCF4EC] w-[300px] mx-auto">
            <img
              src={`${BASE_URL}${selectedProduct.gallery.images[0]}`}
              alt={selectedProduct.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-gray-600 mb-4">
            Detail: {selectedProduct.description.length > 80 ? `${selectedProduct.description.substring(0, 80)}...` : selectedProduct.description}
              
              </p>
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-lg font-bold text-indigo-700">
                  Price: ${selectedProduct.price}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;