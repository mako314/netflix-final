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
    // const baseWidth = "w-1/4" // starting width
    // const hoverWidth = "w-1/3" // Width on hover
    // const minHeight = "h-64" // Minimum height to prevent shrinking too much

    const baseWidth = "w-1/6"; // Base width for 6 cards per row
    const hoverWidth = "lg:w-1/4"; // Larger width on hover for large screens
    const minHeight = "h-64"; // Minimum height
      
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg mb-4 ${isHovered ? hoverWidth : baseWidth} ${minHeight}`}
      >
        {isHovered ? (
          // Show this div only when hovered
          <div className="youtube-embed-container" style={{ width: '100%', height: '0', paddingBottom: '56.25%' }}>
            <YoutubeEmbed embedId={trailerLink} whereRendered={"TVSeries"}/>
          </div>
        ) : (
          // Show the rest of the card content when not hovered
          <>
            <div onClick={handleTVSeriesNav}>
              <figure className="w-full h-48 md:h-64 overflow-hidden transition-all duration-300 ease-in-out">
                <img
                  src={thumbnail}
                  alt="card image"
                  className="w-full h-full object-cover"
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
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default TVSeriesCard;

  // <p className="text-sm text-black"></p>