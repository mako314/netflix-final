import React from "react";
import MovieCard from "./MovieCard";

function MovieCollection({ filteredMovieData, handleDeleteAsync }) {
  // Adjusting the padding and margin to give more space
  return (
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
          handleDeleteAsync={handleDeleteAsync}
        />
      </div>
    ))}
  </div>
  )
}

export default MovieCollection


{/* <div className= {mainDivStyle}>
{moviesData.map((movie) => (
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
    handleDeleteAsync={handleDeleteAsync}
  />
))}
</div> */}