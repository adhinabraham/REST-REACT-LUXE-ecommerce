import React from "react";
import Navbar from "../adminnavbar/Navbar";
import axios from "axios";
import { useState, useEffect ,useCallback} from "react";
import swal from 'sweetalert';



import Navigation from "../verticalNavigation/Navigation";


function Productlist() {
  const [productdetails, setproductdetails] = useState([]);
  const [Deleted,setDeleted]=useState()

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/newadmin/product/").then((Response) => {
  //     console.log(Response.data)
     
  //     setproductdetails(Response.data);
  //   });
  // }, []);

 useEffect(() => {
   getproductdata()
 }, [])
 

  const getproductdata= (()=>{
    try {
      const url="http://127.0.0.1:8000/newadmin/product/"
     axios.get(url).then((Response)=>{
       console.log(Response.data)
       setproductdetails(Response.data)

     })
      
      
    } catch (error) {
      console.log(error.message)
      
    }

  })


  const productdelete=(id)=>{
    if(window.confirm("Are you sure want to delete this product")){
  
      axios.delete(`http://127.0.0.1:8000/newadmin/productdelete/${id}`).then((Response)=>{
        console.log(Response.data)
       
        setproductdetails(Response.data)
        console.log(Deleted)
        console.log("this is then")
      }).catch((error)=>{
        console.log("this is flase ")
      })
    }
  }


 

  return (
    <div>
       <Navbar/>
      <div className="flex">
        <Navigation className="h-screen" ></Navigation>
     
     

      <div className=" pt-3 py-20 w-5/6">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
           
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                  <th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    <input
                      type="checkbox"
                      className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
                      onclick="checkAll(this)"
                    />
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    <div className="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10">
                      <div className="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">
                        3
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-file"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      </svg>
                    </div>
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                   id
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Productname
                  </th>
                
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Price
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                   Delete product
                  </th>
                
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400" />
                  </th>
                  {/* <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td> */}
                </tr>
              </thead>
              <tbody>
                {productdetails.map((obj, index) => {
                  return (
                    <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                      <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <input
                          type="checkbox"
                          className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
                          onclick="tableInteract(this)"
                        />
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <div className="relative w-10">
                          <div className="text-gray-600 dark:text-gray-400"></div>
                        </div>
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {index + 1}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {obj.productname}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {obj.price}
                      </td>
                   
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      <button className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{productdelete(obj.id)}} >
                          Delete
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
  );
}

export default Productlist;
