import React, {useState} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import video from "../Videos/Arthur Episode 1 Arthur's Eyes; Francine's Bad Hair Day.mp4"
// video
function TVSeriesDisplay({tvSeriesData}){
    const [videoLocation, setVideoLocation] = useState("")
    const [episodeInformation, setEpisodeInformation] = useState({
      episodeNumber: 1,
      episodeTitle: 'Default Title',
      episodeSeason: 'Season',
      showTitle:"Show"
    })
 
    const location = useLocation()
    const { fullTVSeries } = location.state || {}

    console.log("Current video source:", videoLocation)

    // I need to find out how to do video content here, I likely need to change this to map over all the episodes first, then from there one can click the episode and it can appear at the top, 

    // This is going to be interesting! 

    // But for movie, all I have to do is make a display, since a movie is a single entity,

    const mappedTvSeasons = fullTVSeries?.show_season?.flatMap((season) =>
    season.episode.map((episode) => (
      <div 
      className="shadow-md rounded-lg overflow-hidden" 
      key={`${episode.id} ${episode.episode_number}`} 
      onClick={() => {
        console.log("The Episode:", episode)
        setVideoLocation(episode.video_path)
        setEpisodeInformation({
          ...episodeInformation,
          episodeNumber: episode.episode_number,
          episodeTitle: episode.episode_name,
          episodeSeason: episode.show_season.season_number,
          showTitle: episode.show_season.series_name
      })
      }}>
        <img src={episode.thumbnail} alt="Episode thumbnail" className="object-cover w-full h-40" />
        <div className="p-4">
          <p className="text-indigo-500 text-sm font-medium">Episode {episode.episode_number}</p>
          <p className="text-gray-600 text-xs">{episode.summary}</p>
        </div>
      </div>
    ))
  )
  

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
          {mappedTvSeasons}
        </div>
      </div>
    </div>
    )
}
export default TVSeriesDisplay;
