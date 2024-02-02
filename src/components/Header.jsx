import React, { useEffect, useState } from "react";
import {
    FiMenu,
    FiX,
    FiUser,
} from "react-icons/fi";
import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate()

    const BASE_URL = process.env.BASE_URL

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (searchQuery.trim() !== "") {
                    const response = await axios.get(`${BASE_URL}/api/product/all?query=${searchQuery}`);
                    const data = await response.data.body;
                    setSuggestions(data);
                } else {
                    setSuggestions([]); // Clear suggestions if searchQuery is empty
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchSuggestions();
    }, [searchQuery]);

    const handleDocumentClick = (e) => {
        if (!e.target.closest(".search-container")) {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setSuggestions([]);
        setSearchQuery(product.title);

        navigate(`/product/${product._id}`)
    };
    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 right-0 left-0 z-10 bg-[#FCF4EC] text-[#493A12] border border-[#D2D1D0]`}>
                <div className="flex justify-between items-center h-16 px-4 lg:px-8">
                    {/* Hamburger Menu (for small devices) */}
                    <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </div>

                    <div className="flex items-center gap-2">
                        <img
                            src={"logo"}
                            alt="IExpert"
                            className={`h-10 w-10 rounded-full mr-2 cursor-pointer ${isOpen ? "lg:hidden" : ""
                                }`}
                        />
                        <p
                            className={`hidden font-bold text-3xl lg:block cursor-pointer ${isOpen ? "hidden" : ""
                                }`}
                        >
                            TheStore
                        </p>
                    </div>

                    {/* Navigation Links (Hidden on small devices) */}
                    <ul className={`hidden lg:flex space-x-8 ${isOpen ? "hidden" : ""}`}>
                        <li className="py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold transition duration-300">
                            <Link to="/" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold">
                            <Link to="/properties" onClick={closeMenu}>
                                Properties
                            </Link>
                        </li>
                        <li className="py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold">
                            <Link to="/interior-designers" onClick={closeMenu}>
                                Interior Designers
                            </Link>
                        </li>
                    </ul>

                    <div
                        className={`hidden lg:flex items-center space-x-4 gap-5 ${isOpen ? "hidden" : ""
                            }`}
                    >
                        {/* Search bar on the right */}
                        <div className="lg:block relative max-w-xs">
                            <p className="pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none">
                                <span className="justify-center items-center flex">
                                    <span className="justify-center items-center flex">
                                        <span className="items-center justify-center flex">
                                            <FaSearch className="text-gray-400" />
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <input
                                placeholder="Type to search"
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="border outline-none border-gray-300 text-black focus:ring-indigo-600
                focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2"
                            />
                            {/* Display search suggestions */}
                            {suggestions.products && suggestions.products.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul>
                                        {suggestions.products.map((product) => (
                                            <li key={product._id} onClick={() => handleSelectProduct(product)} className="border-b border-gray-100  pl-2">

                                                {product.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <Link to="/login">
                            <FiUser
                                size={24}
                                className="cursor-pointer hover:text-[#AC8042] transition duration-300"
                            />
                        </Link>
                    </div>
                </div>

                {/* Overlay Navbar (for small devices) */}
                {isOpen && (
                    <nav className="fixed top-0 right-0 left-0 w-full h-full bg-[#FCF4EC] text-[] z-20">
                        {/* Close Icon */}
                        <div className="flex h-16 px-4 lg:hidden">
                            <div className="cursor-pointer" onClick={toggleMenu}>
                                <FiX size={24} />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <ul className="flex flex-col justify-center items-center space-y-6 mt-16">
                            <li className={`py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold `} >
                                <Link to="/" onClick={closeMenu} >
                                    Home
                                </Link>
                            </li>
                            <li className="py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold">
                                <Link to="/properties" onClick={closeMenu}>
                                    Properties
                                </Link>
                            </li>
                            <li className="py-4 px-2 hover:text-[#AC8042] cursor-pointer font-bold">
                                <Link to="/interior-designers" onClick={closeMenu}>
                                    Interior Designers
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}

                {/* Backdrop (for small devices) */}
                {isOpen && (
                    <div
                        className="fixed top-0 right-0 left-0 w-full h-full bg-[#FCF4EC] opacity-50 z-10"
                        onClick={toggleMenu}
                    ></div>
                )}
            </nav>
        </>
    );
};

export default Header;
