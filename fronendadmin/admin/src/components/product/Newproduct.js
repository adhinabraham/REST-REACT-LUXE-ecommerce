import React from "react";
import Navigation from "../verticalNavigation/Navigation";
import Navbar from "../adminnavbar/Navbar";
import { useState,useEffect} from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from "@brocode/simple-react-form-validation-helper";

toast.configure();

function Newproduct() {
  const [Productname, Setproductname] = useState('');
   const [Productnameerror, Setproductnameerror] = useState('');
  const [imag1, Setimg1] = useState([]);
  const [imag2, Setimg2] = useState([]);
  const [imag3, Setimg3] = useState([]);
  const [price, Setprice] = useState('');
  const [priceerror, Setpriceerror] = useState('');
  const [category,setCategory]=useState();
  const [description, Setdescription] = useState('');
   const [descriptionerror, Setdescriptionerror] = useState('');
  const [addcategory,setaddcategory]=useState([])
  const [status, setStatus] = useState('')
  const [error,seterror]=useState(false)
  const [srcImg, setSrcImg] = useState(null);
  console.log(category)

  const navigate=useNavigate()


  const handleImage = async (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
};



  const notificationsuccess=(message)=>{
    toast.success(''+message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const notificationerror=(message)=>{
    toast.error(''+message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
 
 
  


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/newadmin/category/').then((Response)=>{
      console.log("this is useEffect")
      console.log(Response.data)
      setaddcategory(Response.data)
      
    })
  },[])

  

  const data = (e) => {
      if (Productname=="" || Image==null || description==""|| price ==""){
            console.log("this isnull")
            seterror(true)
            e.preventDefault()
            return
        }
   const categoryid=parseInt(category)
    let formData = new FormData();
    formData.append('productname', Productname);
    formData.append('image',imag1);
    formData.append('image1',imag2);
    formData.append('image2',imag3);
    formData.append('description',description)
    formData.append('category_name',categoryid);
    formData.append('price',price)
    console.log(formData.price)
    for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
    
    axios.post('http://127.0.0.1:8000/newadmin/product/',formData)
    .then((Response)=>{
        navigate("/productlist")
        console.log("this  is then ")
        console.log(Response.data)
        notificationsuccess("product add successfullu")
        setStatus(Response.data)

    }).catch((error)=>{
        console.log("this is an error")
        notificationerror("product is not added")
       
    })
    
  };

  return (
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
                  Enter product details{" "}
                </h1>
                <label
                  
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Product Name
              
                </label>
                <div>
                  <input
                  id="name"
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="product"
                  onChange={(e) => {
                    Setproductname(e.target.value); seterror(false);   validator.nameInputBlurHandler(
                          e.target.value,
                         Setproductnameerror
                        );
                  }}
                ></input>
                  <span className="text-red-500 fs-6">{Productnameerror}</span>
                </div>
                
                <label
                
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Add photo 1
                </label>

                <div className="flex justify-center">
                  <div className="mb-3 w-96">
                    <input
                      className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFile"
                   
                      onChange={(e) => {
                         Setimg1(e.target.files[0]);
                      }}
                    ></input>
                  </div>
                </div>
                <label
                  
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Add photo 2
                </label>

                <div className="flex justify-center">
                  <div className="mb-3 w-96">
                    <input
                      className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFile"
                      onChange={(e) => {
                        Setimg2(e.target.files[0]);
                      }}
                    ></input>
                  </div>
                </div>
                <label
                
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Add photo 3
                </label>

                <div className="flex justify-center">
                  <div className="mb-3 w-96">
                    <input
                      className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={(e) => {
                        Setimg3(e.target.files[0]);
                      }}
                    ></input>
                  </div>
                </div>

                <label
                
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Enter the price
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
                  <input
                    id="expiry"
                    type="number"
                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Add price "
                    onChange={(e) => {
                      Setprice(e.target.value);validator.priceInputBlurHandler(e.target.value,Setpriceerror)
                    }}
                  />
                    <span className="text-red-500 fs-6">{priceerror}</span>
                </div>

                <div>
                  <label
                   
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" placeholder="category"
                  >
                   Select your category
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "  placeholder="Add price" onChange={(e)=>{setCategory(e.target.value)}}
                  >
                    {/* <option>Tshirt</option>
                    <option>Formals</option>
                    <option>Shirts</option>
                    <option>Pants</option> */}
                    {
                    addcategory.map((obj)=>{
                      return(
                        <option value={obj.id}>{obj.category_name}</option>
                      );
                      
                    })
                    }
                  </select>
                </div>

                <label
                  
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Add discription
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
                    
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                  <input
                    id="cvc"
                    className="mb-8 h-28 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder=""
                    onChange={(e) => {
                      Setdescription(e.target.value);validator.addressInputBlurHandler(e.target.value,Setdescriptionerror)
                    }}
                  />
                    <span className="text-red-500 fs-6">{descriptionerror}</span>
                </div>
                <div className="flex items-center justify-start w-full">
                <button
                    className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={data}
                  >
                    Submit
                  </button>
                  <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                    Cancel
                  </button>
                 
                </div>
                 {error?<p className="text-red-900">please fill the form </p>:<p></p>}
                {/* {status?
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                  <span className="font-medium">Success alert!</span> submited
                </div>:<div></div>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newproduct;
