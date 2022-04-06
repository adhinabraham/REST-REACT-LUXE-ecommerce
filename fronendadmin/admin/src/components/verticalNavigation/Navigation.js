import React from 'react'
import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Navigation() {

    const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const dashboard = () => {
      navigate('/dashboard')
    }
    const product=()=>{
      console.log("what is this ")
      navigate('/productadd')

    }
   const productlist = () => {
     console.log("what is this ");
     navigate("/productlist");
   };
    const coupon=()=>{
      console.log("what is this ")
      navigate('/coupon')

    }
    const Users=()=>{
      console.log("what is this ")
      navigate('/Listuser')

    }
    const Category=()=>{
      console.log("what is this ")
      navigate('/addcategory')

    }
    const Order = () => {
      console.log("what is this ");
      navigate("/order");
    };
  const salesreport = () => {
    navigate("/sales")
  }
   const productoffer = () => {
     navigate("/productoffer");
   };
  const offerproduct = () => {
    navigate("/offerproducts");
  };
  const offercategory = () => {
    navigate("/offercategory");
  };
  const categoryoffer = () => {
    navigate("/categoryoffer");
  };
    
    
  return (
    <div className="h- ">
      <div className="bg-red-800-50">
        <div className="bg-white xl:hidden flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center ">
          {/* <div aria-label="toggler" className="flex justify-center items-center">
          <button id="open" onClick={() => setShow(!show)} aria-label="open" className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
            <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button id="close" onClick={() => setShow(!show)} aria-label="close" className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
           
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           
          </button>
        </div> */}
        </div>
        <div
          id="Main"
          className={`${
            show ? "-translate-x-full" : "translate-x-0"
          } bg-white transform  xl:translate-x-0 ease-in-out transition duration-500 flex justify-center items-start w-full sm:w-72   flex-col h-full`}
        >
          <div className="xl:mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5   ">
            {/* <div className=" relative focus:outline-none flex jusitfy-start w-full   text-gray-800 rounded  items-center border-gray-300 focus:border-gray-400 border  ">
            <input type="text" placeholder="Search" className="placeholder-gray-800 text-base placeholder-text-base leading-4 py-3 pl-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded " />
            <svg className="absolute left-4" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L15 15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div> */}
            <button
              className="focus:outline-noneflex justify-center  hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full "
              onClick={dashboard}
            >
              <p className="text-base leading-4 ">Dashboard</p>
            </button>
            <button
              className="focus:outline-noneflex justify-center  hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  items-center w-full  space-x-6"
              onClick={product}
            >
              <p className="text-base leading-4 ">Addproduct</p>
            </button>
            <button
              className="focus:outline-noneflex justify-center  hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  items-center w-full  space-x-6"
              onClick={productlist}
            >
              <p className="text-base leading-4 ">productlist</p>
            </button>
            <button
              className="focus:outline-noneflex justify-center  hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  items-center w-full  space-x-6"
              onClick={coupon}
            >
              <p className="text-base leading-4 ">Addcoupon</p>
            </button>
            <button
              className="focus:outline-none flex justify-center  items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded  py-3 pl-4  w-full "
              onClick={Users}
            >
              <p className="text-base leading-4  ">Users</p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={Category}
            >
              <p className="text-base leading-4  ">Category</p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={Order}
            >
              <p className="text-base leading-4  ">order management</p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={salesreport}
            >
              <p className="text-base leading-4  ">Sales reprot </p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={productoffer}
            >
              <p className="text-base leading-4  ">Add product offer </p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={offerproduct}
            >
              <p className="text-base leading-4  ">Offermanage </p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={categoryoffer}
            >
              <p className="text-base leading-4  ">Addcategory offer </p>
            </button>
            <button
              className="flex justify-center items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full"
              onClick={offercategory}
            >
              <p className="text-base leading-4  ">Manage Categoryoffer </p>
            </button>
          </div>
          <div className="w-full px-4">
            <hr className=" border-gray-100 w-full" />
          </div>

          <div className="w-full px-4">
            <hr className=" border-100 w-full" />
          </div>

          <div className="mt-36 flex  bg-white justify-start space-x-2 items-center h-full py-4 px-3.5    w-full  "></div>
        </div>
      </div>
    </div>
  );
}

export default Navigation