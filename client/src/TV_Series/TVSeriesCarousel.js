import React, {useRef} from "react";
import TVSeriesCollection from "./TVSeriesCollection";


function TVSeriesCarousel({ tvSeriesData }) {
    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for
    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
            {genres.map((genre) => {
                const filteredTvSeries = tvSeriesData.filter(tvSeries => 
                    tvSeries.genres.toLowerCase().includes(genre)
                )

                if (filteredTvSeries.length === 0) {
                    return null // Skip rendering if no TV series match the genre
                }

                return (
                    <div key={genre} className="mb-8">
                        <h2 className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mb-4 inline-block mx-auto">
                            {genre.toUpperCase()}
                        </h2>
                        <div className="flex flex-nowrap gap-4 overflow-x-auto">
                            {filteredTvSeries.map(tvSeries => (
                                <TVSeriesCollection
                                    key={tvSeries.id}
                                    tvSeriesData={[tvSeries]} // Assuming TVSeriesCollection can handle an array of one
                                />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TVSeriesCarousel;