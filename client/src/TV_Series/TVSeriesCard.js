import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import YoutubeEmbed from "../YouTubeEmbedds/YouTubeEmbedd";


function TVSeriesCard({tvSeriesID, thumbnail, title, director, year_of_release, seasons, episode_count, fullTVSeries, trailerLink}) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    
    const handleTVSeriesNav = (e) => {
      navigate(`/tv-series/${tvSeriesID}`, { state: { fullTVSeries } })
    }

    
    // Define a base width for the card, adjust this as needed
    const baseWidth = "w-1/4"; // Starting at 1/4 of the width of the flex container
    const hoverWidth = "w-1/3"; // Expanding to 1/3 of the width of the flex container on hover
  
    return (
      <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg ${isHovered ? hoverWidth : baseWidth}`}
      // onClick={handleMovieNav}
    >
      {isHovered ? <YoutubeEmbed embedId={trailerLink}/> :
      <> 
      <figure className="w-full h-48 md:h-64 overflow-hidden transition-all duration-300 ease-in-out">
        <img
          src={thumbnail}
          alt="card image"
          className="w-full h-full object-cover group-hover:opacity-90"
        />
      </figure>
      <div className="p-4">
        <h3 className="text-xl font-medium text-black truncate">
          {title}
        </h3>
        <p className="text-sm text-black">
          By {director}, {year_of_release}, Number of seasons: {seasons}, Number of episodes: {episode_count}
        </p>
      </div>
      </>}
    </div>
    )
  }
  
  export default TVSeriesCard;

  // <p className="text-sm text-black"></p>