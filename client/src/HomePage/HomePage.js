import React from "react";

//----Movie Imports---
import MovieCollection from "../Movies/MovieCollection";

function HomePage({moviesData}){

    return(
        <>
        <p> Home Page</p>
        <div> 
        <MovieCollection moviesData={moviesData}/>
        <div>
            hold tv series
        </div>
        </div>
        </>
    )
}

export default HomePage;