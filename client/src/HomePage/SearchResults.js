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
        <div className="mt-4">
            <div className="flex flex-wrap">
          {filteredTvSeriesData.map((tvSeries, index) => (
            <div key={index} className="w-1/6 px-2 mb-4">
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

        <div className="flex flex-wrap">
    {filteredMovieData?.map((movie, index) => (
      <div key={index} className="w-1/4 px-2 mb-4">
          <MovieCard
          key={movie.id}
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