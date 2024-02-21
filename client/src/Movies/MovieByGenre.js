import React from "react";
import MovieCard from "./MovieCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function MovieByGenre() {
  // Adjusting the padding and margin to give more space
  const location = useLocation()
  const { genre } = useParams()
  const { moviesData } = location.state || {}

  const lowerCaseGenre = genre.toLocaleLowerCase()

  const filteredMovieData = moviesData.filter(movie => 
    movie.genres.toLowerCase().includes(lowerCaseGenre)
  )

console.log("filtered movie data", filteredMovieData)
console.log("All movies: ", moviesData)

  return (
<div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
<h2 className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mb-4 inline-block mx-auto">
{genre.toUpperCase()}
</h2>
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

export default MovieByGenre