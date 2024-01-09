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


    return(
        <div>
            {fullMovie?.director}
            <br/>
            {fullMovie?.title}
            <br/>
            <img
            src={fullMovie?.thumbnail}
            />
            <br/>
            {fullMovie?.genres}
            <br/>
            {fullMovie?.motion_picture_rating}
            <br/>
            {fullMovie?.summary}
            <br/>
            {fullMovie?.stars}
            <br/>

        </div>
    )
}

export default MovieDisplay;