import React, { useState } from "react";

function Accordion({episodeInformation, fullTVSeries, setEpisodeInformation, setVideoLocation}) {
    // https://coderomeos.org/create-a-reusable-accordion-component-in-react-tailwind
	const [activeIndex, setActiveIndex] = useState(null);

	const handleClick = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

    console.log("Full selected TV Series Data:",fullTVSeries )

    const accordionData = fullTVSeries?.show_season?.flatMap((season) => ({
        title: `${season.series_name} - Season ${season.season_number}`,
        content: season.episode.map((episode) => (
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
                showTitle: episode.show_season.series_name,
                all_season_test:season
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
			{accordionData.map((item, index) => (
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
					>
                     <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full lg:w-3/4 mx-auto">
						{item.content}
                    </div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Accordion;