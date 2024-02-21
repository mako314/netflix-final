import React from "react";

//----Movie Imports---
import MovieCollection from "../Movies/MovieCollection";
import AllMoviesWithGenre from "../Movies/AllMoviesWithGenre";

import TVSeriesCollection from "../TV_Series/TVSeriesCollection";
import TVSeriesCarousel from "../TV_Series/TVSeriesCarousel";

function HomePage({moviesData, tvSeriesData}){

    return(
        <>
        <div className="flex-grow ml-4">
        
        <div class="bg-white pb-6 sm:pb-8 lg:pb-12 mt-8">

        <section class="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div class="mb-8 flex flex-wrap justify-between md:mb-16">
            <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                <h1 class="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">Introducing <br />Next Level Streaming</h1>

                <p class="max-w-md leading-relaxed text-gray-500 xl:text-lg">Stream your favourite TV Shows, Movies, Live Sports and much more at your
                comfort. Join the streaming revolution.</p>
            </div>

            <div class="mb-12 flex w-full md:mb-16 lg:w-2/3">
                <div class="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                <img src="https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&q=75&fit=crop&w=550&h=550" loading="lazy" alt="Photo by Kaung Htet" class="h-full w-full object-cover object-center" />
                </div>

                <div class="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <img src="https://images.unsplash.com/photo-1586295166487-b265f7e83a7f?auto=format&q=75&fit=crop&w=550&h=550" loading="lazy" alt="Photo by Manny Moreno" class="h-full w-full object-cover object-center" />
                </div>
            </div>
            </div>

        </section>
        </div>

        <div className="bg-white text-gray-800 flex flex-col min-h-screen">



            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold mb-8 px-4">Your Favorite Movies and Shows</p>
            <p className="text-lg mb-10 px-4 text-center" > Immerse yourself in an endless selection of cinematic hits and binge-worthy series, all available to stream at your leisure. Become a part of our streaming community today.</p>
        

                <div className="mb-6 px-4 rounded-lg">
                <div className="mb-8">
                    <span className="block text-2xl font-semibold text-gray-800 mb-4 ml-4 ">Movies</span>
                    <AllMoviesWithGenre moviesData={moviesData}/>
                </div>

                <div className="mt-12">
                    <span className="block text-2xl font-semibold text-gray-800 mb-4 ml-4 ">TV Series</span>
                    <TVSeriesCarousel tvSeriesData={tvSeriesData} homePage={true}/>
                </div>
                </div>

            {/* <div>
            <button fontFamily="Arial" type="submit" className="hover:bg-indigo-500 bg-indigo-600 rounded-lg shadow-lg text-white
                font-bold py-3 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16">Start Your Free Trial</button>
            </div> */}


        </div>
        </div>

        </>
    )
}

export default HomePage;