import React, {useRef} from "react";
import TVSeriesCollection from "./TVSeriesCollection";
import HomePage from "../HomePage/HomePage";
import { useParams, useNavigate, useLocation } from "react-router-dom";


function TVSeriesCarousel({ tvSeriesData, homePage }) {
    const navigate = useNavigate()

    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for

    const handleTvGenreNav = (movieGenre) => {
        navigate(`/tv/series/genre/${movieGenre}`, { state: { tvSeriesData } })
    }

    console.log("HOME PAGE", homePage)
    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
            {genres.map((genre) => {
                const filteredTvSeries = tvSeriesData.filter(tvSeries => 
                    tvSeries.genres.toLowerCase().includes(genre)
                )

                if (filteredTvSeries.length === 0) {
                    return null // Skip rendering if no TV series match the genre
                }

                console.log("FILTERED TV SERIES LENGTH", filteredTvSeries.length)

                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#remove_all_elements_starting_from_index_2
                // const smallerFilterForHomePage = filteredTvSeries.splice(5)

                // https://stackoverflow.com/questions/26568536/remove-all-items-after-an-index

                if(homePage === true){
                filteredTvSeries.length = 8
                }
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

                return (
                    <div key={genre} className="mb-8">
                    <h2 className="bg-gray-800 text-gray-200 py-2 rounded text-sm font-semibold uppercase mb-4 text-center w-screen cursor-pointer" onClick={() => handleTvGenreNav(genre)}>
                        {genre.toUpperCase()}
                    </h2>
                        <div className="flex flex-wrap gap-4 overflow-x-auto">
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