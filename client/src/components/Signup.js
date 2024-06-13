import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import axios from 'axios'

function Signup() {
    let { register, handleSubmit, formState: { errors }, reset } = useForm()
    let [file, setFile] = useState()
    let [imageurl, setImageurl] = useState('')
    let [image, setImage] = useState()
    async function onFormSubmit(userCredentialObj) {
        try{
            console.log(userCredentialObj)
            userCredentialObj.profileImage=image
            setImage(null)
            setImageurl('')
            reset()
            const result=await axios.post("http://localhost:4000/auth/signup",userCredentialObj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(result)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if (image) {
            setImageurl(URL.createObjectURL(image))
        }
        return () => {
            if (imageurl) {
                URL.revokeObjectURL(imageurl)
            }
        }
    }, [image])

    function handleImageChange(e) {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    }

    return (
        <div style={{ minHeight: "calc(100vh - 80px)", width: "100%" }} className="flex flex-col justify-center py-10">
            <form onSubmit={handleSubmit(onFormSubmit)} action="" className="w-[90%] md:w-[60%] shadow-black shadow-sm p-[30px] mx-auto">
                <h1 className="text-3xl font-bold text-start my-3">Signup</h1>
                <div className='flex justify-between w-full gap-x-[50px] flex-wrap sm:flex-nowrap'>
                    <div className="mt-2 w-full">
                        <label htmlFor="firstName" className="block text-start text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                {...register('firstName', { required: true })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter first name"
                            />
                        </div>
                        {(errors.firstName?.type === 'required') && <p className='text-red-500'>The first name is required</p>}
                    </div>
                    <div className="mt-2 w-full">
                        <label htmlFor="lastName" className="block text-start text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                {...register('lastName', { required: true })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter last name"
                            />
                        </div>
                        {(errors.lastName?.type === 'required') && <p className='text-red-500'>The last name is required</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <label htmlFor="userBio" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        User Bio
                    </label>
                    <div className="mt-2">
                        <textarea
                            name="userBio"
                            id="userBio"
                            {...register('userBio', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter Userbio"
                        />
                    </div>
                    {(errors.userBio?.type === 'required') && <p className='text-red-500'>Userbio is required</p>}
                </div>
                <div className="mt-2">
                    <label htmlFor="email" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        EmailID
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            {...register('userEmail', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter email"
                        />
                    </div>
                    {(errors.email?.type === 'required') && <p className='text-red-500'>The email field is required</p>}
                </div>
                <div className="mt-2">
                    <label htmlFor="userMobile" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        Mobile Number
                    </label>
                    <div className="mt-2">
                        <input
                            type="tel"
                            name="userMobile"
                            id="userMobile"
                            {...register('userMobile', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your mobile number"
                        />
                    </div>
                    {(errors.userMobile?.type === 'required') && <p className='text-red-500'>The mobile number is required</p>}
                </div>
                <div className="mt-2">
                    <label htmlFor="userName" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            {...register('userName', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter username"
                        />
                    </div>
                    {(errors.userName?.type === 'required') && <p className='text-red-500'>The username is required</p>}
                </div>
                <div className="mt-2">
                    <label htmlFor="password" className="block text-start text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            {...register('userPassword', { required: true })}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter password"
                        />
                    </div>
                    {(errors.password?.type === 'required') && <p className='text-red-500'>The password field is required</p>}
                </div>
                <div className="flex flex-col justify-start items-center">
                    <div className="mt-2 w-[200px] h-[200px] rounded-full border">
                        {imageurl && (
                            <img className="w-[200px] h-[200px] rounded-full overflow-none object-cover" src={imageurl} alt="Profile preview" />
                        )}
                    </div>
                    <div className="mt-2 w-full">
                        <label htmlFor="file-upload" className="block text-start text-sm font-medium leading-6 text-gray-900">
                            File
                        
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 p-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative text-start cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input 

                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            accept="image/jpg, image/jpeg"
                                            {...register('file', { required: true })}
                                            className="sr-only focus:outline-none active:outline-none outline-none"
                                            onChange={(e) => {
                                                setImageurl(
                                                    URL.createObjectURL(e.target.files[0]),
                                                );
                                                setImage(e.target.files[0]);
                                            }}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">Upload a PDF</p>
                            </div>
                            {(errors.file?.type === 'required') && <p className='text-red-500'>The file field is required</p>}
                        </div>
                        </label>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Signup
                    </button>
                </div>
                <div className='flex justify-center gap-[10px]'>
                    <span>Already have an account?</span>
                    <span><Link to="/login">Login</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Signup;
