import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function TVSeriesDisplay({tvSeriesData}){
 
    const location = useLocation()
    const { fullTVSeries } = location.state || {}

    console.log("IN TV SERIES DISPLAY:", fullTVSeries)

    return(
        <div>
            {fullTVSeries?.director}
            <br/>

            {fullTVSeries?.title}
            <br/>

            <img
                src={fullTVSeries?.thumbnail}
            />  
            <br/>

            {fullTVSeries?.genres}
            <br/>

            {fullTVSeries?.motion_picture_rating}
            <br/>

            {fullTVSeries?.summary}
            <br/>

            {fullTVSeries?.stars}
            <br/>

        </div>
    )
}

export default TVSeriesDisplay;