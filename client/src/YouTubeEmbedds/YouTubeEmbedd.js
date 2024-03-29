import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, whereRendered, title, director, year_of_release, seasons, episode_count }) => {

  const frameStyling = whereRendered === "Movies" ? "absolute top-0 left-0 w-full h-full" : "absolute top-0 w-full h-full"
  // https://developers.google.com/youtube/player_parameters
  // console.log("THE EPISODE COUNT:",)

  // style={{ paddingBottom: '34.25%' }}
  return (
    <div className="flex flex-col">
      <div className="relative" style={{ paddingBottom: '40.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          loading="lazy"
          src={`https://www.youtube.com/embed/${embedId}?&autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      {whereRendered === "TVSeries" && (
       <div className="bg-gray-200 text-black w-full h-full">
        <h3 className="text-xl font-medium truncate text-center mt-2">{title}</h3>
       <div className="mb-2">
         <p className="text-sm font-semibold text-center">Directed by {director}</p>
         <p className="text-sm text-center">{year_of_release}, Seasons: {seasons}, Episodes: {episode_count}</p>
       </div>
       
     </div>
      )}
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;