import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, whereRendered, title, director, release_date, seasons, episode_count, movieCard }) => {

  console.log(director)

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
      {whereRendered === "Movies" && (
       <div className="bg-gray-200 text-black w-full h-full">

        <h3 className="text-xl font-medium truncate text-center mt-2">{title}</h3>
       <div className="mb-2">
         <p className="text-sm font-semibold text-center">Directed by {director}, released in {release_date}.</p>
       </div>
       
     </div>
      )}

      {whereRendered === "TVSeries" && (
       <div className="bg-gray-200 text-black w-full h-full">
        <h3 className="text-xl font-medium truncate text-center mt-2">{title}</h3>
       <div className="mb-2">
         <p className="text-sm font-semibold text-center">Directed by {director}</p>

         {/* Conditional rendering for TV series */}
         {whereRendered === "TVSeries" && (
           <p className="text-sm text-center">Year of Release: {release_date}, Seasons: {seasons}, Episode Count: {episode_count}</p>
         )}
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