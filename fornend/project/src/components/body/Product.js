import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carosal from "./Carosal";

toast.configure();



function Product() {
    const [products,setproducts]=useState([])
  const userid = localStorage.getItem("userid");
  const [display, setdisplay] = useState()
  const navigate=useNavigate()
 

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
  
  const categorystatus = () => {
    axios.get("http://127.0.0.1:8000/product/categoryitem/").then((Response) => {
      
   
      console.log(Response.data)
      setdisplay( Response.data["item"])
      

    }).catch((error) => {
      console.log("this is error")
    })
  }
  useEffect(() => {
    categorystatus()
    
  }, [])
  
     



    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/product/productlist/').then((Response)=>{
            console.log (Response.data)
            setproducts(Response.data)
        }).catch((error)=>{
            console.log (error.data)
        })
    },[])



    const Addcart=(productid)=>{

    const data={ "product_id": productid,"username": userid}

    axios.post('http://127.0.0.1:8000/cart/additem/',data).then((Response)=>{
        console.log("this is  then ")
        notificationsuccess("Product Added to cart")

    }).catch((error)=>{
        console.log("this is catch")
        notificationerror("something went wrong ..")
    })
    }
  
  
  const buynow = (productprice) => {
     console.log("shit happens")
    localStorage.setItem("carttotal", productprice);
    navigate("/shipping");

    
  }
   


     
  return (
    <div>
      {/* <Carosal/> */}

      <div className=" 2xl:container 2xl:mx-auto">
        <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
          <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">
            Summer Collection Vol-1
          </p>
          {display && (
            <p className="text-xl font-bold text-red-500 animate-ping">
              Now offer in {display} Category
            </p>
          )}
        </div>
        <div className=" py-6 lg:px-20 md:px-6 px-4">
          {/* <p className=" font-normal text-sm leading-3 text-gray-600 ">Home / Shop by Category / Women </p> */}
          <hr className=" w-full bg-gray-200 my-6" />

          <div className=" flex justify-between items-center">
            <div className=" flex space-x-3 justify-center items-center">
              <svg
                className=" cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 7.5H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M3.75 12H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M3.75 16.5H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
              </svg>
              {/* <p className=" font-normal text-base leading-4 text-gray-800">Filter</p> */}
            </div>
            <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">
              Showing products
            </p>
          </div>

          <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
            {products.map((obj, id) => (
              <>
                <div className=" relative ">
                  <div className=" absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 ">
                    <p className="text-xs leading-3 text-gray-800">New</p>
                  </div>
                  <div className=" relative group">
                    <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>

                    <img className="h-96 w-72" src={obj.image} />
                    <div className=" absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                      <button className=" font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">
                        <Link to={`/showproduct/${obj.id}`}>View</Link>{" "}
                      </button>
                      <button
                        className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white"
                        onClick={() => {
                          Addcart(obj.id);
                        }}
                      >
                        Add to Cart
                      </button>
                      
                      <button
                        className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white"
                        onClick={() => {
                          buynow(obj.price);
                        
                        }}
                      >
                        buy now
                      </button>
                    </div>
                  </div>

                  <p className=" font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">
                    {obj.productname}
                  </p>
                  {obj.offerstatus ? (
                    <div>
                      <p className=" font-semibold text-sm ml-24 line-through leading-5 text-red-400 mt-4">
                        ???{obj.price2}
                      </p>
                      <p className=" font-semibold text-xl  mt-[-20px] leading-5 text-gray-800 ">
                        ???{obj.price}
                      </p>{" "}
                    </div>
                  ) : (
                    <p className=" font-semibold text-xl leading-5 text-gray-800 mt-4">
                      ???{obj.price}
                    </p>
                  )}

                  {obj.offerstatus ? (
                    <p className=" font-normal text-base leading-4 text-rose-800 mt-4">
                      {obj.offer_name}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </>
            ))}
            {/* <div className=" relative ">
                        <div className=" absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 ">
                            <p className="text-xs leading-3 text-gray-800">New</p>
                        </div>
                        <div className=" relative group">
                            <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                            <img className=" w-full" src="https://i.ibb.co/HqmJYgW/gs-Kd-Pc-Iye-Gg.png" alt="A girl Posing Img" />
                            <div className=" absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                                <button className=" font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to bag</button>
                                <button className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick View</button>
                            </div>
                        </div>
                        <p className=" font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">Wilfred Alana Dress</p>
                        <p className=" font-semibold text-xl leading-5 text-gray-800 mt-4">$1550</p>
                        <p className=" font-normal text-base leading-4 text-gray-600 mt-4">2 colours</p>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product

