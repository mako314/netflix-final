import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, whereRendered, title, director, year_of_release, seasons, episode_count }) => {

  const frameStyling = whereRendered === "Movies" ? "absolute top-0 left-0 w-full h-full" : "absolute top-0 w-full h-full"
  // https://developers.google.com/youtube/player_parameters
  console.log("THE EPISODE COUNT:",)

return(
<div className="overflow-hidden" style={{ paddingBottom: '34.25%' }}>
  
    <iframe
      className="w-full"
      loading="lazy"
      src={`https://www.youtube.com/embed/${embedId}?&autoplay=1&mute=1`}
      allow="accelerometer; autoplay; encrypted-media; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  {whereRendered === "TVSeries" && 
        <div className="absolute bottom-0 px-2 py-2 w-full bg-white">
            <h3 className="text-xl font-medium text-black truncate">
                {title}
            </h3>
            <p className="text-sm text-black mb-2">
                Directed by {director}, {year_of_release}. Seasons: {seasons}, Episodes: {episode_count}.
            </p>
        </div>
      }
  </div>
)
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
