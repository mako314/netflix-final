import React from "react";
import MovieCard from "./MovieCard";

function MovieCollection({ moviesData, handleDeleteAsync }) {
  // Adjusting the padding and margin to give more space
  return (
    <div className="flex flex-wrap gap-8 justify-start mt-4">
      {moviesData.map((movie) => (
        <MovieCard
          key={movie.id}
          movieId={movie.id}
          thumbnail={movie.thumbnail}
          title={movie.title}
          director={movie.director}
          year_of_release={movie.year_of_release}
          run_time={movie.run_time}
          fullMovie={movie}
          handleDeleteAsync={handleDeleteAsync}
        />
      ))}
    </div>
  );
}

export default MovieCollection