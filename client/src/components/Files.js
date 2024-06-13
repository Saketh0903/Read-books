import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Files() {
    const userData = useSelector((state) => state.user.userData);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/notes/getFiles/${userData._id}`);
                setFiles(res.data.data);
            } catch (err) {
                console.log({ error: err.message });
            }
        };
        getData();
    }, [userData._id]);

    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files?.map((element, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between items-start">
                            {element.thumbnail && (
                                <img src={element.thumbnail} alt={element.fileName} className="mb-4 w-full h-40 object-cover rounded" />
                            )}
                            <p className="mb-4 text-gray-700">
                                FileName: <span className="font-bold">{element.fileName}</span>
                            </p>
                            <a href={element.file} target="_blank" rel="noopener noreferrer">
                                <button className="py-2 px-4 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200">
                                    Open File
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Files;
