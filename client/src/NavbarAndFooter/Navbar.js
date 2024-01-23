import React from "react";
import { Link, useNavigate} from 'react-router-dom';

function Navbar(){

    const navigate = useNavigate();

    return(
        <nav className="w-56 h-screen bg-gray-900 text-white flex flex-col">
        <div className="w-56 h-full flex flex-col">
            <a href="/" className="text-center py-3 text-red-800 text-lg font-bold">Netflix</a>

            <ul className="mt-2">
                <li className="px-5 py-3 hover:bg-red-800">
                    <Link to={'/movies'} className="flex items-center">
                        Movie with Link
                        <img src="https://placehold.co/20" className="inline-block ml-2"/>
                    </Link>
                </li>
                <li className="px-5 py-3 hover:bg-red-800">
                    <a href="/movies" className="flex items-center">
                        Movie with A tag
                        <img src="https://placehold.co/20" className="inline-block ml-2"/>
                    </a>
                </li>
                <li className="px-5 py-3 hover:bg-red-800">
                    <a href="#" className="flex items-center">
                        Menu 3
                        <img src="https://placehold.co/20" className="inline-block ml-2"/>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar