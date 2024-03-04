import React from "react"
import TVSeriesCard from "../TV_Series/TVSeriesCard";
import MovieCard from "../Movies/MovieCard";
import {useParams} from "react-router-dom";


function SearchResults({tvSeriesData, moviesData}){

    const { searchTerm } = useParams()

    const filteredTvSeriesData = tvSeriesData.filter(tvSeries =>
        tvSeries.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tvSeries.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tvSeries.writer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tvSeries.genres.split(', ').some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
        )

    const filteredMovieData = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.writer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genres.split(', ').some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
        )

    return(
    <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
    {filteredTvSeriesData.length > 0 && <span className="block text-2xl font-semibold text-gray-800 mb-4 ml-4 ">Shows</span>}

    <div className="flex flex-wrap -mx-2"> {/* Adjusted for spacing */}
        {filteredTvSeriesData.map((tvSeries, index) => (
          <div key={index}>
              <TVSeriesCard
                tvSeriesID={tvSeries.id}
                thumbnail={tvSeries.thumbnail}
                title={tvSeries.title}
                director={tvSeries.director}
                year_of_release={tvSeries.year_of_release}
                seasons={tvSeries.seasons}
                episode_count={tvSeries.episode_count}
                trailerLink={tvSeries.trailer}
                fullTVSeries={tvSeries}
              />
          </div>
        ))}
      </div>

      {filteredMovieData.length > 0 && <span className="block text-2xl font-semibold text-gray-800 mb-4 ml-4 ">Movies</span>}

        <div className="flex flex-wrap -mx-2"> {/* Adjusted for spacing */}
        {filteredMovieData.map((movie, index) => (
          <div key={index}>
            <MovieCard
              movieId={movie.id}
              thumbnail={movie.thumbnail}
              title={movie.title}
              director={movie.director}
              year_of_release={movie.year_of_release}
              run_time={movie.run_time}
              trailerLink={movie.trailer}
              fullMovie={movie}
            />
          </div>
        ))}
      </div>

        </div>
    )
}

export default SearchResults;