import React from 'react'
import { useForm } from "react-hook-form"
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Select from 'react-select'


function Upload() {

    let { register, handleSubmit, formState: { errors }, reset } = useForm()
    let [file, setFile]=useState(null)
    let [selectedTags, setSelectedTags] = useState([])
    let userData=useSelector((state)=>state.user.userData)
    let [image, setImage] = useState(null);
    let [imageUrl, setImageUrl] = useState('');
    let uploadedBy=userData._id
    const tagOptions = [
        { value: 'fiction', label: 'Fiction' },
        { value: 'non-fiction', label: 'Non-Fiction' },
        { value: 'mystery', label: 'Mystery' },
        { value: 'thriller', label: 'Thriller' },
        { value: 'romance', label: 'Romance' },
        { value: 'science-fiction', label: 'Science Fiction' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'horror', label: 'Horror' },
        { value: 'historical', label: 'Historical' },
        { value: 'biography', label: 'Biography' },
        { value: 'memoir', label: 'Memoir' },
        { value: 'self-help', label: 'Self-Help' },
        { value: 'young-adult', label: 'Young Adult' },
        { value: 'childrens', label: 'Children\'s' },
        { value: 'classics', label: 'Classics' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'crime', label: 'Crime' },
        { value: 'drama', label: 'Drama' },
        { value: 'education', label: 'Education' },
        { value: 'family', label: 'Family' },
        { value: 'friendship', label: 'Friendship' },
        { value: 'health', label: 'Health' },
        { value: 'history', label: 'History' },
        { value: 'humor', label: 'Humor' },
        { value: 'love', label: 'Love' },
        { value: 'politics', label: 'Politics' },
        { value: 'psychology', label: 'Psychology' },
        { value: 'religion', label: 'Religion' },
        { value: 'science', label: 'Science' },
        { value: 'sports', label: 'Sports' },
        { value: 'technology', label: 'Technology' },
        { value: 'travel', label: 'Travel' },
        { value: 'new-release', label: 'New Release' },
        { value: 'best-seller', label: 'Best Seller' },
        { value: 'award-winner', label: 'Award Winner' },
        { value: 'short-story', label: 'Short Story' },
        { value: 'series', label: 'Series' },
        { value: 'standalone', label: 'Standalone' },
        { value: 'audiobook', label: 'Audiobook' },
        { value: 'ebook', label: 'E-book' },
        { value: 'paperback', label: 'Paperback' },
        { value: 'hardcover', label: 'Hardcover' }
    ];
    
    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [image, imageUrl]);
    async function onSubmit(data) {
        try{
            data.file=file;
            data.thumbnail=image
            data.uploadedBy=uploadedBy
            data.tags = selectedTags.map((element)=>element.value).join()
            console.log(data)
            let result=await axios.post("http://localhost:4000/notes/upload",data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            reset()
            setSelectedTags([])
            console.log(result)
            alert("File uploaded successfully")
        }
        catch(err){
            console.log(err)
        }
    };

    return (
        <div style={{minHeight:'calc(100vh - 80px)'}}>
            <form className="md:w-full p-10 w-[80vw] flex flex-col justify-start items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12 w-full">
                    <div>
                        <h2 className="text-xl font-bold">Upload Book</h2>


                        <div>
                            <div className="mt-2">
                                <label htmlFor="fileName" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="fileName"
                                        id="fileName"
                                        autoComplete="fileName"
                                        {...register('fileName',{required:true})}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter title"
                                    />
                                </div>
                                {(errors.fileName?.type==='required')&&<p className='text-red-500'>The title field is required</p>}
                            </div>


                            <div className="mt-2">
                                <label htmlFor="description" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="fileDescription"
                                        rows={3}
                                        {...register('fileDescription',{required:true})}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Write a description"
                                    />
                                </div>
                                {(errors.fileDescription?.type==='required')&&<p className='text-red-500'>The description field is required</p>}
                            </div>

                            <div className="mt-2">
                                <label htmlFor="tags" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                    Tags
                                </label>
                                <div className="mt-2">
                                    <Select
                                        isMulti
                                        name="tags"
                                        options={tagOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={selectedTags}
                                        onChange={setSelectedTags}
                                    />
                                </div>
                                {(errors.tags?.type === 'required') && <p className='text-red-500'>The tags field is required</p>}
                            </div>

                            <div className="mt-2">
                                <label htmlFor="file-upload" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                    File
                                </label>
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
                                                    type="file" accept="application/pdf"
                                                    onChange={(e)=>{setFile(e.target.files[0])}}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">Upload a PDF</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="thumbnail-upload" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail Image
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 p-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="thumbnail-upload"
                                                className="relative text-start cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a thumbnail</span>
                                                <input
                                                    id="thumbnail-upload"
                                                    name="thumbnail-upload"
                                                    type="file"
                                                    accept="image/jpg, image/jpeg"
                                                    onChange={(e) => {
                                                        setImage(e.target.files[0]);
                                                    }}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">Upload a JPG or JPEG image</p>
                                        {imageUrl && (
                                            <div className="mt-2">
                                                <img className="w-full h-auto rounded-md object-cover" src={imageUrl} alt="Thumbnail preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Upload