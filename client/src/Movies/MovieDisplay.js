import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function MovieDisplay({moviesData}){
    // const { id } = useParams()
    // const movieIndexValue = id - 1

    // console.log("THE MOVIE ID:", id)
    // console.log("movie index value:", movieIndexValue)
    // const navigate = useNavigate()

    const location = useLocation()
    const { fullMovie } = location.state || {}

    // const fullMovie = moviesData[movieIndexValue]

    console.log("IN MOVIE DISPLAY:", fullMovie)


    return (
        <div className="flex flex-grow items-center justify-center bg-white min-h-screen">
            <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full overflow-hidden m-4">
                {/* Video Section */}
                {/* <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
                    <video
                        controls
                        onLoadedMetadata={(e) => e.target.volume = 0.2}
                        className="w-full h-auto"
                        aria-label={`Watch ${fullMovie.title}`}
                    >
                        <source src="https://d3th70t1rge79u.cloudfront.net/arthur/001-ArthurEyes.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div> */}
    
                {/* Movie Details */}
                <div className="p-4 lg:p-8">
                    <p className="text-gray-900 text-2xl lg:text-4xl font-bold mb-2">{fullMovie.title}, {fullMovie.year_of_release}</p>
                    <p className="mt-2 text-gray-600">{fullMovie.summary}</p>
                </div>
    
                {/* Additional Information */}
                <div className="bg-gray-100 p-4 lg:p-8">
                    <p className="text-gray-700 font-bold">Run time: {fullMovie.run_time}</p>
                    <p>Writer: {fullMovie.writer}</p>
                    <p>Stars: {fullMovie.stars}</p>
                    <p className="mt-4 text-indigo-500 font-semibold">{fullMovie.genres}</p>
                </div>
    
                {/* Action Button */}
                <div className="flex justify-center p-4 lg:p-8 bg-gray-200">
                    <button
                        type="button"
                        className="rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2 bg-indigo-500 text-white text-lg transition duration-150 ease-in-out"
                    >
                        Watch Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDisplay;

