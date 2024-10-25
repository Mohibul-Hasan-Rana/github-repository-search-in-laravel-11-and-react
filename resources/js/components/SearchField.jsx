import React from "react";

const SearchField = ({ query, setQuery, searchRepositories }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchRepositories(1);
        }
    };
    return (
        <div className="flex justify-center mb-6">
            {/* Input Field */}
            <input
                type="text"
                className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search Repositories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Search Button */}
            <button
                onClick={() => searchRepositories(1)}
                className="ml-4 p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
                Search
            </button>
        </div>
    );
};

export default SearchField;
