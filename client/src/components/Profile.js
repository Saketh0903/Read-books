import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {
    let userData = useSelector((state) => state.user.userData);
    let [files, setFiles] = useState([]);

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
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-8 w-full max-w-lg">
                <div className="relative">
                    <div className="bg-gray-600 h-52 w-52 rounded-full overflow-hidden border-4 border-gray-300">
                        <img className="h-full w-full object-cover" src={userData.profileImage} alt="Profile" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-center">
                    <h1 className="text-gray-800 font-extrabold text-4xl">{`${userData.firstName} ${userData.lastName}`}</h1>
                    <h3 className="text-gray-500 font-medium text-xl mt-2">@{userData.userName}</h3>
                    <p className="text-gray-600 mt-2 max-w-xs">{userData.userBio}</p>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-inner">
                    <p className="text-gray-500 text-lg">Number of uploads</p>
                    <h1 className="text-gray-800 font-bold text-5xl">{files?.length}</h1>
                </div>
                <Link to="/files" className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-lg font-semibold mt-4">
                    View Files
                </Link>
            </div>
        </div>
    );
}

export default Profile;
