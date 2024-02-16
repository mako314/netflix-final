import React, {useState} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Accordion from "./TvSeriesAccordion";

function TVSeriesDisplay(){
    const [episodeInformation, setEpisodeInformation] = useState({
      videoLocation: null,
      episodeNumber: 1,
      episodeTitle: 'Default Title',
      episodeSeason: 'Season',
      showTitle:"Show",
      all_season_test: {},
    })

    const location = useLocation()
    const { fullTVSeries } = location.state || {}

    console.log("Full selected TV Series Data:",fullTVSeries )

    // Once a user pauses / clicks item added to watch history. After pausing and navigating away from a page, a users watch time is then logged, so when they come back to the episode it starts at that time.

    // continue where I left off, restart, etc



    return(
      // Do flex grow before doing flex-column so it grows and takes up most of the space
      <div className="flex flex-grow" 
      // style={{ 
      //   backgroundImage: "url(https://wallpapercave.com/wp/wp2581370.jpg)",
      //   backgroundPosition: "top",
      //   backgroundSize: "cover"
      // }}
      >
      <div className="flex flex-col items-center w-full">
      <div className="p-5 w-full max-w-4xl mx-auto">


      {/* Ternary for video location (path) to exist and then display the video, otherwise display a placeholder */}
      {episodeInformation.videoLocation ? (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">

          <div className="px-4 py-3 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg md:text-xl font-semibold text-white text-shadow">
                You're watching: {episodeInformation.showTitle} - Season {episodeInformation.episodeSeason}, Episode {episodeInformation.episodeNumber}: "{episodeInformation.episodeTitle}"
              </p>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9">
            <video controls key={episodeInformation.videoLocation} onLoadedMetadata={(e) => e.target.volume = 0.2} className="w-full h-auto">
              <source src={episodeInformation.videoLocation} type="video/mp4" />
            </video>
          </div>

        </div>
      ) : (
        // Placeholder when no video is selected
        <div className="flex flex-col items-start p-10 w-full max-w-4xl mx-auto bg-white rounded-lg">
        {/* Title at the top */}
        <h2 className="text-xl font-bold text-black mb-4"> {fullTVSeries.title}, {fullTVSeries.year_of_release} </h2>
        
        {/* Image Placeholder Centered */}
        <div className="self-center w-full">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={fullTVSeries.thumbnail} alt="Placeholder" style={{ width: '450px', height: '300px' }} className="w-full h-auto object-contain"/>
          </div>
        </div>
        
        {/* Other Information */}
        <div className="text-black mt-4">
          <p className="text-sm">Writer: {fullTVSeries.writer}</p> <br/>
          <p className="text-sm">Stars: {fullTVSeries.stars}</p> <br/>
          <p className="text-sm">Summary: {fullTVSeries.summary}</p> <br/>
          <p className="text-sm">Motion Picture Rating: {fullTVSeries.motion_picture_rating}</p>
          <p className="text-sm">IMDB Rating: {fullTVSeries.rating}</p><br/>

          <p className="text-sm">Seasons: {fullTVSeries.seasons}</p>
          <p className="text-sm">Episodes: {fullTVSeries.episode_count}</p>

          
        </div>
      </div>
      )}

    </div>
        {/* mappedTvSeasons={mappedTvSeasons} */}
        <Accordion  episodeInformation={episodeInformation} fullTVSeries={fullTVSeries} setEpisodeInformation={setEpisodeInformation}/>
    </div>
    </div>
    )
}
export default TVSeriesDisplay;
