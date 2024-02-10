import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function TVSeriesDisplay({tvSeriesData}){
 
    const location = useLocation()
    const { fullTVSeries } = location.state || {}

    console.log("IN TV SERIES DISPLAY:", fullTVSeries)

    // I need to find out how to do video content here, I likely need to change this to map over all the episodes first, then from there one can click the episode and it can appear at the top, 

    // This is going to be interesting! 

    // But for movie, all I have to do is make a display, since a movie is a single entity,

    return(

      <> 
      <div>
        <div class="bg-white flex flex-wrap">
          <div class="w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3"></div>
        </div>
      </div>
      <div>
        <div class="mx-auto container p-10">
          <div class="w-full lg:w-3/4 mx-auto">
            <div class="shadow-md rounded-lg overflow-hidden">
              <img src="https://placehold.co/1280x720" alt="tv series cover image" class="object-cover w-full h-64 lg:h-96"/>
            </div>
          </div>
          <div class="mt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 grid grid-cols-2 gap-6">
            <div class="shadow-md rounded-lg overflow-hidden">
              <img src="https://placehold.co/600x600" alt="Episode thumbnail image" class="object-cover w-full h-40"/>
              <div class="p-4">
                <p class="text-indigo-500 text-sm font-medium">Episode 1</p>
                <p class="text-gray-600 text-xs">Some brief description about the episode.</p>
              </div>
            </div>
            <div class="shadow-md rounded-lg overflow-hidden">
              <img src="https://placehold.co/600x600" alt="Episode thumbnail image" class="object-cover w-full h-40"/>
              <div class="p-4">
                <p class="text-indigo-500 text-sm font-medium">Episode 2</p>
                <p class="text-gray-600 text-xs">Some brief description about the episode.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
        
    )
}

{/* <div>
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

        </div> */}

export default TVSeriesDisplay;


// Styling for this div, need to edit with multiple episodes to see how preview would work
{/*  */}

// Next just have to work on display pages and really that's it. Will be researching this sunday best way to view video content on ract similar to netflix / paramount / hulu