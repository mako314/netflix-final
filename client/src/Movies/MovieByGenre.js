import React from "react";
import MovieCard from "./MovieCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function MovieByGenre() {
  // Adjusting the padding and margin to give more space
  const location = useLocation()
  const { genre } = useParams()
  const { moviesData } = location.state || {}

  const filteredMovieData = moviesData.filter(movie => 
    movie.genres.toLowerCase().includes(genre)
)

  return (
    <div className="flex flex-wrap">
    {moviesData.map((movie, index) => (
      <div key={index} className="w-1/6 px-2 mb-4">
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
  )
}

export default MovieByGenre