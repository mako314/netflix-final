import React from "react";
import MovieCard from "./MovieCard";

function MovieCollection ({moviesData}){

    console.log("the data:", moviesData)

    const mappedMovieCards = moviesData.map((movie) => {
        // <MovieCard
        
        // />
        console.log("Individual movie item:", movie)
    })

    return(
        <div>
    <h1 class="text-3xl font-bold underline">
    Movie Collection Page
    </h1>
        </div>
    )
}

export default MovieCollection