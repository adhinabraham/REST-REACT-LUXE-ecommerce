import React from 'react'
import Navbar from '../adminnavbar/Navbar';
import Navigation from '../verticalNavigation/Navigation';
import { useState, useEffect } from "react";
import axios from "axios";


function Offerproducts() {
    const [offerproducts, setofferproducts] = useState([]);
    
    const orderdata = () => {
      axios
        .get("http://127.0.0.1:8000/product/productoffer/")
        .then((Response) => {
          console.log("this is then");
          console.log(Response.data);
          setofferproducts(Response.data);
        })
        .catch((error) => {
          console.log("this is catch");
          console.log(console.log(error.data));
        });
    };

    const canceloffer = (id) => {
        console.log(id)
         const data= {"id":id}
        axios.post("http://127.0.0.1:8000/product/productoffer/", data).then((Response) => {
            console.log("offer is cancled")
            orderdata()
        })
        
   }

    useEffect(() => {
      orderdata();
    }, []);



    return (
      <>
        <Navbar></Navbar>
        <div className="flex">
          <Navigation></Navigation>
          <div className="sm:px-6 w-full">
            <div className="px-4 md:px-10 py-4 md:py-7">
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Offermanagement
                </p>
                {/* <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select className="focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>
                            <option className="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div> */}
              </div>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="sm:flex items-center justify-between">
                {/* <div className="flex items-center">
                        <a href="javascript:void(0)">
                            <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                <p>Done</p>
                            </div>
                        </a>
                        <a href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                <p>Pending</p>
                            </div>
                        </a>
                    </div> */}
                {/* <button onclick="popuphandler(true)" className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white">Add Task</p>
                    </button> */}
              </div>

              {offerproducts.map((obj, index) => {
                return (
                  <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <tr className="h-16 border border-gray-100 rounded">
                        <th>
                          <div className="ml-5">
                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                              {/* <input
                          type="checkbox"
                          className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
                        /> */}
                              {/* <div className="check-icon  bg-indigo-700 text-white rounded-sm">
                          <svg
                            className="icon icon-tabler icon-tabler-check"
                            xmlns="http://www.w3.org/2000/svg"
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
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </div> */}
                            </div>
                          </div>
                        </th>
                        <td className>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {obj.offer_name}
                            </p>
                            {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                          stroke="#3B82F6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                          stroke="#3B82F6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> */}
                          </div>
                        </td>
                        <td className="pl-24"></td>
                        <td className="pl-5">
                          {/* <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7.5 5H16.6667"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 10H16.6667"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 15H16.6667"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16669 5V5.00667"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16669 10V10.0067"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16669 15V15.0067"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        userid
                      </p>
                    </div> */}
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 9.1665V9.17484"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66669 9.1665V9.17484"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3333 9.1665V9.17484"
                          stroke="#52525B"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> */}
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {obj.productname}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              offerprice -Rs {obj.price}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-red-400 ml-2">
                              actualprice -Rs {obj.price2}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {obj.date}
                            </p>
                          </div>
                        </td>

                        {/* <td className="pl-4 bg-slate-50">
                          <select
                            name="status"
                            id="status"
                            value={value}
                            onChange={(e) => {
                              orderstatuschanged(
                                obj.product,
                                obj.order_number,
                                e.target.value
                              );
                            }}
                          >
                            <option className="bg-slate-50" value="placed">
                              ChangeStatus
                            </option>
                            <option value="conformed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="Develiverd">Delivered</option>
                          </select>
                        </td> */}
                        <td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                        <button className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        onClick={()=>{canceloffer(obj.id)}}
                                        >
                             cancel offer
                            </button>
                          </td>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
          <style>
            {` .checkbox:checked + .check-icon {
        display: flex;
    }`}
          </style>
        </div>
      </>
    );
}

export default Offerproducts