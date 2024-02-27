import React, {useState, useRef, useContext, useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from 'react-dom';
import MovieTrailerModal from "../Modals/MovieTrailerModal";
import ContinueLeftOff from "../Modals/ContinueLeftOff";
import ApiUrlContext from "../Api";


function MovieDisplay({moviesData}){
    const apiUrl = useContext(ApiUrlContext)
    const videoEl = useRef(null);

    // const { id } = useParams()
    // const movieIndexValue = id - 1
    const navigate = useNavigate()
    const location = useLocation()
    const { fullMovie } = location.state || {}


    const [showModal, setShowModal] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    const [continueWatching, setContinueWatching] = useState(false)
    const [watchHistory, setWatchHistory] = useState(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true) // New state to track initial load
    const [isFetchingWatchHistory, setIsFetchingWatchHistory] = useState(false) 

    const [movieInformation, setMovieInformation] = useState({
        videoLocation: null,
        movie_title: fullMovie.title,
        videoDuration: 1235,
        timeStamp: null
    })

    // console.log(" isFetchingWatchHistory:", isFetchingWatchHistory)
    // console.log("INITIAL LOADING:", isInitialLoad)

    useEffect(() => {
        // Only show the modal if there's a watchHistory and the user hasn't made a decision yet
        // This modal has been the biggest pain to fix I could never have imagined. There will be slight edits due to seeing what is needed and what is not.
        // Still learning, so it's alright.
        // We test first, whether watch history is not null, we also need to make sure there's a time stamp.
        // Continue watching can also not be true, if it is, then a user has already decided to continue watching from when they left off.
        // I think the true pivotal point here was matching the CURRENT episode information (the title) to the FETCHED watch history episode name.
        // 2/27 Needed to make isFetchingWastHistory test for true, not false. If it's been fetched, then allow the modal to be shown
        if (isFetchingWatchHistory && watchHistory !== null && !continueWatching && watchHistory.time_stamp !== null && movieInformation.movie_title === watchHistory.movie_title && isInitialLoad) {
          setShowModal(true)
        }
      }, [watchHistory, continueWatching, isInitialLoad, isFetchingWatchHistory])

    useEffect(() => {
    // Ensure all required information is present before making the fetch call
    if (movieInformation.movie_title) {
        handleTvWatchListFind()
    }
    }, [movieInformation])


    useEffect(() => {
        const handleNewOrExistingWatchHistory = async () => {
            // your existing logic here
        };
    
        // Only attempt to update the watch history if the timeStamp has been updated
        if (movieInformation.timeStamp !== null) {
            handleNewOrExistingWatchHistory();
        }
    }, [movieInformation.timeStamp]);


    // const fullMovie = moviesData[movieIndexValue]

    // console.log("IN MOVIE DISPLAY:", fullMovie)
    console.log("THE MOVIE INFORMATION TO BE SENT TO THE FETCH:", movieInformation)
    // console.log("THE WATCH HISTORY:", watchHistory)

    const toggleVideo = () => {
        setShowVideo(!showVideo)
    }

    const handleMovieGenreNav = (movieGenre) => {
        navigate(`/movie/genre/${movieGenre}`, { state: { moviesData } })
    }

    // <p className="mt-4 text-indigo-500 font-semibold">{fullMovie.genres}</p>

    // https://blog.stackademic.com/power-of-the-split-function-in-react-js-cc10ced421bc
    const splitGenres = fullMovie?.genres.split(', ')
    // console.log(splitGenres)


    const handleTimeUpdated = (e) => {
        // do something on time update
        // Previously was using time stamp, but time stamp is a time an action occurred, not the current time in the video :cry:
        // const video = videoEl.current;
        // console.log(e)
        // setTestingTimeStamp(e.target.currentTime)
        const currentMovieTime = e.target.currentTime
        setMovieInformation({
          ...movieInformation,
          timeStamp: currentMovieTime,
        })
        // console.log("THE TIME STAMP:", e.target.currentTime)
        // console.log(typeof(e.target.currentTime))
        // Set continue watching to true, not sure if this is needed as it was giving me errors in TvSeriesAccordions setting of the modal,
        if (isInitialLoad) {
          setIsInitialLoad(false) // Mark initial load as complete after first interaction
        } else {
          // Prevent setting continueWatching to true on every pause after initial load
          setContinueWatching(false)
        }
        // Handle posting, OR patching the watch history,
        handleNewOrExistingWatchHistory(currentMovieTime)
      }
    
      const handleLoadedMetadata = (e) => {
        const video = videoEl.current;
        if (!video) return;
        e.target.volume = 0.2
        // console.log(`The video is ${video.duration} seconds long.`);
        // console.log(typeof(video.duration))
        setMovieInformation({
          ...movieInformation,
          videoDuration: video.duration,
        })
      };

      const handleTvWatchListFind = async () => {
        // if (watchHistory){
        //   return console.log()
        // }
        setIsFetchingWatchHistory(true)
        try {
          const response = await fetch(`${apiUrl}user/${1}/watch/list/movie/${movieInformation.movie_title}`, {
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
  
            // This continue watching may not be needed, will test
            setContinueWatching(false)
            // Set initial loaded and fetch watch history to true after finding the watch history
            setIsFetchingWatchHistory(false)
            setIsInitialLoad(true)
          } else {
            const errorData = await response.json()
            console.error('Error Response:', errorData)
            // if Watch history doesn't exist, we set it to null
            setWatchHistory(null)
            // MUST SET FETCHING WATCH HISTORY TO FALSE TO NOT SHOW MODAL IF WATCH HISTORY DOESN'T EXIST
            setIsFetchingWatchHistory(false)
            // This continue watching may not be needed, will test
            // setContinueWatching(true)
          }
        } catch (error) {
          console.error('Fetch Error:', error)
        }
      }


      const handleNewOrExistingWatchHistory = async (currentMovieTime) => {
        const fetchMethod = watchHistory ? "PATCH" : "POST"
        const fetchUrl = watchHistory ? `${apiUrl}watch/list/entry/${watchHistory.id}`: `${apiUrl}user/${1}/watch/list/`
        const movieInfoToUpdate = {
            ...movieInformation,
            timeStamp: currentMovieTime, // Use the passed timestamp
          };

        try {
          const response = await fetch(fetchUrl, {
            method: fetchMethod,
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(movieInfoToUpdate),
          })
          if (response.ok) {
            const data = await response.json()
            if (watchHistory){
              // Set continue watching to true, fetchwatchhistory is already true so it's fine
              setContinueWatching(true)
              setIsFetchingWatchHistory(false)
              setWatchHistory(data)
              return console.log("Patch was good:", data)
            }
              setContinueWatching(true)
              console.log("Post was good:", data)
  
            
          } else {
            const errorData = await response.json()
            console.error('Error Response:', errorData)
            
          }
        } catch (error) {
          console.error('Fetch Error:', error)
        }
      }

      
      const onContinue = () => {
        setShowModal(false)
        setContinueWatching(true)
        if (videoEl.current && watchHistory) {
            videoEl.current.currentTime = watchHistory.time_stamp;
        }
      }




    return (
        <div className="flex flex-grow items-center justify-center bg-white min-h-screen">
            <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full overflow-hidden m-4">
                {/* Conditional Rendering for Thumbnail or Video */}
                {showVideo ? (
                    <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
                        <video
                            controls
                            className="w-full h-auto"
                            aria-label={`Watch ${fullMovie.title}`}
                            ref={videoEl}
                            onLoadedMetadata={handleLoadedMetadata} 
                            onPause={handleTimeUpdated} 
                        >
                            <source src="https://d3th70t1rge79u.cloudfront.net/arthur/001-ArthurEyes.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {showModal && createPortal(
                            <ContinueLeftOff 
                            movieInformation={movieInformation} 
                            onContinue={onContinue} 
                            // Onclose prop function that just sets modal to false.
                            onClose={() => setShowModal(false)} />,
                            document.body
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center"> 
                        <img
                        onClick={toggleVideo}
                        src={fullMovie.thumbnail} 
                        alt={`Watch ${fullMovie.title}`} 
                        className="w-full h-full object-cover cursor-pointer" 
                        style={{ maxWidth: '50%', maxHeight: '50%' }}
                        />
                    </div>
                )}
    
                {/* Movie Details */}
                <div className="p-4 lg:p-8">
                    <p className="text-gray-900 text-2xl lg:text-4xl font-bold mb-2">{fullMovie.title}, {fullMovie.release_date}</p>
                    <p className="mt-2 text-gray-600">{fullMovie.summary}</p>
                </div>
    
                {/* Additional Information */}
                <div className="bg-gray-100 p-4 lg:p-8">
                    <p className="text-gray-700 font-bold">Run time: {fullMovie.run_time}</p>
                    <p>Writer: {fullMovie.writer}</p>
                    <p>Stars: {fullMovie.stars}</p>
                    <div className="flex flex-wrap">
                    {splitGenres?.map((genre, index) => (
                        <p key={index} className="text-indigo-500 font-semibold mr-2 cursor-pointer" onClick={() => handleMovieGenreNav(genre)}>
                        {genre},
                        </p>
                    ))}
                    </div>
                </div>
    
                {/* Toggle Button for Video */}
                {!showVideo && (
                    <div className="flex justify-center p-4 lg:p-8 bg-gray-200">
                        <button
                            type="button"
                            className="rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2 bg-indigo-500 text-white text-lg transition duration-150 ease-in-out"
                            onClick={() => setShowModal(true)}
                        >
                            Watch Trailer
                        </button>
                        {showModal && createPortal(
                            <MovieTrailerModal trailerLink={fullMovie.trailer} onClose={() => setShowModal(false)} />,
                            document.body
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default MovieDisplay;




