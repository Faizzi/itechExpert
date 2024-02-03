import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import axios from "axios";

const Home = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { country, state } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [showFilteredProducts, setShowFilteredProducts] = useState(true);
  const [productFounds, setProductFounds] = useState(false)
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [favorites, setFavorites] = useState([])

  const BASE_URL = "http://192.168.1.21:8008"
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/product/all`
        );
        const { products } = await response.data.body;
        console.log({ products })
        if (Array.isArray(products)) {
          const selectedProd = products.find((product) => product._id === productId)
          if (selectedProd) {
            setSelectedProduct(selectedProd)
            setShowFilteredProducts(false);

            // console.log({ selectedProd })
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


      try {
        const response = await axios.get(`${BASE_URL}/api/product/all?${queryString}`);
        console.log("product response:", { response })
        const filtersData = response.data.body

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

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };


  const handleFavorite = (productId) => {
    // Check if the product is already in favorites
    const isFavorite = favorites.includes(productId);

    // If it's a favorite, remove it; otherwise, add it to favorites
    setFavorites((prevFavorites) =>
      isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };
  return (
    <div className="mt-[5rem] px-4 ">
      <div className="mt-5">
        <div className="pl-[7rem]">
          <h1 className="text-2xl font-semibold mb-3 pt-5">Products</h1>
          {!productFounds && (
            <p className="text-red-500 ">No products found for the given filters.</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-[5rem] sm:px-0 pt-[2rem] ">
          {showFilteredProducts && filteredData.products && filteredData.products.map((product) => (
            <div
              key={product._id}
              className="rounded-md shadow-md bg-[#FCF4EC] mb-4 w-[300px] mx-auto"
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <div className="relative">
                  <img
                    src={`${BASE_URL}${product.gallery.images[0]}`}
                    alt={product.title}
                    className="w-full h-40 object-cover mb-4 rounded-md]"
                  />
                  <div
                    className={`absolute top-1 right-1 border border-[#493A12] p-2 bg-[#FFEBD6] rounded-[50%] cursor-pointer ${hoveredProductId === product._id ? 'visible' : 'hidden'
                      }`}
                  >
                    {favorites.includes(product._id) ? (
                      <FaHeart
                        onClick={() => handleFavorite(product._id)}
                        className="text-[#493A12]"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => handleFavorite(product._id)}
                        className="text-black"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-1 px-4 pb-3">
                <h2 className="text-xl font-bold mb-2 text-center">{product.title}</h2>
                <div>
                  <p className="text-gray-600 mb-4 text-center h-[80px]">
                    {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
                  </p>
                  <hr />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between align-middle">
                    <p className="text-sm font-bold text-[#493A12] ">
                      {product.price}$
                    </p>
                    <p className="text-sm font-bold text-[#493A12] ">
                      stock: {product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && !showFilteredProducts && (
          <div
            className="rounded-md shadow-md bg-[#FCF4EC] mb-4 w-[300px] mx-auto"
            onMouseEnter={() => handleMouseEnter(selectedProduct._id)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="relative">
                <img
                  src={`${BASE_URL}${selectedProduct.gallery.images[0]}`}
                  alt={selectedProduct.title}
                  className="w-full h-40 object-cover mb-4 rounded-md]"
                />
                <div
                  className={`absolute top-1 right-1 border border-[#493A12] p-2 bg-[#FFEBD6] rounded-[50%] cursor-pointer ${hoveredProductId === selectedProduct._id ? 'visible' : 'hidden'
                    }`}
                >
                  {favorites.includes(selectedProduct._id) ? (
                    <FaHeart
                      onClick={() => handleFavorite(selectedProduct._id)}
                      className="text-[#493A12]"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => handleFavorite(selectedProduct._id)}
                      className="text-black"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="pt-1 px-4 pb-3">
              <h2 className="text-xl font-bold mb-2 text-center">{selectedProduct.title}</h2>
              <div>
                <p className="text-gray-600 mb-4 text-center h-[80px]">
                  {selectedProduct.description.length > 80 ? `${selectedProduct.description.substring(0, 80)}...` : selectedProduct.description}
                </p>
                <hr />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between align-middle">
                  <p className="text-sm font-bold text-[#493A12] ">
                    {selectedProduct.price}$
                  </p>
                  <p className="text-sm font-bold text-[#493A12] ">
                    stock: {selectedProduct.quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;