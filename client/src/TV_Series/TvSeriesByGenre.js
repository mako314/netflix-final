import React from "react";
import TVSeriesCard from "./TVSeriesCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function TvSeriesByGenre() {
  // Adjusting the padding and margin to give more space

  // Passing state with useLocation from react router dom,
  const location = useLocation()

  // Use params attached at end of URL to identify the genre, just a string we'll use for the .includes
  const { genre } = useParams()

  // Retrieving state we sent over in navigation.
  const { tvSeriesData } = location.state || {}

  // Lowercase the genre, making it easier to compare
  const lowerCaseGenre = genre.toLocaleLowerCase()

  // Filter the tv data by the tv series genre (also lowercased) that matches the genre above 
  const filteredTvData = tvSeriesData.filter(tvSeries => 
    tvSeries.genres.toLowerCase().includes(lowerCaseGenre)
  )

  // Console logs to double check
  // console.log("filtered movie data", filteredTvData)
  // console.log("All movies: ", tvSeriesData)

  // We use same styling here as tvSeriesCarousel + collection.
  return (
<div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
<h2 className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mb-4 inline-block mx-auto">
{genre.toUpperCase()}
</h2>
      <div className="flex flex-wrap -mx-2"> {/* Adjusted for spacing */}
        {filteredTvData.map((tvSeries, index) => (
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
    </div>
  )
}

export default TvSeriesByGenre