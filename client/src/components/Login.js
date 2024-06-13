import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserData } from '../Redux/slices/user-slice'

function Login() {
    let { register, handleSubmit, formState: { errors }, reset } = useForm()
    let dispatch=useDispatch()
    let navigate=useNavigate()
    async function onFormSubmit(loginCredentials){
        try{
            let result=await axios.post("http://localhost:4000/auth/login",loginCredentials,{
                headers:{
                    "Content-Type":"Application/json"
                }
            })
            console.log(result)
            if(result.status===200){
                dispatch(setUserData(result.data))
                navigate("/search")
            }
            else{
                console.log("Invalid Password")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div style={{ height: "calc(100vh - 80px)", width: "100%" }} className="flex flex-col justify-center">
            <form onSubmit={handleSubmit(onFormSubmit)} action="" className="w-[90%] md:w-[60%] shadow-black shadow-sm p-[30px] mx-auto">
                <h1 className="text-3xl font-bold text-start my-3">Login</h1>
                <div className="mt-2">
                    <label htmlFor="email" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        EmailID
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            {...register('userEmail', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter email"
                        />
                    </div>
                    {(errors.email?.type === 'required') && <p className='text-red-500'>The email field is required</p>}
                </div>
                <div className="mt-2">
                    <label htmlFor="password" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            {...register('userPassword', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter password"
                        />
                    </div>
                    {(errors.password?.type === 'required') && <p className='text-red-500'>The password field is required</p>}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </button>
                </div>
                <div className='flex justify-center gap-[10px]'>
                    <span>New to this website?</span>
                    <span className='font-bold'><Link to="/signup">Create an account</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Login