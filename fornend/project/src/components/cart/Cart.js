import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Zoom } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([]);
  const [total, settotal] = useState([])
  const [couponcode, setcouponcode] = useState("")
  const [percentage, setpercentage] = useState()
  const [offeramount, setofferamount] = useState()
  // const [coupondiv, setcoupondiv] = useState()
  const [coupnerror,setcoupnerror]=useState(false)
  let gtotal=0
  
  
  
  


  
  const userid = localStorage.getItem("userid");
  

  const getitem = () => {
    const name = { username: userid };
    axios
      .post("http://127.0.0.1:8000/cart/usercart/", name)
      .then((Response) => {
        console.log(Response.data);
        console.log("cart itesm")
        setcartitems(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const name = { username: userid };
    axios
      .post("http://127.0.0.1:8000/cart/usercart/", name)
      .then((Response) => {
        console.log(Response.data);
        
        setcartitems(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  useEffect(() => {
    let grandtotal1 = 0
    
      cartitems.forEach(element => {
        grandtotal1=grandtotal1+element.sub_total
    });
    settotal(grandtotal1)
  
   
  }, [cartitems])


  // useEffect(() => {

  //     if (total > 2000) {
  //       setcoupondiv(true);
  //     } else {
  //       setcoupondiv(false)
  //     }
   
  // }, [total])
  


  const carttotal=total+60

  // localStorage.setItem("carttotal",carttotal)
  


  const removeitem = (id) => {
    console.log(id);
    console.log("this is  remove the item");
    // const url = "http://127.0.0.1:8000/cart/"+id;
    axios
      .delete(`http://127.0.0.1:8000/cart/removeitem/${id}`)
      .then((Response) => {
        console.log(Response.data);
        getitem();
        console.log("this is then");
      })
      .catch((error) => {
        console.log("this is error");
      });
  };

  const countincrease = (stock, product_id) => {
   
   
    console.log("this is product add button");
    const product_stock = stock;
    const prod_id = product_id;
    console.log(prod_id);
    const name = userid;
    const action = "add";
    const data = {
      product_id: prod_id,
      user_id: name,
      product_stock: product_stock,
      action: "add",
    };

    console.log("this is increase");
    axios.patch("http://127.0.0.1:8000/cart/additem/",data).then((Response)=>{
      console.log("this is then")
      console.log(Response.data)
      getitem()
    }).catch((error)=>{
      console.log("this is error")
    })
  };

  const countdecrease = (stock, product_id) => {
    
    

    console.log(stock, "this is stock");

    console.log("this is product add button");
    const product_stock = stock;
    const prod_id = product_id;
    console.log(prod_id);
    const name = userid;
    const action = "not add";
    const data = {
      product_id: prod_id,
      user_id: name,
      product_stock: product_stock,
      action: "not added",
    };

    console.log("this is decrease");
    axios.patch("http://127.0.0.1:8000/cart/additem/",data).then((Response)=>{
      console.log("this is then")
      console.log(Response.data)
      getitem()
    }).catch((error)=>{
      console.log("this is error")
    })
  };


  const appycoupon = () => {
    console.log(couponcode)
    const data = { "coupon_code": couponcode, "status": "appled", "user_name": userid, "amount": gtotal }
    console.log(data)
    axios.post("http://127.0.0.1:8000/cart/copon/", data).then((Response) => {
      console.log("this is coupon then")
      console.log(Response.data)
      setpercentage(Response.data["applied"]);
      const per = Response.data
       setcoupnerror(false)
      

    }).catch((error) => {
      console.log("this is error")
      console.log(error)
      setcoupnerror(true)

    })
    
  }
  useEffect(() => {
      
      const offer = total * percentage
      const amount = offer / 100;
      console.log(amount)
      setofferamount(amount)
      localStorage.removeItem("carttotal")
      
  }, [percentage])

  const addlocalstorage = () => {
    localStorage.setItem("carttotal",gtotal)
    
    
  }
  


  return (
    <>
      {cartitems.length == 0 ? (
        <div className="h-screen">
          <div className="xl:px-20 px-6 py-20 xl:mx-auto xl:container">
            <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-gray-800 sm:mb-0 mb-12">
              please add item to Cart <br className="md:block hidden" />
              <h3 className="xl:text-5xl">
                <button
                  className="text-orange-400"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  ←{" "}
                </button>
               
              </h3>
            </h1>

            <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
              <img
                src="https://i.ibb.co/KjrPCyW/map.png"
                alt="world map image"
                className="w-full xl:h-full h-96 object-fill sm:block hidden"
              />
              <img
                src="https://i.ibb.co/SXKj9Mf/map-bg.png"
                alt="mobile-image"
                className="sm:hidden -mt-10 block w-full h-96 object-fill absolute z-0"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div
              className="w-screen h-full bg-white top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
              id="chec-div"
            >
              <div
                className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
                id="checkout"
              >
                <div
                  className="flex md:flex-row flex-col justify-end"
                  id="cart"
                >
                  <div
                    className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                    id="scroll"
                  >
                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-left"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      <p
                        className="text-sm pl-2 leading-none"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Back
                      </p>
                    </div>
                    <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                      Bag
                    </p>
                    {cartitems ? (
                      cartitems.map((obj, id) => {
                        return (
                          <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                            <div className="w-1/4">
                              <img
                                src={obj.image_url}
                                alt
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="md:pl-3 md:w-3/4">
                              <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                                RF293
                              </p>
                              <div className="flex items-center justify-between w-full pt-1">
                                <p className="text-base font-black leading-none text-gray-800">
                                  {obj.products}
                                </p>
                                <div>
                                  <button
                                    data-action="decrement"
                                    className=" bg-gray-300 ml-8 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                    onClick={() => {
                                      countdecrease(
                                        obj.product_stock,
                                        obj.product_id
                                      );
                                    }}
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      −
                                    </span>
                                  </button>
                                  <button
                                    data-action="increment"
                                    className="bg-gray-300 ml-1 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                    onClick={() => {
                                      countincrease(
                                        obj.product_stock,
                                        obj.product_id
                                      );
                                    }}
                                  >
                                    <span class="m-auto text-2xl font-thin">
                                      +
                                    </span>
                                  </button>
                                </div>

                                <button className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                  {/* <option>03</option> */}
                                  {obj.product_stock}
                                </button>
                              </div>

                              <p className="w-96 text-xs leading-3 text-gray-600">
                                Composition: 100% calf leather
                              </p>
                              <div className="flex items-center justify-between pt-5 pr-6">
                                <div className="flex itemms-center">
                                  <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                                    Add to favorites
                                  </p>
                                  <p
                                    className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                                    onClick={() => {
                                      removeitem(obj.id);
                                    }}
                                  >
                                    Remove
                                  </p>
                                </div>
                                <p className="text-base font-black leading-none text-gray-800">
                                  ₹{obj.sub_total}
                                </p>
                              </div>

                              {/* <button
                            data-action="decrement"
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            onClick={() => {
                              countdecrease(obj.product_stock, obj.product_id);
                            }}
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button> */}

                              {/* <input
                            className="focus:outline-none text-center w-20 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                            name="custom-input-number"
                            value={obj.product_stock}
                          ></input> */}
                              {/* <button
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            onClick={() => {
                              countincrease(obj.product_stock, obj.product_id);
                            }}
                          >
                            <span class="m-auto text-2xl font-thin">+</span>
                          </button> */}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h1>no item in cart </h1>
                    )}

                    {/* <div className="md:flex items-center py-8 border-t border-b border-gray-200">
                                        <div className="h-full w-1/4">
                                            <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller1.png" alt className="w-full h-full object-center object-cover" />
                                        </div>
                                        <div className="md:pl-3 md:w-3/4 w-full">
                                            <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                            <div className="flex items-center justify-between w-full pt-1">
                                                <p className="text-base font-black leading-none text-gray-800">Luxe Signature Shoes</p>
                                                <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                    <option>01</option>
                                                    <option>02</option>
                                                    <option>03</option>
                                                </select>
                                            </div>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                            <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                            <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                            <div className="flex items-center justify-between pt-5 pr-6">
                                                <div className="flex itemms-center">
                                                    <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                                    <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                                </div>
                                                <p className="text-base font-black leading-none text-gray-800">$9,000</p>
                                            </div>
                                        </div>
                                    </div> */}
                  </div>
                  <div className=" md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                    <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                      <div>
                        <p className="text-4xl font-black leading-9 text-gray-800">
                          Summary
                        </p>
                        <div className="flex items-center justify-between pt-16">
                          <p className="text-base leading-none text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            ${total}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-5">
                          <p className="text-base leading-none text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            ₹60
                          </p>
                        </div>
                        {/* <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $35
                      </p>
                    </div> */}
                      </div>
                      <div>
                        <div></div>
                        {/* {coupondiv && */}
                        <div>
                          <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                            <label
                              htmlFor="username"
                              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                            >
                              Apply Coupon
                            </label>
                            <input
                              type="text"
                              required
                              className="border border-gray-300 w-52 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                              placeholder="couponcode"
                              value={couponcode}
                              onChange={(e) => {
                                setcouponcode(e.target.value);
                                setcoupnerror(false);
                              }}
                            />
                          </div>
                          <button
                            className="bg-slate-800 focus:outline-none transition duration-150 ease-in-out hover:bg-slate-600 rounded text-white px-8 py-2   mt-4 mb-6 text-sm"
                            type="submit"
                            onClick={() => {
                              appycoupon();
                            }}
                          >
                            Apply
                          </button>
                          {coupnerror && (
                            <p className="text-red-600">
                              coupon is expired or already used{" "}
                            </p>
                          )}
                        </div>
                        {/* } */}
                        <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                          <p className="text-2xl leading-normal text-gray-800">
                            Total
                          </p>

                          {offeramount ? (
                            <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                              {(gtotal = total - offeramount + 60)}
                            </p>
                          ) : (
                            <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                              {(gtotal = total + 60)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            navigate("/shipping");
                            addlocalstorage();
                          }}
                          className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
