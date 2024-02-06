import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, whereRendered }) => {

  const frameStyling = whereRendered === "Movies" ? "absolute top-0 left-0 w-full h-full" : "w-full h-full"

return(
<div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
    <iframe
      className={frameStyling}
      loading="lazy"
      src={`https://www.youtube.com/embed/${embedId}?&autoplay=1&mute=1`}
      allow="accelerometer; autoplay; encrypted-media; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
)
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
