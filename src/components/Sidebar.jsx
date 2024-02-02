// Sidebar.js

import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import axios from "axios";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [countries, setCountries] = useState("");
    const [priceRangeFrom, setPriceRangeFrom] = useState(0);
    const [priceRangeTo, setPriceRangeTo] = useState(1000);
    const [location, setLocation] = useState("");


    const BASE_URL = process.env.BASE_URL

    useEffect(() => {
        const fetchCountries = async () => {
            const countries = await axios.get(`${BASE_URL}/countries`)
            console.log({ countries })
            const data = await countries.data
            setCountries(data)
        }
        fetchCountries();
    }, [])

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };


    const handlePriceRangeFromChange = (newValue) => {
        setPriceRangeFrom(newValue);
    };

    const handlePriceRangeToChange = (newValue) => {
        setPriceRangeTo(newValue);
    };
    const applyFilters = () => {

    }
    return (
        <div >
            <div onClick={openMenu} className="border border-[#493A12] fixed top-[6rem] right-[4rem] p-3 rounded bg-[#FFEBD6] text-[#493A12] cursor-pointer">
                <TbLayoutSidebarRightCollapse size={24} />
            </div>
            <div className={`fixed top-[4rem] right-0 h-full w-[20rem] bg-[#FCF4EC] border border-gray-300 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>


                {/* Close Icon */}
                <div className="flex justify-end p-4 cursor-pointer" onClick={closeMenu}>
                    <FiX size={24} />
                </div>

                {/* Location Dropdown */}
                <div className="p-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <select
                        id="location"
                        name="location"
                        onChange={handleLocationChange}
                        value={location}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {countries && countries.body.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range Selection */}
                <div className="p-4 flex flex-col gap-2  justify-between align-middle">
                    <div>
                        <label htmlFor="priceRange" className="font-bold text-[#C78F28]">
                            Select Price Range:
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-[45%]">
                            <label htmlFor="priceFrom" className="mb-2">From: <span id="priceValue">{priceRangeFrom}</span></label>
                            <Slider
                                min={0}
                                max={99999}
                                step={100}
                                value={priceRangeFrom}
                                onChange={handlePriceRangeFromChange}
                                trackStyle={{ backgroundColor: "#0075FF", height: "8px" }}
                                railStyle={{ backgroundColor: "#E5E5E5", height: "8px" }}
                                handleStyle={{
                                    width: "16px",
                                    height: "16px",
                                    marginTop: "-4px",
                                    backgroundColor: "#0075FF",
                                    borderRadius: "50%",
                                    opacity: 1,
                                    outline: "none",
                                    border: "none"
                                }}

                            />
                        </div>
                        <div className="w-[45%]">
                            <label htmlFor="priceTo" className="mb-2">To: <span id="priceToValue">{priceRangeTo}</span></label>
                            <Slider
                                min={5000}
                                max={1000000}
                                step={10}
                                value={priceRangeTo}
                                onChange={handlePriceRangeToChange}
                                trackStyle={{ backgroundColor: "#0075FF", height: "8px" }}
                                railStyle={{ backgroundColor: "#E5E5E5", height: "8px" }}
                                handleStyle={{
                                    width: "16px",
                                    height: "16px",
                                    marginTop: "-4px",
                                    backgroundColor: "#0075FF",
                                    borderRadius: "50%",
                                    opacity: 1,
                                    outline: "none",
                                    border: "none"
                                }}

                            />
                        </div>
                    </div>
                </div>

                {/* Apply filters button */}
                <div className="mt-[2rem] px-5">
                    <div className="border-solid border-2 border-[#493A12] rounded-lg py-2 flex justify-center align-middle bg-[#FFEBD6] ">
                        <button className="font-semibold text-[#493A12] "
                            onClick={applyFilters}
                        >Apply</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Sidebar;
