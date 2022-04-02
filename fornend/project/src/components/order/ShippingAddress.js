import React from "react";
import { useState ,useEffect} from "react";
import axios, { Axios } from "axios";
import {Navigate,useNavigate } from "react-router-dom";

function ShippingAddress() {
  const [show, setShow] = useState(true);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address1, setaddress1] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [email, setemail] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [value,setvalue]=useState([])
  const userid = localStorage.getItem("userid");

  const navigate=useNavigate()

  const addsubmit = () => {
    console.log("this is onclick");
    console.log(name, phone, address1, city, pin, email, district, state);
    console.log(userid);

    const data = {
      user: userid,
      full_name: name,
      mobile: phone,
      state: state,
      city: city,
      district: district,
      address_line1: address1,
      pincode: pin,
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/order/orderaddress/", data)
      .then((Response) => {
        console.log("this is then ");
        console.log(Response.data);
        orderaddres()
      })
      .catch((e) => {
        console.log("this is catch");
        console.log(e);
        
      });
  };


const orderaddres=()=>{
    axios.get("http://127.0.0.1:8000/order/orderaddress/")
    .then((Response) => {
        console.log("this is then ");
        console.log(Response.data);
        setvalue(Response.data)
      })
      .catch((e) => {
        console.log("this is catch");
        console.log(e);
      });
}

const handleaddressselecting=(id)=>{
  console.log(id)
  localStorage.setItem("addrssid",id)
}




useEffect(() => {
    orderaddres()
    localStorage.removeItem("addrssid")

  
}, [])




  return (
    <div>
      <div className=" bg-slate-100  h-screen w-full">
        <div className="md:px-20 px-4 py-8">
          <div className="flex items-center justify-between">
              
            {/* <div className="hidden lg:flex items-center">
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 cursor-pointer text-white">
                            Home
                        </p>
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            About
                        </p>
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            Pages
                        </p>
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            Doc
                        </p>
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            Contact
                        </p>
                        <button className="text-base font-medium leading-none text-indigo-700 py-4 px-5 bg-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-gray-300">Get it now</button>
                    </div> */}
            <div
              className="lg:hidden text-white"
              onClick={() => setShow(!show)}
            >
              {/* {show ? (
                            <div id="close" className=" close-m-menu" onclick="MenuHandler(false)">
                                <svg aria-label="Close" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                        ) : (
                            <svg id="open" onclick="MenuHandler(true)" aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="show-m-menu icon icon-tabler icon-tabler-menu" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={4} y1={8} x2={20} y2={8} />
                                <line x1={4} y1={16} x2={20} y2={16} />
                            </svg>
                        )} */}
            </div>
          </div>
          {/* {show && (
                    <nav className="lg:hidden relative z-40">
                        <div className="w-full">
                            <div className="visible flex items-center">
                                <ul id="list" className=" p-2 bg-white absolute rounded top-0 left-0 right-0 shadow mt-6">
                                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                        <a href="javascript:void(0)">
                                            <span className="ml-2 font-bold">Home</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">
                                        <a href="javascript:void(0)">
                                            <span className="ml-2 font-bold">About</span>
                                        </a>
                                    </li>
                                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                        <a href="javascript:void(0)">
                                            <span className="ml-2 font-bold">Page</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">
                                        <a href="javascript:void(0)">
                                            <span className="ml-2 font-bold">Doc</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">
                                        <a href="javascript:void(0)">
                                            <span className="ml-2 font-bold">Contact</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )} */}
        </div>
        
        <div className="w-full flex items-center  pt-40 justify-center my-12">
          <div className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8">
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
              Plese add the Address
            </p>
            <div className="md:flex items-center mt-12">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Name
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input  name"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Email Address
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input email address"
                  type="email"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input email address"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  {" "}
                  address line 1
                </label>
                <input
                  tabIndex={0}
                  role="input"
                  arial-label="Please input company name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
                  placeholder="Please input company name"
                  onChange={(e) => {
                    setaddress1(e.target.value);
                  }}
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  {" "}
                  city
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input country name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input country name"
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  {" "}
                  district{" "}
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input country name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input country name"
                  onChange={(e) => {
                    setdistrict(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  {" "}
                  State{" "}
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input country name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input country name"
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                />
              </div>
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  phone number
                </label>
                <input
                  tabIndex={0}
                  role="input"
                  arial-label="Please input company name"
                  type="number"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
                  placeholder="Please input company name"
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                />
              </div>

              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  pincode
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input country name"
                  type="number"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input country name"
                  onChange={(e) => {
                    setpin(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              {/* <div className="w-full flex flex-col mt-8">
                            <label className="text-base font-semibold leading-none text-gray-800"></label>
                            <textarea tabIndex={0} aria-label="leave a message" role="textbox" type="number" className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" defaultValue={""} />
                        </div> */}
              {/* <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">pincode</label>
                            <input tabIndex={0} arial-label="Please input country name" type="number" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input country name" />
                        </div> */}
            </div>
            <p className="text-xs leading-3 text-gray-600 mt-4">
              By clicking submit you agree to our terms of service, privacy
              policy and how we use data as stated
            </p>
            
            <div className="flex items-center justify-center w-full">
              <button
                className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
                type="submit"
                onClick={addsubmit}
              >
               ADD ANOTHER ADDRESS
              </button>
              
            </div>
            <div className="items-center mt-7">
            <div className="">


                {/* <---------------> */}

                <form>
                <table className="w-full whitespace-nowrap">
                                <tbody>
                                   {value.map((obj)=>{
                                       return(

                                    //     <tr className="h-16 border border-gray-100 rounded">
                                        // <td>
                                        //     <div className="ml-5">
                                        //         <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                        //             <input type="radio" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        //             {/* <div className="check-icon  bg-indigo-700 text-white rounded-sm">
                                        //                 <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        //                     <path stroke="none" d="M0 0h24v24H0z" />
                                        //                     <path d="M5 12l5 5l10 -10" />
                                        //                 </svg>
                                        //             </div> */}
                                        //         </div>
                                        //     </div>
                                        // </td>
                                    //     <td className>
                                    //         <div className="flex items-center pl-5">
                                    //             <p className="text-base font-medium leading-none text-gray-700 mr-2"> {obj.full_name},{obj.address_line1},{obj.mobile}</p>
                                              
                                    //         </div>
                                    //     </td>
                                        
                                    
                                    // </tr>
                                    <div >
                                    <div>
                                      <div className="form-check">
                                        <input value={obj.id}  onChange={(e)=>{handleaddressselecting(e.target.value)}} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label inline-block text-gray-800 mb-4 text-2xl" for="flexRadioDefault1">
                                        {obj.full_name},{obj.address_line1},{obj.mobile}
                                        </label>
                                      </div>
                                     
                                    </div>
                                  </div>
                                       
                                        )
                                   })}


                                   

                                   
                                    <button role="button" className=" ml-1 mt-6 focus:ring-2  focus:ring-offset-2 focus:ring-gray-500 text-sm font-semibold leading-none text-white focus:outline-none bg-slate-600 rounded hover:bg-slate-700 py-4 w-full"  onClick={()=>{navigate("/order")}} >
                                        checkout
                                    </button>
                                 
                                </tbody>
                             
                            </table>
                            </form>
         





     
    </div>

            </div>

          </div>

          <div class="flex justify-center"></div>
        </div>
      </div>


   
    </div>
  );
}

export default ShippingAddress;
