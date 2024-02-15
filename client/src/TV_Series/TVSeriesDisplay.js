import React, {useState} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Accordion from "./TvSeriesAccordion";

function TVSeriesDisplay({tvSeriesData}){
    const [videoLocation, setVideoLocation] = useState("")
    const [episodeInformation, setEpisodeInformation] = useState({
      episodeNumber: 1,
      episodeTitle: 'Default Title',
      episodeSeason: 'Season',
      showTitle:"Show",
      all_season_test: {},
    })

    const [accordionInfo, setAccordionInfo] = useState([{
      seasonInfo: {},
      episodeInfo: [],
    }])
 
    const location = useLocation()
    const { fullTVSeries } = location.state || {}

    return(
      <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10">

      <div className="w-full max-w-4xl mx-auto">
      {videoLocation && (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">

          <div className="px-4 py-3 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg md:text-xl font-semibold text-white text-shadow">
                You're watching: {episodeInformation.showTitle} - Season {episodeInformation.episodeSeason}, Episode {episodeInformation.episodeNumber}: "{episodeInformation.episodeTitle}"
              </p>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9">
            <video controls key={videoLocation} onLoadedMetadata={(e) => e.target.volume = 0.2} className="w-full h-auto">
              <source src={videoLocation} type="video/mp4" />
            </video>
          </div>

        </div>
      )}
    </div>
      
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full lg:w-3/4 mx-auto">
          {/* {mappedTvSeasons} */}
        </div>
        {/* mappedTvSeasons={mappedTvSeasons} */}
        <Accordion  episodeInformation={episodeInformation} fullTVSeries={fullTVSeries} setEpisodeInformation={setEpisodeInformation} setVideoLocation={setVideoLocation}/>
      </div>
    </div>
    )
}
export default TVSeriesDisplay;
