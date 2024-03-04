import React from "react";
import { Link, useNavigate} from 'react-router-dom';
import { CurrentUserContext } from '../UserLogin/UserContext'
import SearchBar from "./SearchBar";


function Navbar({setSearchTerm, searchTerm}){

    // const { currentUser, currentUserRole } = CurrentUserContext(); 

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the search operation here or navigate to the search results page
        navigate(`/search?query=${searchTerm}`); // Example of navigation with search term
    }

    // A tags cause refresh
    console.log("The search term:", searchTerm)

    return(
        <nav className="w-28 min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="w-28 h-full flex flex-col">
            <a href="/" className="text-center py-3 text-red-800 text-lg font-bold">Definitely Not Netflix</a>

            <ul className="mt-2">
                <li className="px-5 py-3 hover:bg-red-800">
                    <Link to={'/movies'} className="flex items-center">
                        Movies
                        {/* <img src="https://placehold.co/20" className="inline-block ml-2"/> */}
                    </Link>
                </li>
                <li className="px-5 py-3 hover:bg-red-800">
                <Link to={'/tv-series'} className="flex items-center">
                        TV
                        {/* <img src="https://placehold.co/20" className="inline-block ml-2"/> */}
                </Link>
                    
                </li>
                <li className="px-5 py-3 hover:bg-red-800">
                    <a href="#" className="flex items-center">
                        Sign In
                        {/* <img src="https://placehold.co/20" className="inline-block ml-2"/> */}
                    </a>
                </li>

                {/* { currentUserRole === 'admin' &&
                    <li className="px-5 py-3 hover:bg-red-800">
                        <Link to={'/admin'} className="flex items-center">
                            Admin Dashboard
                        </Link>
                    </li>
                } */}

                <form onSubmit={handleSubmit}>
                    <SearchBar handleChange={(e) => setSearchTerm(e.target.value)} searchTerm={searchTerm}/>
                </form>
                
            </ul>
        </div>
    </nav>
    )
}

export default Navbar