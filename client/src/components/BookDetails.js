import React from 'react';
import { useLocation } from 'react-router-dom';

function BookDetails() {
    let { state } = useLocation();

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto flex flex-wrap sm:flex-nowrap justify-center items-start gap-12">
                <div className="w-full sm:w-1/2">
                    <img 
                        src={state.thumbnail} 
                        alt={state.fileName} 
                        className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-6">
                    <h2 className="text-4xl font-extrabold text-gray-900">{state.fileName}</h2>
                    <div className="description">
                        <h3 className="text-2xl font-semibold text-gray-800">Description</h3>
                        <p className="text-left text-gray-700 mt-2 leading-relaxed">{state.fileDescription}</p>
                    </div>
                    <div className="tags flex flex-wrap gap-3 mt-4">
                        <h4 className="text-xl font-medium text-gray-800">Tags:</h4>
                        {state.tags.split(',').map((tag, index) => (
                            <span 
                                key={index} 
                                className="text-lg font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
