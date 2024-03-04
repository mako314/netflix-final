import React from "react"

function SearchBar({handleChange, searchTerm}){



    return(
<div className="flex justify-center p-4">
            <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                value={searchTerm}
                className="w-full p-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    )
}

export default SearchBar;