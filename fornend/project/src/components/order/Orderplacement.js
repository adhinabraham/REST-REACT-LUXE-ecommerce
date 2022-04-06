import React from "react";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Paypal from "./Paypal";
import { Link, useNavigate } from "react-router-dom";

function Orderplacement() {
  const [show, setshow] = useState(false);
  const [state, setstate] = useState(false);
  const [uniqueid, setuniqueid] = useState(0);
  const [paymentmethod, setpaymentmethod] = useState("");
  const userid = localStorage.getItem("userid");
  const address = localStorage.getItem("addrssid");
  const grandto = localStorage.getItem("carttotal");
  const grandtotal = parseInt(grandto);
  const navigate=useNavigate()

  //  const REACT_APP_PUBLIC_KEY="rzp_test_G8TzKLyrRHqa66"
  // const REACT_APP_SECRET_KEY="VOznj2MYGgNgZwq5FyGdfH5t"

  // {"userid":"31","address":3,"payment_method":"COD","order_number":2022201}

  const changestate = () => {
    setstate(true);
  };

  //   useEffect(() => {
  //     setstate(false);
  //   }, []);

  useEffect(() => {
    console.log(paymentmethod);
  }, [paymentmethod]);

  const ordernumber = () => {
    axios
      .get("http://127.0.0.1:8000/order/ordernumber/")
      .then((Response) => {
        console.log("this is then");
        console.log(Response.data["num"]);

        setuniqueid(Response.data["num"]);
        localStorage.setItem("orderid", Response.data["num"]);
      })
      .catch((error) => {
        console.log("this is catch");
        console.log(console.log(error.data));
      });
  };

  const data = {
    username: userid,
    address: address,
    payment_method: paymentmethod,
    order_number: uniqueid,
    total: grandtotal,
  };
  const userdetail = { userid: userid };

  const Razorpay = async (amount) => {
    const res = await "https://checkout.razorpay.com/v1/checkout.js";
  };

  const orderplaced = () => {
    if (paymentmethod == "COD") {
      console.log(data);
      axios
        .post("http://127.0.0.1:8000/order/orderplaced/", data)
        .then((Response) => {
          console.log("this is then");
          console.log(Response.data);
          axios
            .put("http://127.0.0.1:8000/cart/additem/", userdetail)
            .then((Response) => {
              console.log("this  is cart delete");
            })
            .catch((error) => {
              console.log("this is cart not delete");
            });
          localStorage.removeItem("orderid");
          localStorage.removeItem("addrssid");
          localStorage.removeItem("carttotal");
           navigate("/");
        })
        .catch((error) => {
          console.log("this is catch");
          console.log(console.log(error.data));
        });
    } else if (paymentmethod == "paypal") {
      setshow(true);
    } else {
      console.log("this is razorpay");
      Razorpay(1000);
      console.log("funciton called ");

      const handlePaymentSuccess = async (response) => {
        try {
          // let bodyData = new FormData();

          // we will send the response we've got from razorpay to the backend to validate the payment
          data.append("response", JSON.stringify(response));
          const server = "http://127.0.0.1:8000";
          await Axios({
            url: `${server}/order/razorpay/payment/success/`,
            method: "POST",
            data: data,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log("Everything is OK!");
              console.log(res.data);
              // setName("");
              // setAmount("");
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(console.error());
        }
      }
    

      const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
      };

      const showRazorpay = async () => {
        const res = await loadScript();

        // let bodyData = new FormData();

        // we will pass the amount and product name to the backend using form data
        // bodyData.append("amount", amount.toString());
        // bodyData.append("name", name);

        const server = "http://127.0.0.1:8000";
        const data = await axios({
          url: `${server}/order/razorpay/`,
          method: "POST",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          // },
          data: {"total": grandtotal}
        }).then((res) => {
          console.log("this")
          return res;
        });
        console.log(data.data.payment.id)

        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user
        
        var options = {
          key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
          key_secret: process.env.REACT_APP_SECRET_KEY,
          amount: 1000,
          currency: "INR",
          name: "Org. Name",
          description: "Test teansaction",
          image: "", // add image url
          order_id: data.data.payment.id,
          handler: function (response) {
             const datam = {
               username: userid,
               address: address,
               payment_method: paymentmethod,
               order_number: uniqueid,
               total: grandtotal,
             };
            // we will handle success by calling handlePaymentSuccess method and
            // will pass the response that we've got from razorpay
            axios
              .post("http://127.0.0.1:8000/order/orderplaced/", datam)
              .then((Response) => {
                console.log("this is then");
                console.log(Response.data);
                
                 axios
                      .put("http://127.0.0.1:8000/cart/additem/", userdetail)
                      .then((Response) => {
                        console.log("this  is cart delete");
                      })
                      .catch((error) => {
                        console.log("this is cart not delete");
                      });
                    localStorage.removeItem("orderid");
                    localStorage.removeItem("addrssid");
                localStorage.removeItem("carttotal");
                navigate('/')
                  

              })
          },
          prefill: {
            name: "User's name",
            email: "User's email",
            contact: "User's phone",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      };

      showRazorpay();

      // else......>
    }
  };

  return (
    <div>
      {show ? (
        <div
          id="modal"
          // className={`${
          //   show ? "flex" : "hidden"
          // } container mx-auto justify-center items-center px-4 md:px-10 py-20`}
          className="flex justify-center items-center pl-80 h-[700px]"
        >
          <div className="bg-white   w-screen ">
            <Paypal grandtotal={grandtotal} />
            <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12">
              A confirmation email has been sent to your account,
              johndoe@gmail.com, with the details of shipping and delivery.
            </p>
            <div className="mt-12 md:mt-14 w-full flex justify-center">
              <button
                onClick={() => setshow(false)}
                className="w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white"
              >
                Back to store
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center pl-80 h-[700px]">
          <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
            <div className="flex flex-col justify-start items-start w-full space-y-9">
              <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                  {/* <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                    <div>
                      <svg
                        className="fill-current"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                          fill="currentColor"
                        />
                        <path
                          d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base leading-4">Pay</p>
                    </div>
                  </button> */}
                  <button className="border border-transparent h-14  bg-sky-900 text-white  flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                    <h3 className="text-white">Grand total : $</h3>
                    {grandtotal}
                    {/* <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="-11.153 -13.144 326.05 105.914"
                      >
                        <g transform="matrix(2.07675 0 0 -2.07675 -11.153 92.77)">
                          <defs>
                            <path
                              id="a"
                              d="M-84.525-27.457h326.05V78.457h-326.05z"
                            />
                          </defs>

                          <g clip-path="url(#b)">
                            <path
                              fill="#003087"
                              d="M32.419 40.982c-1.674 1.908-4.7 2.726-8.571 2.726H12.613a1.609 1.609 0 0 1-1.59-1.357L6.347 12.68a.964.964 0 0 1 .953-1.114h6.936l1.742 11.049-.054-.346a1.604 1.604 0 0 0 1.583 1.357h3.296c6.475 0 11.545 2.63 13.026 10.238.044.225.082.444.115.658.44 2.812-.003 4.726-1.524 6.459"
                            />
                            <path
                              fill="#009cde"
                              d="M117.331 26.863c-.424-2.784-2.55-2.784-4.606-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.407-.477.53-1.185.376-2.162m-.895 7.264h-7.756a1.08 1.08 0 0 1-1.066-.91L104.48 13.33a.647.647 0 0 1 .638-.747h3.98c.371 0 .687.27.745.636l.89 5.64c.082.523.534.91 1.064.91h2.454c5.11 0 8.058 2.471 8.828 7.372.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982"
                            />
                            <path
                              fill="#003087"
                              d="M62.011 26.863c-.424-2.784-2.55-2.784-4.607-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.408-.477.531-1.185.377-2.162m-.895 7.264H53.36c-.53 0-.982-.386-1.065-.91L49.16 13.33a.646.646 0 0 1 .638-.747h3.704c.53 0 .981.386 1.064.91l.847 5.365c.082.524.534.91 1.064.91h2.454c5.11 0 8.058 2.472 8.828 7.373.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982M79.123 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.046 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.103 0-7.608-3.11-8.29-7.47-.355-2.177.149-4.256 1.383-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.308 0 5.142 2.124 5.142 2.124l-.166-1.032a.646.646 0 0 1 .639-.747h3.344c.53 0 .982.385 1.065.91l2.008 12.713a.647.647 0 0 1-.64.747"
                            />
                            <path
                              fill="#009cde"
                              d="M134.443 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.045 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.102 0-7.607-3.11-8.29-7.47-.355-2.177.15-4.256 1.384-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.309 0 5.143 2.124 5.143 2.124l-.166-1.032a.644.644 0 0 1 .637-.747h3.343c.53 0 .982.385 1.066.91l2.008 12.713a.647.647 0 0 1-.64.747"
                            />
                            <path
                              fill="#003087"
                              d="M104.08 26.952h-3.734c-.357 0-.69-.177-.89-.473l-5.15-7.584-2.183 7.288a1.08 1.08 0 0 1-1.033.77h-3.669a.647.647 0 0 1-.612-.856l4.11-12.066-3.866-5.455a.647.647 0 0 1 .528-1.02h3.73c.352 0 .683.173.885.463l12.414 17.918a.646.646 0 0 1-.53 1.015"
                            />
                            <path
                              fill="#009cde"
                              d="M143.996 33.58l-3.184-20.251a.647.647 0 0 1 .639-.747h3.201c.53 0 .982.386 1.065.91l3.139 19.888a.646.646 0 0 1-.639.747h-3.582a.645.645 0 0 1-.639-.546"
                            />
                            <path
                              fill="#003087"
                              d="M32.419 40.982c-1.674 1.908-4.7 2.726-8.571 2.726H12.613a1.609 1.609 0 0 1-1.59-1.357L6.347 12.68a.964.964 0 0 1 .953-1.114h6.936l1.742 11.049-.054-.346a1.604 1.604 0 0 0 1.583 1.357h3.296c6.475 0 11.545 2.63 13.026 10.238.044.225.082.444.115.658.44 2.812-.003 4.726-1.524 6.459"
                            />
                            <path
                              fill="#003087"
                              d="M17.849 34.485a1.408 1.408 0 0 0 1.389 1.187h8.808c1.043 0 2.016-.068 2.905-.21a12.206 12.206 0 0 0 1.44-.322 7.957 7.957 0 0 0 1.551-.618c.442 2.813-.002 4.726-1.523 6.46-1.675 1.907-4.7 2.725-8.571 2.725H12.612a1.609 1.609 0 0 1-1.588-1.357L6.346 12.682a.964.964 0 0 1 .952-1.115h6.937l1.742 11.05 1.872 11.868z"
                            />
                            <path
                              fill="#009cde"
                              d="M33.943 34.523a18.294 18.294 0 0 0-.115-.658c-1.481-7.607-6.551-10.238-13.026-10.238h-3.297a1.602 1.602 0 0 1-1.582-1.357l-1.688-10.702-.48-3.036a.844.844 0 0 1 .834-.976h5.847c.692 0 1.28.504 1.389 1.187l.057.298 1.102 6.984.07.386a1.407 1.407 0 0 0 1.39 1.187h.875c5.664 0 10.099 2.3 11.395 8.956.54 2.78.26 5.103-1.17 6.734a5.584 5.584 0 0 1-1.601 1.235"
                            />
                            <path
                              fill="#012169"
                              d="M32.392 35.14c-.226.067-.459.127-.699.18-.24.053-.488.1-.742.14-.89.145-1.862.213-2.906.213h-8.807a1.404 1.404 0 0 1-1.389-1.188l-1.872-11.87-.054-.345a1.602 1.602 0 0 0 1.582 1.357h3.297c6.475 0 11.545 2.63 13.026 10.238.044.225.081.443.115.658a7.998 7.998 0 0 1-1.218.514c-.109.036-.22.07-.333.104"
                            />
                          </g>
                        </g>
                      </svg>
                    </div> */}
                    <div>
                      {/* <p className="text-base leading-4">Pay</p> */}
                    </div>
                  </button>

                  <div className="flex flex-row justify-center items-center mt-6">
                    <hr className="border w-full" />
                    <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                      or pay with card
                    </p>
                    <hr className="border w-full" />
                  </div>

                  {/* <div className="mt-8">
                                <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Email" />
                            </div> */}

                  {/* <label className="mt-8 text-base leading-4 text-gray-800">Country or region</label> */}
                  <div className="mt-10">
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="COD"
                          onChange={(e) => {
                            setpaymentmethod(e.target.value);
                            changestate();
                            ordernumber();
                          }}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800 mb-4 text-2xl"
                          for="flexRadioDefault1"
                        >
                          COD(Cash On Delevery)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="paypal"
                          onChange={(e) => {
                            setpaymentmethod(e.target.value);
                            changestate();
                            ordernumber();
                          }}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800 mb-4 text-2xl"
                          for="flexRadioDefault1"
                        >
                          paypal
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="Razorpay"
                          onChange={(e) => {
                            setpaymentmethod(e.target.value);
                            changestate();
                            ordernumber();
                          }}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800 mb-4 text-2xl"
                          for="flexRadioDefault1"
                        >
                          Razorpay
                        </label>
                      </div>
                    </div>
                  </div>
                  {state ? (
                    <button
                      className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                      onClick={() => {
                        orderplaced();
                      }}
                    >
                      <div>
                        <p className="text-base leading-4">Place order </p>
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {/* <div className="bg-gray-800">
                  <div
                    id="button"
                    className={`${
                      show ? "hidden" : "flex"
                    } container mx-auto justify-center items-center px-4 md:px-10 py-20`}
                  >
                    <button
                      onClick={() => setshow(true)}
                      className="bg-white text-gray-800 py-5 px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded"
                    >
                      Open Modal
                    </button>
                    
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orderplacement;
