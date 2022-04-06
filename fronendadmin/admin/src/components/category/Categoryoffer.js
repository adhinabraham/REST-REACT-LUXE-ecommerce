import React from 'react'
import React from "react";
import Navigation from "../verticalNavigation/Navigation";
import Navbar from "../adminnavbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categoryoffer() {
     const [productname, setproductname] = useState("");
     const [price, setprice] = useState(0);
     const [offername, setoffername] = useState("");
    const [productlist, setproductlist] = useState([]);
    const[addcategory,setaddcategory]=useState([])
    
     useEffect(() => {
       axios
         .get("http://127.0.0.1:8000/newadmin/category/")
         .then((Response) => {
           console.log("this is useEffect");
           console.log(Response.data);
           setaddcategory(Response.data);
         });
     }, []);
  

  return (
    <div>
      <>
        <div>
          <div>
            <Navbar></Navbar>
            <div className="flex mt-12">
              <Navigation></Navigation>
              <div className="">
                <div
                  className="py-12 mt-20 ml-40 w-5/6 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                  id="modal"
                >
                  <div
                    role="alert"
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                  >
                    <div className>
                      <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                        Product offer{" "}
                      </h1>
                      <label
                        htmlFor="name"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                      >
                        Product Name
                      </label>
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        placeholder="Add name"
                        onChange={(e) => {
                          setproductname(e.target.value);
                        }}
                      >
                        {/* <option>Tshirt</option>
                    <option>Formals</option>
                    <option>Shirts</option>
                    <option>Pants</option> */}
                        {addcategory.map((obj) => {
                          return <option>{obj.productname}</option>;
                        })}
                      </select>
                      <label
                        htmlFor="name"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                      >
                        offerpercentage
                      </label>
                      <input
                        id="name"
                        type="number"
                        className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        onChange={(e) => {
                          setprice(e.target.value);
                        }}
                      ></input>

                      <label
                        htmlFor="cvc"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                      >
                        Category offer name
                      </label>
                      <div className="relative mb-5 mt-2">
                        <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-info-circle"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={12} r={9} />
                            <line x1={12} y1={8} x2="12.01" y2={8} />
                            <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                        </div>
                        <input
                          id="cvc"
                          type="text"
                          className="mb-8 h-28 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  flex items-center pl-3 text-sm border-gray-300 rounded border"
                          placeholder=""
                          onChange={(e) => {
                            setoffername(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-start w-full">
                        <button
                          className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                         
                        >
                          Submit
                        </button>
                        <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Categoryoffer