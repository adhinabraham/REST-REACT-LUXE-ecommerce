import React from 'react'
import Navbar from '../adminnavbar/Navbar'
import Navigation from '../verticalNavigation/Navigation'
import {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


function Addcategory() {
  const [categoryname,setcategoryname]=useState("")
  const [slug,setslug]=useState("")
  const[description,setdescription]=useState("")

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

  const form =(e)=>{
    console.log("what is done here")
    console.log(categoryname,slug,description)
    const value={"category_name":categoryname,"slug":slug,"description":description}
    axios.post("http://127.0.0.1:8000/newadmin/category/",value).then((Response)=>{
      console.log("this is then")
      console.log(Response)
      notificationsuccess("category add successfullu")
      .catch((error)=>{
        console.log("this is error")

      })
    })
    
  }
  return (

    <div>
          <div>
        <Navbar></Navbar>
        <div className='flex mt-12'>
            <Navigation></Navigation>
           <div className=''>
            <div className="py-12 mt-20 ml-40 w-5/6 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className>
                       
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Category details </h1>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                          Category name
                        </label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Category" onChange={(e)=>{setcategoryname(e.target.value)}} ></input>
                      
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                        Slug
                        </label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="SubCategory" onChange={(e)=>{setslug(e.target.value)}} ></input>
                      
                      
                       
                
                        <label htmlFor="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Add discription
                        </label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={9} />
                                    <line x1={12} y1={8} x2="12.01" y2={8} />
                                    <polyline points="11 12 12 12 12 16 13 16" />
                                </svg>
                            </div>
                            <input id="cvc" type="text" className="mb-8 h-28 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=""  onChange={(e)=>{setdescription(e.target.value)}}/>
                        </div>
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={form}>Submit</button>
                            <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >
                                Cancel
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
            
          </div>
        </div>
    </div>
    </div>
  )
}

export default Addcategory