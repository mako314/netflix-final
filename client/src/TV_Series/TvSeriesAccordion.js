import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import ContinueLeftOff from "../Modals/ContinueLeftOff";

function Accordion({episodeInformation, fullTVSeries, setEpisodeInformation, watchHistory, video, continueWatching, setContinueWatching, setWatchHistory, isInitialLoad, setIsInitialLoad, isFetchingWatchHistory}) {
  // https://coderomeos.org/create-a-reusable-accordion-component-in-react-tailwind
	const [activeIndex, setActiveIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  
  // console.log(" isFetchingWatchHistory:", isFetchingWatchHistory)
  // console.log("watchHistory !== null", watchHistory !== null)
  // console.log("CONTINUE WATCHING:", continueWatching)
  // console.log(" watchHistory.time_stamp !== null",  watchHistory?.time_stamp !== null)
  // console.log("episodeInformation.episodeTitle === watchHistory.episode_name", episodeInformation.episodeTitle === watchHistory?.episode_name)
  // console.log("INITIAL LOADING:", isInitialLoad)
  



  useEffect(() => {
    // Only show the modal if there's a watchHistory and the user hasn't made a decision yet
    // This modal has been the biggest pain to fix I could never have imagined. There will be slight edits due to seeing what is needed and what is not.
    // Still learning, so it's alright.
    // We test first, whether watch history is not null, we also need to make sure there's a time stamp.
    // Continue watching can also not be true, if it is, then a user has already decided to continue watching from when they left off.
    // I think the true pivotal point here was matching the CURRENT episode information (the title) to the FETCHED watch history episode name.
    // 2/27 Needed to make isFetchingWastHistory test for true, not false. If it's been fetched, then allow the modal to be shown
    if (isFetchingWatchHistory && watchHistory !== null && !continueWatching && watchHistory.time_stamp !== null && episodeInformation.episodeTitle === watchHistory.episode_name && isInitialLoad) {
      setShowModal(true)
    }
  }, [watchHistory, continueWatching, isInitialLoad, isFetchingWatchHistory])


  // Handle accordion changing by checking the index that is selected to the activeIndex, if it's the activeIndex, close that index by setting it to null, otherwise open the next one 
  // activeIndex === index ? "block" : "hidden" this portion in the return code goes about hiding the content otherwise.
  const handleClick = (index) => {
    if (index !== activeIndex) {
      setIsInitialLoad(true) // Reset only when switching videos
      setWatchHistory(null) // Ensure watch history is cleared for new selection
    } else {
      // If the same video card is clicked again, do not reset isInitialLoad
      setIsInitialLoad(false)
    }
    
    setActiveIndex(index === activeIndex ? null : index)
    setContinueWatching(true) // You might adjust this based on your specific logic needs
  }


  // Jump back to the specific time:
  // https://stackoverflow.com/questions/62739769/jump-to-specific-time-in-videojs-using-react-hooks
  // https://stackoverflow.com/questions/47643091/html5-video-start-video-at-certain-time-and-play-for-x-amount-of-time
  // Can make it a button, or offer options? 
  // https://stackoverflow.com/questions/15025378/html5-video-button-that-takes-video-to-specific-time
  // https://stackoverflow.com/questions/66494433/start-an-html-video-to-a-specified-time
  // https://web.dev/articles/video-and-source-tags#specify-start-and-end-times
  // https://stackoverflow.com/questions/26665280/html5-video-element-start-and-end-times
  // https://stackoverflow.com/questions/5981427/start-html5-video-at-a-particular-position-when-loading
  // On a users decision to continue where they left off, modal false to remove it. set continue watching to true, removing the showModal True in the useEffect from having the modal reappear. 
  // From there, if the video exists, and watch history exists set the video time to the timestamp.
  const onContinue = () => {
    setShowModal(false)
    setContinueWatching(true)
    if (video && watchHistory) {
      video.currentTime = watchHistory.time_stamp;
    }
  }

    // console.log("Full selected TV Series Data:",fullTVSeries )

    // Flatmap over the full tv series, to flatten the array and have the season information available. We'll then make this an array of objects, wit hthe title being the series name (Ex. Breaking bad), and then season # (ex. 2). Afterwards, we do what we had prior and map over the season episode to make the actual episode cards. Which when clicked set the episode information (this could likely incorporate set video location and just be one state to make things easier)
    const accordionData = fullTVSeries?.show_season?.flatMap((season) => ({
        title: `${season.series_name} - Season ${season.season_number}`,
        content: season.episode.map((episode) => (
            <div 
            className="shadow-md rounded-lg overflow-hidden cursor-pointer" 
            key={`${episode.id} ${episode.episode_number}`} 
            onClick={() => {
              console.log("The Episode:", episode)
              // setVideoLocation(episode.video_path)
              setEpisodeInformation({
                ...episodeInformation,
                videoLocation: episode.video_path,
                episodeNumber: episode.episode_number,
                episodeTitle: episode.episode_name,
                seasonNumber: episode.show_season.season_number,
                showTitle: episode.show_season.series_name,
                // all_season_test:season
            })
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
            }}>
              <img src={episode.thumbnail} alt="Episode thumbnail" className="object-cover w-full h-40" />
              <div className="p-4">
                <p className="text-indigo-500 text-sm font-medium">Episode {episode.episode_number}</p>
                <p className="text-gray-600 text-xs">{episode.summary}</p>
              </div>
            </div>
          ))
    }))


	return (
		<div className="container mx-auto">
			{accordionData?.map((item, index) => (
				<div
					className="border-gray-300 mb-4 rounded border"
					key={index}
				>
					<div
						className="accordion-header bg-gray-100 cursor-pointer px-4 py-2"
						onClick={() => handleClick(index)}
					>
						{item.title}
					</div>
					<div
						className={`accordion-content bg-white px-4 pb-4 pt-2 ${
							activeIndex === index ? "block" : "hidden"
						}`}
            // Reset continue watching to false whenever you click on a new card. This is 1/2 to satisfying the condition of the useEffect, other being the existence of a watch history.
            onClick={() => {
              setContinueWatching(false)}}
					>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full lg:w-3/4 mx-auto">
						{item.content}
          </div>
					</div>
				</div>
			))}
          {showModal && createPortal(
          <ContinueLeftOff 
          episodeInformation={episodeInformation} 
          onContinue={onContinue} 
          // Onclose prop function that just sets modal to false.
          onClose={() => setShowModal(false)} />,
          document.body
      )}
		</div>
	);
}

export default Accordion;