import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import validator from "@brocode/simple-react-form-validation-helper";

function Userform() {
  const [user, setuser] = useState([])
  const [value, setvalue] = useState([])
  const [name, setname] = useState("")
  const[nameerror,setnameerror]=useState("")
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [phone, setphone] = useState("");
  const [phoneerror, setphoneerror] = useState("");
  const [profile, useprofile] = useState(false)
  const [error,seterror]=useState(false)
  const userid = localStorage.getItem("userid");
  console.log(name)


  const userdetails = () => {
    const data={"id":userid}
    axios.post("http://127.0.0.1:8000/user/profile", data).then((Response) => {
      console.log(Response.data)
      setuser(Response.data)
       localStorage.setItem("name", Response.data.username);
    }).catch((error) => {
      console.log("this is catch")
    })
  }
  const orderaddres = () => {
    axios
      .get("http://127.0.0.1:8000/order/orderaddress/")
      .then((Response) => {
        console.log("this is then ");
        console.log(Response.data);
        setvalue(Response.data);
      })
      .catch((e) => {
        console.log("this is catch");
        console.log(e);
      });
  };


  const edituserdetails = (e) => {
      if ( name == "" || phone == "" || email=="") {
        console.log("this isnull");
        seterror(true);
        e.preventDefault();
        return;
      }
    console.log(name, phone, email)
    const data = { "id": userid, "username": name, "phone": phone, "email": email }
    console.log(data)
    axios
      .patch("http://127.0.0.1:8000/user/profile", data)
      .then((Response) => {
        console.log("this is then address changeed ");
        console.log(Response.data);
        userdetails()
      })
      .catch((e) => {
        console.log("this is catch");
        console.log(e);
      });
  
    
  }

  useEffect(() => {
    userdetails()
    orderaddres()
    
  }, [])
  


  return (
    <div>
      <div className="py-4 lg:py-8  relative">
        <div className="xl:mx-auto xl:container  relative ">
          <div className="flex flex-wrap xl:mx-auto xl:container">
            <div className="w-full relative lg:w-1/2 xl:mt-10 mb-10 2xl:pr-24 2xl:pl-0 xl:pl-12 pl-0 ">
              {/* <img src="https://cdn.tuk.dev/assets/templates/radian/Back_Image.png" className="h-full w-full xl:w-1/2 absolute inset-0 bg-cover bg-center xl:hidden" alt="map" /> */}
              <div className="w-full flex flex-col items-start  xl:justify-start  relative z-20 xl:px-0 px-4 xl:py-0 py-4">
                <div className="w-full 2xl:pl-48 xl:pt-1">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-gray-800">
                    Profile
                  </h1>
                  <div className="w-full md:w-10/12 mt-3">
                    {user && (
                      <>
                        <h2 className="text-sm md:text-base text-slate-900 font-semibold">
                          UserName
                        </h2>
                        <h3 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider">
                          {user.username}
                        </h3>
                      </>
                    )}
                    {value[0] && (
                      <div className="mt-4 md:mt-8">
                        <h2 className="text-sm md:text-base text-slate-900 font-semibold">
                          Address
                        </h2>
                        <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                          {value[0].address_line1}, {value[0].city},
                          {value[0].pincode}, {value[0].state}
                        </h2>
                      </div>
                    )}
                    {user && (
                      <div className="mt-4 md:mt-8">
                        <h2 className="text-sm md:text-base text-slate-700 font-semibold">
                          Contact
                        </h2>
                        <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                          +{user.mobile_number} (Phone)
                        </h2>
                      </div>
                    )}
                    {user && (
                      <div className="mt-4 md:mt-8">
                        <h2 className="text-sm md:text-base text-slate-700 font-semibold">
                          Email
                        </h2>
                        <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                          {user.email}
                        </h2>
                      </div>
                    )}
                    {/* <div className="py-5">
                      <button className="py-3 md:py-5 px-5 md:px-10 bg-gray-900 text-white hover:opacity-90 ease-in duration-150 text-sm md:text-lg tracking-wider font-semibold" onClick={()=>{useprofile(true)}}>
                        edit profile
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* {profile && */}
            <div className="w-full lg:w-1/2   xl:pt-10 lg:pl-24">
              <div className="flex flex-col items-start xl:justify-start 2xl:justify-end xl:px-0 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-black">
                  Edit profile
                </h1>
                <div className="w-full 2xl:w-8/12 mt-3">
                  <div>
                    <div className="mt-4 md:mt-8">
                      <p className="text-gray-800 text-base font-medium">
                        Name
                      </p>
                      <input
                        className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);

                          validator.nameInputBlurHandler(
                            e.target.value,
                            setnameerror
                          );
                          seterror(false);
                        }}
                      />
                    </div>
                    <span className="text-red-500 fs-6">{nameerror}</span>
                  </div>

                  <div className="mt-4 md:mt-8">
                    <p className="text-gray-800 text-base font-medium">
                      Email Address
                    </p>
                    <input
                      className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                        validator.emailInputBlurHandler(
                          e.target.value,
                          setemailerror
                        );
                        seterror(false);
                      }}
                    />
                  </div>
                  <span className="text-red-500 fs-6">{emailerror}</span>
                  <div className="mt-4 md:mt-8">
                    <p className="text-gray-800 text-base font-medium">
                      Phonenumber
                    </p>
                    <input
                      className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800"
                      type="number"
                      value={phone}
                      onChange={(e) => {
                        setphone(e.target.value);
                        seterror(false);
                      }}
                    />
                  </div>
                  {/* <div className="mt-4 md:mt-8">
                      <p className="text-gray-800 text-base font-medium">
                       Address
                      </p>
                      <textarea
                        className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 resize-none hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black xl:h-40 py-5 pl-4 text-gray-800"
                        type="text"
                        placeholder="Add Address..."
                        defaultValue={""}
                      />
                    </div> */}
                  <div className="py-5">
                    <button
                      className="py-3 md:py-5 px-5 md:px-10 bg-gray-900 text-white hover:opacity-90 ease-in duration-150 text-sm md:text-lg tracking-wider font-semibold"
                      onClick={() => {
                        edituserdetails();
                      }}
                    >
                      edit
                    </button>
                    {error ? (
                      <p className="text-red-500">
                        plse fill the form properly
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userform