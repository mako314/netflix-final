import React from "react"
import { useNavigate } from 'react-router-dom';


function TVSeriesCard({tvSeriesID, thumbnail, title, director, year_of_release, seasons, episode_count, fullTVSeries}) {
  
    const navigate = useNavigate()
    
    const handleTVSeriesNav = (e) => {
      navigate(`/tv-series/${tvSeriesID}`, { state: { fullTVSeries } })
    }
  
    return (
      <>
        {/*<!-- Component: Basic image card --> */}
        {/* MT TOP BOTTOM */}
    
        <div 
        className="overflow-hidden rounded bg-gray-400 text-slate-500 shadow-xl shadow-slate-200 mt-4 ml-4"
        onClick={handleTVSeriesNav}
        >
            {/*  <!--  Image --> */}
            <figure>
            <img
                src={thumbnail}
                alt="card image"
                className="h-48 w-full object-contain" 
            />
            </figure>
            {/*  <!-- Body--> */}
            <div className="p-6">
            <header className="">
                <h3 className="text-xl font-medium text-black">
                    {title}
                </h3>
                <p className="text-sm text-black">By {director}, {year_of_release}</p>
                <p className="text-sm text-black">Number of seasons: {seasons}, Number of episodes: {episode_count}</p>
            </header>
            </div>
        </div>
    
        {/*<!-- End Basic image card --> */}
      </>
    )
  }
  
  export default TVSeriesCard;