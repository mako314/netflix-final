import React from "react";

//----Movie Imports---
import MovieCollection from "../Movies/MovieCollection";

function HomePage({moviesData}){

    return(
        <div className='flex-grow p-4'>
        <p> Home Page </p>
        <div className='flex-grow p-4'> 
        <MovieCollection moviesData={moviesData}/>
        </div>
        </div>
    )
}

export default HomePage;