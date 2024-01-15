import React from "react";
import TVSeriesCard from "./TVSeriesCard";

function TVSeriesCollection ({tvSeriesData}){

    console.log("The data:", tvSeriesData)

    const mappedTVSeriesCards = tvSeriesData?.map((tvSeries) => {
        return (
        <div key={tvSeries.id} className="p-2 md:w-1/4"> {/* Each item takes up 1/4th of the width */} 
            <TVSeriesCard
                tvSeriesID={tvSeries.id}
                thumbnail={tvSeries.thumbnail}
                title={tvSeries.title}
                director={tvSeries.director}
                year_of_release={tvSeries.year_of_release}
                seasons={tvSeries.seasons}
                episode_count={tvSeries.episode_count}
                fullTVSeries={tvSeries}
            />
        </div>
        )
    })

    return(
        <div>
            <h1 className="text-3xl font-bold underline">
                TV Series Collection Page
            </h1>
            <div className="flex flex-wrap -m-2"> 
                {mappedTVSeriesCards}
            </div>
        </div>
    )
}

export default TVSeriesCollection