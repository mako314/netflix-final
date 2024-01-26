import React from "react";

//----Movie Imports---
import MovieCollection from "../Movies/MovieCollection";

function HomePage({moviesData}){

    

    return(
        <>
        <div className="flex-grow ml-4">
        <p className="text-3xl font-bold underline ml-4"> Home Page</p>

        
        <MovieCollection moviesData={moviesData}/>

    
        </div>
        </>
    )
}

export default HomePage;