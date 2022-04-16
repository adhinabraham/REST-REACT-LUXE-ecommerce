import React from "react";
import Navbar from "../adminnavbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../verticalNavigation/Navigation";
import validator from "@brocode/simple-react-form-validation-helper";

function Coupon() {
  const [error, seterror] = useState(false);
  const [minimumrate, setminimumrate] = useState();
   const [minimumrateerror, setminimumrateerror] = useState("");
  const [couponcode, setcouponcode] = useState("");
  const [errorcoupon, seterrorcoupon] = useState("");
  const [percentage, setpercentage] = useState();
   const [percentageerror, setpercentageerror] = useState("");
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


  const allcoupon = () => {
     axios.get("http://127.0.0.1:8000/newadmin/allcoupon/").then((Response) => {
       setcoupondetails(Response.data);
       console.log(Response.data);
     });
    
  }

  const deletecoupon = (id) => {
    
    console.log(id)
     const data={"id":id}
    axios
      .post("http://127.0.0.1:8000/newadmin/coupondelete/", data)
      .then((response) => {
        console.log(response.data);
        allcoupon()
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const action = (e) => {
     if (
       minimumrate == "" || couponcode == "" || date == ""
     ) {
       console.log("this isnull");
       seterror(true);
       e.preventDefault();
       return;
     }
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
        <div className="xl:w-10/12 mt-[-400px] w-full px-8">
          <div className="bg-gray-100 py-12 flex flex-wrap items-center justify-center"></div>
          <div className="xl:px-24">
            <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
              <div className="w-80">
                <div className="flex items-center">
                  <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Luxe coupon generation , you can add coupon to users
                  </h1>
                </div>
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
                        validator.percentageInputBlurHandler(
                          e.target.value,
                          setminimumrateerror
                        );
                        seterror(false);
                      }}
                    />
                    <span className="text-red-500 fs-6">
                      {minimumrateerror}
                    </span>
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
                        validator.nameInputBlurHandler(
                          e.target.value,
                          seterrorcoupon
                        );
                        seterror(false);
                      }}
                    />
                    <span className="text-red-500 fs-6">{errorcoupon}</span>
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
                        validator.percentageInputBlurHandler(
                          e.target.value,
                          setpercentageerror
                        );
                        seterror(false);
                      }}
                    />
                    <span className="text-red-500 fs-6">{percentageerror}</span>
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
                        seterror(false);
                      }}
                    />
                    {error ? (
                      <p className="text-red-400 "> please fill the date field </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <button
                  className=" mt-5 ml-24 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={action}
                >
                  Generate coupon
                </button>
                {error ? (
                  <p className="text-red-400 ml-24"> plse fill the from </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className=" mt-[-400px] xl:w-10/12 ml-[350px]  px-4">
          <div className="rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Coupon available
              </p>
            </div>
            <div className="py-20">
              <div className="mx-auto  container bg-white dark:bg-gray-800 shadow rounded">
                <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                  <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center"></div>
                  <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end"></div>
                </div>
                <div className="w-full mt-[-40px] overflow-x-scroll xl:overflow-x-hidden">
                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                      <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          Coupon Name
                        </th>
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          Expired Date
                        </th>
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          Minimum Rate
                        </th>
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          percentage
                        </th>

                        <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">
                          Delete coupon
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {coupondetails.map((obj) => {
                        return (
                          <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              {obj.coupon_code}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              {obj.expiry_date}
                            </td>
                            <td className="pr-6 whitespace-no-wrap">
                              <div className="flex items-center">
                                <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                                  {obj.min_rate}
                                </p>
                              </div>
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              {obj.percentage}%
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              <button
                                className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => {
                                  deletecoupon(obj.id);
                                }}
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <div className="bg-white mt-6 dark:bg-gray-800 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 sm:px-10 shadow rounded-t">
        <div className="flex items-center mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
          <div className="ml-2">
            <h1 className="text-xl dark:text-gray-100 text-red-700 font-bold">
              List of User and Coupon applyed
            </h1>
          </div>
        </div>
      </div> */}
      {/* <>
        <div className=" mt-[-40px] px-4">
          <div className="rounded-lg border pb-6 border-gray-200">
            <div className="py-20">
              <div className="mx-auto  container bg-white dark:bg-gray-800 shadow rounded">
                <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                  <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center"></div>
                  <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end"></div>
                </div>
                <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                      <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          Coupon Name
                        </th>
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          username
                        </th>
                        <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                          status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userdetails.map((obj) => {
                        return (
                          <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              {obj.couponname}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                              {obj.username}
                            </td>
                            <td className="pr-6 whitespace-no-wrap">
                              <div className="flex items-center">
                                <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                                  {obj.status}
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
          </div>
        </div>
      </> */}
    </div>
  );
}

export default Coupon;
