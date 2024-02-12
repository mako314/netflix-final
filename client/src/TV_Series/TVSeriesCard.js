import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import YoutubeEmbed from "../YouTubeEmbedds/YouTubeEmbedd";


function TVSeriesCard({tvSeriesID, thumbnail, title, director, year_of_release, seasons, episode_count, fullTVSeries, trailerLink}) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    
    const handleTVSeriesNav = (e) => {
      navigate(`/tv-series/${tvSeriesID}`, { state: { fullTVSeries } })
    }

    const viewportWidth = window.innerWidth; // or a fixed width if your container has one
    const numberOfCards = 6;
    const gapBetweenCards = 16; // Adjust the gap width as needed
    const totalGapSpace = gapBetweenCards * (numberOfCards - 1);
    const cardWidth = (viewportWidth - totalGapSpace) / numberOfCards;

    console.log(episode_count)



    return (
      <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative w-full transition-transform transform-gpu duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg mb-4 flex-shrink-0 ${isHovered ? 'scale-105' : 'scale-100'} h-auto mx-2`}
            style={{ width: isHovered ? '250px': '150px' }} // Updated width calculation
            onClick={handleTVSeriesNav}
        >
          {isHovered ? (
              <>
                  <YoutubeEmbed 
                  embedId={trailerLink} 
                  whereRendered={"TVSeries"}
                  title={title}
                  director={director} 
                  year_of_release={year_of_release} 
                  seasons={seasons} 
                  episode_count={episode_count}
                  />
              </>
          ) : (
              <>
                <figure className="h-auto w-full overflow-hidden mx-auto">
                <img
                    src={thumbnail}
                    alt={`Thumbnail of ${title}`}
                    className="block w-full h-auto object-fill"                />
                </figure>
                  {/* <div className="p-4">
                      <h3 className="text-xl font-medium text-black truncate">
                          {title}
                      </h3>
                      <p className="text-sm text-black">
                          Directed by {director}, {year_of_release}. Seasons: {seasons}, Episodes: {episode_count}.
                      </p>
                  </div> */}
              </>
          )}
      </div>
  );
  }
  
  export default TVSeriesCard;

  // <p className="text-sm text-black"></p>