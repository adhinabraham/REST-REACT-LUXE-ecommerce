import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from  'react-router-dom'
import {message} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Mobileverification() {
    const [number,setnumber]=useState('')
    const [otpnumber,setotpnumber]=useState("")
    const [status,setstatus]=useState(false)
    const [error,seterror]=useState(false)
    const navigate = useNavigate()

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
   
   

    
    const submited=()=>{
        console.log("button clicked ")
        console.log(number)
       
       

      const  data={"mobile_number":number}
      axios.post('http://127.0.0.1:8000/otp/',data).then((Response)=>{
        notificationsuccess("otp sent")
        console.log ('this is post')
        setstatus(true) 
        console.log(Response.data) 
    }).catch((e)=>{
      notificationerror("not a valid number")
      console.log ("this is catch ")
      seterror(true)


    })
    }
    const submitedotp=()=>{
        console.log("button clicked otp poiii ")
       
       
      const data={"otp":otpnumber,"mobile_number":number}
      console.log(data)
      axios.post('http://127.0.0.1:8000/otpnumber/',data).then((Response)=>{
        notificationsuccess("otp verified")
        console.log ('this is post')
        console.log(Response.data) 
        navigate('/login')
      

    }).catch((error)=>{
      notificationerror("Not a valid otp")
      console.log("this is error")
      console.log(error.data)
    })
    }
  return (
    <div className="bg-slate-50-50 h-screen ">
                <div className="xl:px-20 md:px-10 pt- sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                 
                  <div className="bg-white shadow-lg mt-[200px] pt-80 rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
                        <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Enter your mobile number
                        </p>
                      
                        {/* <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100">
                            <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                                <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                                <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                                <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                            </svg>
                            <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                        </button> */}
                       
                       
                        <div className="w-full flex items-center justify-between py-5">
                            <hr className="w-full bg-gray-400" />
                           
                            <hr className="w-full bg-gray-400" />
                        </div>
                       
                
                        <div className="flex flex-col ">
                             <label className="mb-3 text-sm leading-none text-gray-800">Enter mobile number</label>
                             {/* <input type="number" tabIndex={0} aria-label="Enter user Address" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" onChange={(e)=>{const value= e.target.value;setnumber({...number,value})}} /> */}
                             <input type="number" tabIndex={0} aria-label="Enter user Address" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" onChange={(e)=>{ setnumber(e.target.value)} } value={number} />
                             <span className=''></span>
                       
                        </div>
                        {status? 
                         <div className="mt-12 md:flex items-center">
                         <div className="flex flex-col">
                              <label className="mb-3 text-sm leading-none text-gray-800">Enter the OTP</label>
                              <input type="password" aria-label="Enter the OTP " className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" onChange={(e)=>{ setotpnumber(e.target.value)} } value={otpnumber}/>
                              <span className=''></span>
                         </div>
                 
                     </div>:<div></div>}
                       
                      

                    


                       
                        <div className="mt-8">
                            {status?
                     
                            <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm font-semibold leading-none text-white focus:outline-none bg-slate-600 rounded hover:bg-slate-700 py-4 w-full" onClick={submitedotp} >
                              Submit otp
                            </button>:
                             <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm font-semibold leading-none text-white focus:outline-none bg-slate-600 rounded hover:bg-slate-700 py-4 w-full" onClick={submited} >
                             Submit number
                           </button>
                          
                          }
                            {/* {error?
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-200-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                  <span className="font-medium">Not a valid number</span> 
                </div>:<div></div>} */}
                        
                         

                        </div>
                        <div className='mt-8'>
                           <p className=' py-4 w-full text-red-800 ml-28' ></p>
                       </div>
                    </div>
                   
                </div>
            </div>

  )
}

export default Mobileverification