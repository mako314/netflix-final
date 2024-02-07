import React, {useState} from "react";
import TVSeriesCollection from "./TVSeriesCollection";


function TVSeriesCarousel({tvSeriesData, marginLeft}){

    const [selectedIndex, setSelectedIndex] = useState(0);
    const mainDivStyle = marginLeft === 0 ? "flex flex-wrap gap-8 justify-start mt-4" :"flex flex-wrap gap-8 justify-start mt-4 ml-8"

    // console.log(selectedIndex)
    // const images = [
    // ]

    // const projectDisplayComponents = [
    //   EquipMeHomePage,
    //   EquipMeMessagingDisplay,
    //   EquipMeMessagingUserToOwner,
    //   EquipMeMessagingOwnerToUser,
    //   EquipMeOwnerDash
    // ]

    // const scrollCarouselPrevious = () => {
    //     setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : projectDisplayComponents.length - 1));
    // }
    
    //   const scrollCarouselNext = () => {
    //     setSelectedIndex((prevIndex) => (prevIndex + 1) % projectDisplayComponents.length);
    // }

    // const SelectedComponent = projectDisplayComponents[selectedIndex]

    const genres = ['comedy', 'drama', 'action', 'music']

    
    
    return( 
        <div className={mainDivStyle}>
        {genres.map(genre => {
        const filteredMovies = tvSeriesData.filter(movie => movie.genres.toLowerCase().includes(genre));
        return (
            <div key={genre} className="mt-4 mb-4 w-full py-2"> {/* Key is necessary here because we're mapping over an array */}
            <span className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mt-4 mb-4">{genre.toUpperCase()}</span>
            <TVSeriesCollection tvSeriesData={filteredMovies} marginLeft={0}/>
            </div>
        )
        })}
        </div>
    )
}

export default TVSeriesCarousel