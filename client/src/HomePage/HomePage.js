import React from "react";

//----Movie Imports---
import MovieCollection from "../Movies/MovieCollection";
import TVSeriesCollection from "../TV_Series/TVSeriesCollection";

function HomePage({moviesData, tvSeriesData}){


    let comedyMoviesFiltered = moviesData.filter((item => item.genres.toLowerCase().includes("comedy")))

    // console.log(moviesData)

    console.log("The Filtered Comedy Movies:", comedyMoviesFiltered)





    return(
        <>
        <div className="flex-grow ml-4">
        
            <div className="mx-auto px-4 sm:mt-24 sm:px-6 md:mt-32 lg:px-8 xl:flex xl:items-center xl:justify-between
                max-w-7xl"
                style={{ backgroundImage: "url(https://wallpapers.com/images/hd/all-superhero-of-avengers-8umq9c3bffyuqmpb.jpg)",
                         backgroundPosition: "top",
                         backgroundSize: "cover"
                        }}
                >
            {/* need a better height adjustment */}
            <div className="lg:text-left lg:flex-grow">
                <p className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl xl:text-7xl">Best TV
                    shows and Movies right on your fingertips</p>
                <p className="mt-3 text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl max-w-md">Join us to
                    access thousands of amazing titles wherever you go. You can stream from your phone, tablet, or smart TV. No
                    commercials. No annual contracts.</p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start xl:mt-10">
                <div className="rounded-md shadow">
                    <button fontFamily="Arial" type="submit" className="flex border border-transparent hover:bg-indigo-500 w-full
                        items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-md md:py-4
                        md:text-lg md:px-10 xl:text-xl xl:px-12">Sign up</button>
                </div>
                </div>
            </div>

            {/* <div className="mt-3 mx-auto sm:max-w-lg lg:max-w-none lg:w-96 lg:ml-10 xl:ml-16 max-w-md">
                <img src="https://placehold.co/500x500" alt="Placeholder image showing streaming interface displayed on tablet."
                    className="object-cover w-full h-full"/>
            </div> */}

            </div>

            <div className="bg-white items-center justify-center text-gray-800 flex flex-col mt-8"> 
            <div class="relative flex py-5 items-center">
                <div class="flex-grow ">🎞️🎞️🎞️🎞️🎞️🎞️🎞️🎞️</div>
                <span class="flex-shrink mx-4 text-gray-400">The Latest</span>
                <div class="flex-grow ">🎞️🎞️🎞️🎞️🎞️🎞️🎞️🎞️</div>
            </div>

            </div>

        <div className="bg-white text-gray-800 flex flex-col min-h-screen">

            {/* Add a divider */}
            {/* <img src="https://placehold.co/200x50" alt="Logo of the streaming service" className="mb-8 h-12"/> */}


            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold mb-8 px-4">Introducing Next Level
                Streaming</p>
            <p className="text-lg mb-10 px-4 text-center">Stream your favourite TV Shows, Movies, Live Sports and much more at your
                comfort. Join the streaming revolution.</p>
        
            {/* <img src="https://placehold.co/800x500" alt="Placeholder image featuring screenshots of various movies and TV
            shows available on the streaming service." className="object-cover rounded-lg shadow-xl"/> */}

            {/* <div className="mb-6 px-4">

                <MovieCollection moviesData={moviesData}/>

                
                <TVSeriesCollection tvSeriesData={tvSeriesData}/>


            </div> */}

            <div className="mb-6 px-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                    <span className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase">Comedy</span>
                    <MovieCollection moviesData={comedyMoviesFiltered}/>
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">Drama</span>
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">Action</span>
                </div>
            </div>

            <div>
            <button fontFamily="Arial" type="submit" className="hover:bg-indigo-500 bg-indigo-600 rounded-lg shadow-lg text-white
                font-bold py-3 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16">Start Your Free Trial</button>
            </div>

            
        </div>
        </div>

        </>
    )
}

export default HomePage;


{/* <div className="flex-grow ml-4">
<p className="text-3xl font-bold underline ml-4"> Home Page</p>


<MovieCollection moviesData={moviesData}/>
<TVSeriesCollection tvSeriesData={tvSeriesData}/>


</div> */}