import React from "react";
import MovieCard from "./MovieCard";

function MovieCollection ({moviesData}){

    console.log("the data:", moviesData)

    // Consider image sizing, try to stick with 000x000 or whatever is decided

    const mappedMovieCards = moviesData?.map((movie) => {
        return (
        <div key={movie.id} className="p-2 md:w-1/4 group"> {/* Each item takes up 1/4th of the width */} 
        <MovieCard
        movieId={movie.id}
        thumbnail={movie.thumbnail}
        title={movie.title}
        director={movie.director}
        year_of_release={movie.year_of_release}
        run_time={movie.run_time}
        fullMovie={movie}
        />
        </div>
        )
    })

    return(
        <div>
    {/* <h1 className="text-3xl font-bold underline ml-4">
    Movies
    </h1> */}
    <div className="flex flex-wrap -m-2"> 
    {mappedMovieCards}
    </div>
        </div>
    )
}

export default MovieCollection