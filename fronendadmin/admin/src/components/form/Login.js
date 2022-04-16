import React from 'react'
import  { useState ,useEffect} from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie'
import validator from "@brocode/simple-react-form-validation-helper";
import {useNavigate} from 'react-router-dom'

function Login() {
    const [sidebar, setsidebar] = useState();
    const [name,setName]=useState("");
    const [errorname,seterrorname]=useState("")
    const [password,setpassword]=useState("")
    const data={"username":name,"password":password}
    const [token, setToken]=useCookies(['mytoken'])
    const [error, seterror] = useState(false)
    const navigate=useNavigate()
     
    
    useEffect(()=>{
        if (token['mytoken']){
            navigate('/dashboard')
            console.log("this is token")
        }
    },[token])

    const sigin=(e)=>{
        if (name=="" || password==""){
            console.log("this isnull")
            seterror(true)
            e.preventDefault()
            return
        }
        console.log("buttton clicked ")
        axios.post('http://127.0.0.1:8000/user/token/',data).then((Response)=>{
            console.log(Response.data)
            setToken('mytoken',Response.data.access)
            navigate("/Listuser");

            console.log(token["mytoken"])
 
        }).catch((error)=>{
            console.log("this is an error")
           
        })
    }
    
    
    console.log(name,password);
  return (
    <div>

<div className="h-screen bg-gradient-to-tl from-slate-50 to-slate-800 w-full py-16 px-4">
            <div className="flex flex-col items-center justify-center">
              
                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">
                        Admin Sigin
                    </p>
                    
                  
                   
                   
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                     
                        <hr className="w-full bg-gray-400  " />
                    </div>
                    <div>
                        <lable className="text-sm font-medium leading-none text-gray-800">Username</lable>
                        {/* <input aria-label="enter email adress" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" onChange={(e)=>{setName(e.target.value),validator.nameInputBlurHandler(e.target.value,seterrorname)}} value={name}/> */}
                        <input type="text"   className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" 
                         onChange={(e)=>{setName(e.target.value) ; seterror(false) ;validator.nameInputBlurHandler(e.target.value,seterrorname)}  } value={name}   />
                            <span style={{color:"red"}}>{errorname}</span>
                        
                    </div>
                    <div className="mt-6  w-full">
                        <lable className="text-sm font-medium leading-none text-gray-800">Password</lable>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter Password" role="input" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" onChange={(e)=>{setpassword(e.target.value);seterror(false)}} value={password} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full" onClick={sigin}>
                            Sigin 
                        </button>
                        {error&&<p className='text-red-400 pt-8'>plse fill this form </p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login