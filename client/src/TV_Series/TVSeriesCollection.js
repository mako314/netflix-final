import React from "react";
import TVSeriesCard from "./TVSeriesCard";

function TVSeriesCollection ({tvSeriesData, marginLeft}){
    const mainDivStyle = marginLeft === 0 ? "flex flex-wrap gap-8 justify-start mt-4" :"flex flex-wrap gap-8 justify-start mt-4 ml-8"
    return (
        <div className={mainDivStyle}>
            {tvSeriesData.map((tvSeries) => (
            <TVSeriesCard
                key={tvSeries.id}
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
        ))}
        </div>
        
)
}

export default TVSeriesCollection