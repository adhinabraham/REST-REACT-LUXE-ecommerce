import React from 'react'
import Navbar from "../adminnavbar/Navbar";
import Navigation from "../verticalNavigation/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function Offercategory() {
    const [offercategory, setoffercategory] = useState([]);
    

     const orderdata = () => {
       axios
         .get("http://127.0.0.1:8000/product/categoryoffer/")
         .then((Response) => {
           console.log("this is then");
           console.log(Response.data);
           setoffercategory(Response.data);
         })
         .catch((error) => {
           console.log("this is catch");
           console.log(console.log(error.data));
         });
     };
    useEffect(() => {
      orderdata()
    }, [])
    

    const canceloffer = (id) => {
      console.log(id);
      const data = { id: id };
      axios
        .patch("http://127.0.0.1:8000/product/categoryoffer/", data)
        .then((Response) => {
          console.log("offer is cancled");
          orderdata();
        });
    };
  return (
    <div>
      <>
        <Navbar></Navbar>
        <div className="flex">
          <Navigation></Navigation>
          <div className="sm:px-6 w-full">
            <div className="px-4 md:px-10 py-4 md:py-7">
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Category Offermanagement
                </p>
              </div>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="sm:flex items-center justify-between"></div>

              {offercategory.map((obj, index) => {
                return (
                  <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <tr className="h-16 border border-gray-100 rounded">
                        <th>
                          <div className="ml-5">
                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative"></div>
                          </div>
                        </th>
                        <td className>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {obj.category_name}
                            </p>
                          </div>
                        </td>
                        <td className="pl-24"></td>
                        <td className="pl-5"></td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {obj.offerstatus}
                            </p>
                          </div>
                        </td>

                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {obj.description}
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
                            <button
                              className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                              onClick={() => {
                                canceloffer(obj.id);
                              }}
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
    </div>
  );
}

export default Offercategory