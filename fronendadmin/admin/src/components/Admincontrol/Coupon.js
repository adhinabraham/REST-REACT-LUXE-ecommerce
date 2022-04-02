import React from "react";
import Navbar from "../adminnavbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../verticalNavigation/Navigation";

function Coupon() {
  const [minimumrate, setminimumrate] = useState();
  const [couponcode, setcouponcode] = useState("");
  const [percentage, setpercentage] = useState();
  const [date, setdate] = useState("");
  const [userdetails, setUserdetails] = useState([]);
  const [coupondetails, setcoupondetails] = useState([]);

  console.log(date);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/cart/couponcheck/").then((Response) => {
      setUserdetails(Response.data);
      console.log(Response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/newadmin/allcoupon/").then((Response) => {
      setcoupondetails(Response.data);
      console.log(Response.data);
    });
  }, []);

  const action = () => {
    const data = {
      min_rate: minimumrate,
      coupon_code: couponcode,
      percentage: percentage,
      expiry_date: date,
      description: "coupone genreation",
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/newadmin/coupongenerate", data)
      .then((Response) => {
        console.log(Response.data);
        console.log("this is then ");
      })
      .catch((error) => {
        console.log("this is an error");
      });
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <Navigation />
        <div className="xl:w-10/12 w-full px-8">
          <div className="bg-gray-100 py-12 flex flex-wrap items-center justify-center"></div>
          <div className="xl:px-24">
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Generate your coupon
                  </h1>
                </div>
                <button
                  className=" mt-24 ml-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={action}
                >
                  Generate coupon
                </button>
              </div>
              <div>
                <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="firstName"
                    >
                      mininum rate
                    </label>
                    <input
                      type="number"
                      tabindex="0"
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="firstName"
                      placeholder="100"
                      value={minimumrate}
                      onChange={(e) => {
                        setminimumrate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="lastName"
                    >
                      coupon_code
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="lastName"
                      placeholder="Doe"
                      value={couponcode}
                      onChange={(e) => {
                        setcouponcode(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="md:flex items-center lg:ml-24 mt-8">
                  <div className="md:w-64">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="emailAddress"
                    >
                      percentage
                    </label>
                    <input
                      type="number"
                      tabindex="0"
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="emailAddress"
                      value={percentage}
                      onChange={(e) => {
                        setpercentage(e.target.value);
                      }}
                    />
                  </div>
                  <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      className="text-sm leading-none text-gray-800"
                      id="phone"
                    >
                      expiray date
                    </label>
                    <input
                      type="text"
                      tabindex="0"
                      className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="phone"
                      placeholder="123-1234567"
                      value={date}
                      onChange={(e) => {
                        setdate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className=" px-4">
          <div className="rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Coupon available
              </p>
              <div className="flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100">
                <p className="text-xs md:text-sm leading-none text-gray-600">
                  Filter by: Latest
                </p>
              </div>
            </div>
            <div className="px-6 pt-6 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody className="mt-2">
                  {coupondetails.map((obj, index) => {
                    return (
                      <tr className="mt-4">
                        <td>
                          <div className="flex items-center">
                            <div className="pl-3">
                              <div className="flex items-center text-sm leading-none">
                                <p className="font-semibold text-gray-800">
                                  couponCode: <span className="text-rose-600"> {obj.coupon_code}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="pl-16">
                          <div>
                            <p className="text-sm font-semibold leading-none text-right text-gray-800">
                              description:
                              <span className="text-amber-600">
                                {obj.description}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="pl-16">
                          <div>
                            <p className="text-sm font-semibold leading-none text-right text-gray-800">
                              precentage: {obj.percentage}%
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      <div className="bg-white mt-6 dark:bg-gray-800 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 sm:px-10 shadow rounded-t">
        <div className="flex items-center mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
          <div className="ml-2">
            <h1 className="text-xl dark:text-gray-100 text-red-700 font-bold">
              List of User and Coupon applyed
            </h1>
          </div>
        </div>
      </div>
      <>
        {userdetails.map((obj, index) => {
          return (
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "></div>
              <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      {index + 1}
                    </h3>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <h1 className="text-basexl:text-lg leading-6">
                      couponName:
                      <span className=" text-orange-500 ">
                        {obj.couponname}
                      </span>
                    </h1>
                    <p className="text-base xl:text-lg leading-6">
                      status:{" "}
                      <span className=" text-orange-500 ">{obj.status}</span>
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      user :{" "}
                      <span className=" text-orange-500 ">{obj.username}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default Coupon;
