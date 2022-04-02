import React from 'react'
import {useState,useEffect } from 'react'
import validator from "@brocode/simple-react-form-validation-helper";
import axios from 'axios';
import {Link, useNavigate} from  'react-router-dom'
import {useCookies} from 'react-cookie'
function Login() {
    const[username,setusername]=useState("")
    const [errorname,errorsetname]=useState("")
    const[password,setPassword]=useState("")
    const [errorpassword,errorsetpassword]=useState("")
    const[notUser,setnotUser]=useState("")
    const navigate=useNavigate()
    const [token, setToken]=useCookies(['mytoken'])
    const[prevent,setPrevent]=useState("")

   
      
   useEffect(()=>{
       if (token['mytoken']){
           navigate('/')
       }
   },[token])


   const Loginform=(e)=>{
       if (username == "" || password == ""){
           console.log("prevent avundee....")
           setPrevent("plse fill the fields")
           e.preventDefault();
          return
       }
      
       const userdata={"username":username,"password":password}
       console.log(userdata)
       axios.post('http://127.0.0.1:8000/user/token/',userdata).then((Response)=>{
           console.log ('this is post ')
           console.log(Response.data)
           setToken('mytoken',Response.data.access)
           localStorage.setItem("name",Response.data.username)
           localStorage.setItem("userid",Response.data.id)
           console.log(token["mytoken"])

       }).catch((error)=>{
           console.log("this is an error")
           setnotUser("Not a valid User")
       })
       

   }

  return (
    <div>
          

<div className="bg-indigo-50">
                <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                 
                    <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
                        <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Login to your account
                        </p>
                        {/* <p tabIndex={0} className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                            Dont have account?
                            <Link to={"/siginup"}><button  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"  >
                               
                               Sign up here
                           </button></Link>
                        </p> */}
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
                            <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>
                            <hr className="w-full bg-gray-400" />
                        </div>
                       
                
                        <div className="flex flex-col ">
                             <label className="mb-3 text-sm leading-none text-gray-800">Enter UserName</label>
                             <input type="text" tabIndex={0} aria-label="Enter user Address" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" 
                              onChange={(e)=>{setusername(e.target.value);validator.nameInputBlurHandler(e.target.value,errorsetname) }}   value={username}  />
                             <span className=''>{errorname}</span>
                       
                        </div>
                        <div className="mt-12 md:flex items-center">
                           <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">PassWord</label>
                                <input type="password" aria-label="Enter the password " className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                                onChange={(e)=>{setPassword(e.target.value);validator.passwordInputBlurHandler(e.target.value,errorsetpassword)}}  value={password} />
                                <span className=''>{errorpassword}</span>
                           </div>
                   
                       </div>
                      

                    


                       
                        <div className="mt-8">
                     
                            <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm font-semibold leading-none text-white focus:outline-none bg-slate-600 rounded hover:bg-slate-700 py-4 w-full" onClick={Loginform}>
                              Login to 
                            </button>
                            <div className='mt-4'>
                                {notUser?<p>{notUser}</p>:<p></p>}
                            </div>

                        </div>
                        <div className='mt-8'>
                           <p className=' py-4 w-full text-red-800 ml-28' > {prevent}</p>
                       </div>
                    </div>
                   
                </div>
            </div>

    </div>
  )
}

export default Login