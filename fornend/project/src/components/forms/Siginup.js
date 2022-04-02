import React from 'react'
import {useState } from 'react'
import validator from "@brocode/simple-react-form-validation-helper";
import axios from 'axios';
import {useNavigate} from  'react-router-dom'

function Siginup() {
    const [name,setname]=useState("")
    const [errorname,errorsetname]=useState("")
    const[email,setemail]=useState("")
    const [errormail,errorsetemail]=useState("")
    const[phone,setphone]=useState("")
    const [errorphone,errorsetphone]=useState("")
    const[password,setPassword]=useState("")
    const [errorpassword,errorsetpassword]=useState("")
    const [message,setmessage]=useState()
    const[errormssg,seterrmsg]=useState("")
    const [customError , setCustomError] = useState('')
    const navigate=useNavigate()
    console.log(errormssg)

    const userinformation=(event)=>{
        if(name == "" || password == "" || email == "" || phone == "") {
            setCustomError('Please fill all fields ..')
            event.preventDefault();
            return;

        }
      const data={"username":name,"password":password,"email":email,"mobile_number":phone}
    
        console.log("button clicked ")
        axios.post('http://127.0.0.1:8000/siginup',data
        ).then((Response)=>{
            console.log("this is then ")
            console.log("this is then ...")
            navigate("/otp")
    
        }).catch((e)=>{
            console.log("this is catch")
            console.log(e)
            setmessage("Username and Phonenumber is already exit ")
        })

    }
    console.log( errorname)
    



  return (
    <div>
      <div>
            <div className="w-full bg-white p-10">
               
                <h1 tabIndex={0} role="heading" aria-label="profile information" className="focus:outline-none text-3xl font-bold text-gray-800 mt-12">
                    Profile info
                </h1>
                <p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4">
                    plese fill your details
                </p>
                <h2 role="heading" aria-label="enter Personal data" className="text-xl font-semibold leading-7 text-gray-800 mt-10">
                    Personal data
                </h2>
                
                <div className="mt-8   md:flex items-center">
                    <div className="flex flex-col">
                        <label className="mb-3 text-sm leading-none text-gray-800"> Name</label>
                        <input type="text"   className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" 
                         onChange={(e)=>{setname(e.target.value) ; validator.nameInputBlurHandler(e.target.value,errorsetname)}  } value={name}   />
                            <span className="text-danger fs-6">{errorname}</span>
                            <p style={{color : 'red'}} > {customError}</p>
                           
                    </div>
                    {/* <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                        <label className="mb-3 text-sm leading-none text-gray-800">Last name</label>
                        <input type="name" tabIndex={0} aria-label="Enter last name" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"  />
                    </div> */}
                </div>
                <div className="mt-12 md:flex items-center">
                    <div className="flex flex-col ">
                        <label className="mb-3 text-sm leading-none text-gray-800">Email Address</label>
                        <input type="email" tabIndex={0} aria-label="Enter email Address" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" 
                         onChange={(e)=>{setemail(e.target.value);validator.emailInputBlurHandler(e.target.value,errorsetemail) }}   value={email}  />
                         <span className=''>{errormail}</span>
                         <p style={{color : 'red'}} > {customError}</p>
                       
                    </div>
                    <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                        <label className="mb-3 text-sm leading-none text-gray-800">Phone number</label>
                        <input type="number" tabIndex={0} aria-label="Enter phone number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" 
                         onChange={(e)=>{setphone(e.target.value);validator.phoneInputBlurHandler(e.target.value,errorsetphone)}}  value={phone} />
                          <span className=''>{errorphone}</span>
                          <p style={{color : 'red'}} > {customError}</p>
                    </div>
                </div>
                <div className="mt-12 md:flex items-center">
                    <div className="flex flex-col">
                        <label className="mb-3 text-sm leading-none text-gray-800">PassWord</label>
                        <input type="password" aria-label="Enter the password " className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                         onChange={(e)=>{setPassword(e.target.value);validator.passwordInputBlurHandler(e.target.value,errorsetpassword)}}  value={password} />
                          <span className=''>{errorpassword}</span>
                          <p style={{color : 'red'}} > {customError}</p>
                    </div>
                   
                </div>
                <div className="mt-12">
                    <div className="py-4 flex items-center">
                        {/* <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input type="checkbox" tabIndex={0} aria-label="I agree with the terms of service" defaultChecked className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                            <div className="check-icon hidden bg-blue-500 text-white rounded-sm">
                               
                            </div>
                        </div> */}
                        <h4 className="text-sm leading-none ml-2">
                            if your are already a user  ?  <span className="text-indigo-700"><button onClick={()=>{navigate("/login")}}>Login</button></span>
                        </h4>
                       
                       
                    </div>
                </div>
                <p style={{color : 'red'}} > {customError}</p>
                <button role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"  onClick={userinformation}>
                    <span className="text-sm font-medium text-center text-gray-800 capitalize" >Submit</span>
                </button>
                <div className='mt-4'>
                {message?<p>{message}</p>:<p></p>}
                </div>
                {errormssg?<p>{errormail}</p>:<p></p>}
               
               
            </div>
           
            {/* <style dangerouslySetInnerHTML={{ __html: "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      " }} /> */}
        </div>
    </div>
  )
}

export default Siginup