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
            className={`transition-transform transform-gpu duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg mb-4 flex-shrink-0 ${isHovered ? 'scale-105' : 'scale-100'} h-auto mx-2`}
            style={{ width: 'calc(100% / 12)' }} // Adjusting for 7 cards worth of space to account for margin
            onClick={handleTVSeriesNav}
        >
          {isHovered ? (
              <div className="relative w-full pt-[56.25%]">
                  <YoutubeEmbed embedId={trailerLink} whereRendered={"TVSeries"}/>
              </div>
          ) : (
              <>
                  <figure className="w-full h-48 md:h-64 overflow-hidden">
                      <img
                          src={thumbnail}
                          alt={`Thumbnail of ${title}`}
                          className="w-full h-full object-cover"
                      />
                  </figure>
                  <div className="p-4">
                      <h3 className="text-xl font-medium text-black truncate">
                          {title}
                      </h3>
                      <p className="text-sm text-black">
                          Directed by {director}, {year_of_release}. Seasons: {seasons}, Episodes: {episode_count}.
                      </p>
                  </div>
              </>
          )}
      </div>
  );
  }
  
  export default TVSeriesCard;

  // <p className="text-sm text-black"></p>