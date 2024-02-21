import React, {useRef} from "react";
import MovieCollection from "./MovieCollection";

function AllMoviesWithGenre({ moviesData }) {
    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for
    console.log("Movies data viewing from homepage", moviesData)
    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
            {genres.map((genre) => {
                const filteredMovieSeries = moviesData.filter(tvSeries => 
                    tvSeries.genres.toLowerCase().includes(genre)
                )

                if (filteredMovieSeries.length === 0) {
                    return null // Skip rendering if no TV series match the genre
                }

                return (
<div key={genre} className="mb-8 flex">
    <div>
        <h2 className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mb-4 w-screen">
            {genre.toUpperCase()}
        </h2>
        <div className="flex flex-nowrap gap-4 overflow-x-auto">
            {filteredMovieSeries.map((movies, index) => (
                <MovieCollection
                    key={index}
                    filteredMovieData={[movies]} // Assuming TVSeriesCollection can handle an array of one
                />
            ))}
        </div>
    </div>
</div>
                )
            })}
        </div>
    )
}

export default AllMoviesWithGenre;