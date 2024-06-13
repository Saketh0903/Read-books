import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
    const userData = useSelector((state) => state.user.userData);
    const [files, setFiles] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    let navigate = useNavigate();
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
        { value: 'childrens', label: "Children's" },
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

    function handleClick(element) {
        navigate("/bookdetails", { state: element });
    }

    const tagColors = {
        'fiction': 'bg-red-100 text-red-600',
        'non-fiction': 'bg-gray-100 text-gray-600',
        'mystery': 'bg-purple-100 text-purple-600',
        'thriller': 'bg-black-100 text-black-600',
        'romance': 'bg-pink-100 text-pink-600',
        'science-fiction': 'bg-teal-100 text-teal-600',
        'fantasy': 'bg-indigo-100 text-indigo-600',
        'horror': 'bg-red-700 text-white',
        'historical': 'bg-yellow-100 text-yellow-600',
        'biography': 'bg-blue-100 text-blue-600',
        'memoir': 'bg-amber-100 text-amber-600',
        'self-help': 'bg-green-100 text-green-600',
        'young-adult': 'bg-orange-100 text-orange-600',
        'childrens': 'bg-lime-100 text-lime-600',
        'classics': 'bg-violet-100 text-violet-600',
        'adventure': 'bg-emerald-100 text-emerald-600',
        'crime': 'bg-cyan-100 text-cyan-600',
        'drama': 'bg-rose-100 text-rose-600',
        'education': 'bg-indigo-100 text-indigo-600',
        'family': 'bg-teal-100 text-teal-600',
        'friendship': 'bg-amber-100 text-amber-600',
        'health': 'bg-lime-100 text-lime-600',
        'history': 'bg-yellow-100 text-yellow-600',
        'humor': 'bg-orange-100 text-orange-600',
        'love': 'bg-pink-100 text-pink-600',
        'politics': 'bg-red-100 text-red-600',
        'psychology': 'bg-blue-100 text-blue-600',
        'religion': 'bg-gray-100 text-gray-600',
        'science': 'bg-green-100 text-green-600',
        'sports': 'bg-emerald-100 text-emerald-600',
        'technology': 'bg-teal-100 text-teal-600',
        'travel': 'bg-indigo-100 text-indigo-600',
        'new-release': 'bg-purple-100 text-purple-600',
        'best-seller': 'bg-yellow-100 text-yellow-600',
        'award-winner': 'bg-amber-100 text-amber-600',
        'short-story': 'bg-pink-100 text-pink-600',
        'series': 'bg-blue-100 text-blue-600',
        'standalone': 'bg-green-100 text-green-600',
        'audiobook': 'bg-red-100 text-red-600',
        'ebook': 'bg-gray-100 text-gray-600',
        'paperback': 'bg-yellow-100 text-yellow-600',
        'hardcover': 'bg-purple-100 text-purple-600'
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/notes/getFiles', {
                    fileName: null,
                    tags: null
                });
                setBooksData(res.data.data);
                setFiles(res.data.data);
            } catch (err) {
                console.log({ error: err.message });
            }
        };
        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterFiles(e.target.value, selectedTags);
    };

    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
        filterFiles(searchTerm, selectedOptions);
    };

    const filterFiles = (term, tags) => {
        setFiles(booksData.filter((element) => {
            const matchesSearchTerm = element.fileName.toLowerCase().includes(term.toLowerCase());
            const matchesTags = tags.length === 0 || tags.every(tag => element.tags.split(',').includes(tag.value));
            return matchesSearchTerm && matchesTags;
        }));
    };

    return (
        <div style={{ minHeight: "calc(100vh - 80px)" }} className="flex flex-col justify-start items-center gap-8 p-4 bg-gray-100">
            <div className="flex items-center justify-center w-full">
                <form className="border rounded-lg shadow-md bg-white flex flex-col gap-4 p-4 w-full max-w-2xl">
                    <div className="flex justify-center gap-2 items-center w-full border p-2 rounded-md border-gray-300">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            className="outline-none w-full"
                            onChange={handleSearchChange}
                            placeholder="Search for books"
                            value={searchTerm}
                        />
                    </div>
                    <div className="flex justify-center gap-2 items-center w-full">
                        <Select
                            isMulti
                            name="tags"
                            options={tagOptions}
                            className="basic-multi-select w-full"
                            classNamePrefix="select"
                            value={selectedTags}
                            onChange={handleTagChange}
                            placeholder="Filter by tags"
                        />
                    </div>
                </form>
            </div>

            <div className="w-full grid gap-8 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {files?.map((element, index) => (
                    <div key={index} className="card border border-gray-300 rounded-lg overflow-hidden relative mx-auto shadow-md transition-transform transform hover:scale-105">
                        <img src={element.thumbnail} alt="Thumbnail" className="w-full aspect-[3/4] object-cover" />
                        <div className="absolute bottom-0 left-0 h-full w-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center text-white">
                            <div className="w-full p-4 bg-black bg-opacity-70 h-[70%] flex flex-col justify-center items-center">
                                <h3 className="text-lg font-bold">{element.fileName}</h3>
                                <p className="text-sm text-gray-200">
                                    {element.fileDescription.length > 80
                                        ? element.fileDescription.substring(0, 80) + '...'
                                        : element.fileDescription}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {element.tags.split(',').map((tag, index) => (
                                        <span key={index} className={`${tagColors[tag]} rounded px-2 py-1 text-xs`}>{tag}</span>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2 mt-4">
                                    <a href={element.file} target='_blank' rel='noopener noreferrer'>
                                        <button className="p-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                                            Read Book
                                        </button>
                                    </a>
                                    <button onClick={() => handleClick(element)} className="p-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Searchbar;
