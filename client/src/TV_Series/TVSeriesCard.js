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
            className="relative shadow-md cursor-pointer rounded-lg mb-4 flex-shrink-0"
            style={{ width: '150px', height: '225px' }}
            onClick={handleTVSeriesNav}
        >
            <img
                src={thumbnail}
                alt={`Thumbnail of ${title}`}
                className="h-full w-full rounded-lg object-cover"
            />
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-75 bg-black rounded-lg z-10 p-4">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <YoutubeEmbed
                            embedId={trailerLink}
                            whereRendered={"TVSeries"}
                            title={title}
                            director={director}
                            year_of_release={year_of_release}
                            seasons={seasons}
                            episode_count={episode_count}
                        />
                    </div>
                </div>
            )}
        </div>
    );
  }
  
  export default TVSeriesCard;