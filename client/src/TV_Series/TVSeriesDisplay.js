import React, {useState, useEffect, useRef, useContext} from "react";
import { useParams, useNavigate, useLocation, useBeforeUnload  } from "react-router-dom";
import Accordion from "./TvSeriesAccordion";
import ApiUrlContext from "../Api";

function TVSeriesDisplay({setTestingTimeStamp, testingTimeStamp}){

    const apiUrl = useContext(ApiUrlContext)
    const videoEl = useRef(null);

    const [continueWatching, setContinueWatching] = useState(false)
    const [watchHistory, setWatchHistory] = useState(null)
    const [episodeInformation, setEpisodeInformation] = useState({
      videoLocation: null,
      episodeNumber: 1,
      episodeTitle: 'Default Title',
      // seasonName: 'Season',
      seasonNumber: 1,
      showTitle:"Show",
      all_season_test: {},
      videoDuration: 1235,
      timeStamp: testingTimeStamp
    })
    
    console.log("THE WATCH HISTORY:", watchHistory)
    // Passing state with useLocation from react router dom,
    const location = useLocation()

    // Retrieving state we sent over in navigation.
    const { fullTVSeries } = location.state || {}

    // let testTime

    // console.log("Full selected TV Series Data:",fullTVSeries )

    // Once a user pauses / clicks item added to watch history. After pausing and navigating away from a page, a users watch time is then logged, so when they come back to the episode it starts at that time.
    // continue where I left off, restart, etc

    // console.log("The video episode URL, looking for AWS:", episodeInformation.videoLocation)


    // https://stackoverflow.com/questions/75550412/handle-browser-beforeunload-with-react-router-dom-v6-page-navigation
    // https://stackoverflow.com/questions/72337281/react-router-dom-v6-detect-user-is-leaving-a-page-and-do-something <- maybe just use useEffect?
    // https://stackoverflow.com/questions/52448909/onbeforeunload-not-working-inside-react-component <- maybe really use useEffect lol
    // https://stackoverflow.com/questions/75859065/how-to-store-data-in-localstorage-before-user-exits-page-user-react-router <- may be best to make use of both react and router dom


    // useEffect(() => {
    //   return () => {
    //     setTestingTimeStamp(testTime)
    //   }
    // }, [testTime])

    useEffect(() => {
      // Ensure all required information is present before making the fetch call
      if (episodeInformation.videoLocation && episodeInformation.showTitle && episodeInformation.episodeTitle && episodeInformation.episodeNumber) {
        handleTvWatchListFind()
      }
    }, [episodeInformation])




    // Used for finding the timestamp a user paused at
    // https://stackoverflow.com/questions/61625602/how-can-i-adapt-this-js-code-to-my-reactjs-app-so-that-i-can-customize-my-video
    // https://github.com/video-react/video-react/blob/master/src/components/Video.js#L572 <- use onpause
    // https://stackoverflow.com/questions/76471687/how-can-i-make-a-video-play-at-the-timestamp-is-was-previously-paused-at
    // https://stackoverflow.com/questions/29908050/react-js-video-element-set-current-play-time-from-react-props
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event - < this is like every second
    // best link along with the github one above:
    // https://stackoverflow.com/questions/61625602/how-can-i-adapt-this-js-code-to-my-reactjs-app-so-that-i-can-customize-my-video

    const handleTimeUpdated = (e) => {
      // do something on time update
      // Previously was using time stamp, but time stamp is a time an action occurred, not the current time in the video :cry:
      // const video = videoEl.current;
      // console.log(e)
      // setTestingTimeStamp(e.target.currentTime)
      setEpisodeInformation({
        ...episodeInformation,
        currentTime: e.target.currentTime,
      })
      // console.log("THE TIME STAMP:", e.target.currentTime)
      // console.log(typeof(e.target.currentTime))
      handlePostingWatchHistory()
    }

    // Possibly grab duration of video with this
    // https://www.w3schools.com/tags/av_event_loadedmetadata.asp
    // onPause={this.handlePause}
    // https://stackoverflow.com/questions/71612224/how-can-i-get-video-duration-from-raw-video-file-in-react
    const handleLoadedMetadata = (e) => {
      const video = videoEl.current;
      if (!video) return;
      e.target.volume = 0.2
      // console.log(`The video is ${video.duration} seconds long.`);
      // console.log(typeof(video.duration))
      setEpisodeInformation({
        ...episodeInformation,
        videoDuration: video.duration,
      })

      // if(watchHistory){
      //   video.currentTime = watchHistory.time_stamp
      // }

      // handlePostingWatchHistory()
    };

    

 

    // https://reactrouter.com/en/main/hooks/use-before-unload
    // https://stackoverflow.com/questions/62792342/in-react-router-v6-how-to-check-form-is-dirty-before-leaving-page-route
    // https://github.com/remix-run/react-router/blob/v3/docs/Glossary.md#leavehook
    // https://github.com/remix-run/react-router/blob/v3/docs/Glossary.md#routerstate


    // Jump back to the specific time:
    // https://stackoverflow.com/questions/62739769/jump-to-specific-time-in-videojs-using-react-hooks
    // https://stackoverflow.com/questions/47643091/html5-video-start-video-at-certain-time-and-play-for-x-amount-of-time


    // Current duration if needed: 
    // I could see this being needed with math to calculcate the time you are in the video, but hopefully can just start at time stamp
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration

    // Can make it a button, or offer options? 
    // https://stackoverflow.com/questions/15025378/html5-video-button-that-takes-video-to-specific-time
    // https://stackoverflow.com/questions/66494433/start-an-html-video-to-a-specified-time
    // https://web.dev/articles/video-and-source-tags#specify-start-and-end-times
    // https://stackoverflow.com/questions/26665280/html5-video-element-start-and-end-times
    // https://stackoverflow.com/questions/5981427/start-html5-video-at-a-particular-position-when-loading

    //   function jumpToTime(time){
    //     v.currentTime = time;
    // }

    // /season/${episodeInformation.seasonName}/
    const handleTvWatchListFind = async () => {
      try {
        const response = await fetch(`${apiUrl}user/${1}/watch/list/show/${episodeInformation.showTitle}/${episodeInformation.episodeTitle}/${episodeInformation.episodeNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        })
    
        if (response.ok) {
          const data = await response.json()
          console.log("Watch History Retrieval succesful:", data)
          setWatchHistory(data)
          // setContinueWatching(true)

        } else {
          const errorData = await response.json()
          console.error('Error Response:', errorData)
          setWatchHistory(null)
        }
      } catch (error) {
        console.error('Fetch Error:', error)
      }
    }

    // Going to want to use an onPause... or on play? Or both? When it's paused it should go off, and when it first plays?  to basically create the watch history entry 

    // Okay, this is how I like it, but we're going to make a patch instead that'll handle changing the watch history time stamp. First post, then if it exists, patch it.

    // Don't forget to include currentUsers id in {1}

    const handlePostingWatchHistory = async () => {
      const fetchMethod = watchHistory ? "PATCH" : "POST"
      const fetchUrl = watchHistory ? `${apiUrl}watch/list/entry/${watchHistory.id}`: `${apiUrl}user/${1}/watch/list/`
      try {
        const response = await fetch(fetchUrl, {
          method: fetchMethod,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(episodeInformation),
        })
        if (response.ok) {
          const data = await response.json()
          if (watchHistory){
            console.log("Patch was good:", data)
          }
            console.log("Post was good:", data)

          
        } else {
          const errorData = await response.json()
          console.error('Error Response:', errorData)
        }
      } catch (error) {
        console.error('Fetch Error:', error)
      }
    }


    
    return(
      // Do flex grow before doing flex-column so it grows and takes up most of the space
      <div className="flex flex-grow" 
      >
      <div className="flex flex-col items-center w-full">
      <div className="p-5 w-full max-w-4xl mx-auto">


      {/* Ternary for video location (path) to exist and then display the video, otherwise display a placeholder */}
      {episodeInformation.videoLocation ? (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">

          <div className="px-4 py-3 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg md:text-xl font-semibold text-white text-shadow">
                You're watching: {episodeInformation.showTitle} - Season {episodeInformation.seasonNumber}, Episode {episodeInformation.episodeNumber}: "{episodeInformation.episodeTitle}"
              </p>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9">
            {/* Video created with default html element, keep it universal. 😎 */}
            <video controls key={episodeInformation.videoLocation} onLoadedMetadata={handleLoadedMetadata} onPause={handleTimeUpdated} ref={videoEl} className="w-full h-auto">
              <source src={episodeInformation.videoLocation} type="video/mp4" />
            </video>
          </div>

        </div>
      ) : (
        // Placeholder when no video is selected
        fullTVSeries &&
        <div className="flex flex-col items-start p-10 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Title at the top */}
        <h2 className="text-xl font-bold text-black mb-4"> {fullTVSeries.title}, {fullTVSeries.year_of_release} </h2>
        
        {/* Image Placeholder Centered */}
        <div className="self-center w-full">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={fullTVSeries.thumbnail} alt="Placeholder" style={{ width: '450px', height: '300px' }} className="w-full h-auto object-contain"/>
          </div>
        </div>
        
        {/* Other Information */}
        <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 mt-2">Details</h3>
        <div className="space-y-2">
          <p className="text-sm"><span className="font-semibold">Writer:</span> {fullTVSeries.writer}</p>
          <p className="text-sm"><span className="font-semibold">Stars:</span> {fullTVSeries.stars}</p>
          <p className="text-sm"><span className="font-semibold">Summary:</span> {fullTVSeries.summary}</p>
            <span className="font-semibold">Motion Picture Rating:</span> {fullTVSeries.motion_picture_rating}
          <p className={`text-sm ${fullTVSeries.rating >= 7 ? 'text-green-500' : fullTVSeries.rating > 5 ? 'text-yellow-500' : 'text-red-500'}`}>
            <span className="font-semibold">IMDB Rating:</span> {fullTVSeries.rating}
          </p>
          <p className="text-sm"><span className="font-semibold">Seasons:</span> {fullTVSeries.seasons}</p>
          <p className="text-sm"><span className="font-semibold">Episodes:</span> {fullTVSeries.episode_count}</p>
        </div>
      </div>
      </div>
      
      )}

    </div>
        {/* mappedTvSeasons={mappedTvSeasons} */}
        <Accordion  episodeInformation={episodeInformation} 
        fullTVSeries={fullTVSeries} 
        setEpisodeInformation={setEpisodeInformation} 
        watchHistory={watchHistory} 
        setWatchHistory={setWatchHistory} 
        video={videoEl.current} 
        setContinueWatching={setContinueWatching}
        continueWatching={continueWatching}
        />
    </div>
    </div>
    )
}
export default TVSeriesDisplay;
