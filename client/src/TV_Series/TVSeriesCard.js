import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import YoutubeEmbed from "../YouTubeEmbedds/YouTubeEmbedd";


function TVSeriesCard({tvSeriesID, thumbnail, title, director, year_of_release, seasons, episode_count, fullTVSeries, trailerLink}) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    
    const handleTVSeriesNav = (e) => {
      navigate(`/tv-series/${tvSeriesID}`, { state: { fullTVSeries } })
    }

    return (
      <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-gray-200 w-full transition-transform transform-gpu duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg mb-4 flex-shrink-0 ${isHovered ? 'scale-105' : 'scale-100'} h-auto mx-2`}
            style={{ width: isHovered ? '300px': '150px' }} // Updated width calculation
            onClick={handleTVSeriesNav}
        >
        
          {isHovered ? (
              <div className="relative"> 
                  <YoutubeEmbed 
                  key={`${title}-${year_of_release}-S${seasons}`}
                  embedId={trailerLink} 
                  whereRendered={"TVSeries"}
                  title={title}
                  director={director} 
                  year_of_release={year_of_release} 
                  seasons={seasons} 
                  episode_count={episode_count}
                  />
                  </div>
          ) : (
              <>
                <img
                    src={thumbnail}
                    alt={`Thumbnail of ${title}`}
                    className="h-auto w-full overflow-hidden mx-auto"/>
              </>
          )}
      </div>
  )
  }
  
  export default TVSeriesCard;