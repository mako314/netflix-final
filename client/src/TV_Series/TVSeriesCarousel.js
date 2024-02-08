import React, {useRef} from "react";
import TVSeriesCollection from "./TVSeriesCollection";


function TVSeriesCarousel({ tvSeriesData }) {
    // useRef is used here to reference the scrolling container of cards
    const collectionRef = useRef(null);

    const genres = ['comedy', 'drama', 'action', 'music'];
    
    // Function to handle the scrolling
    const scroll = (ref, direction) => {
        const containerWidth = ref.current.clientWidth; // Width of the visible area of the carousel
        const cardWidth = containerWidth / 8; // Calculate the width of each card based on 8 cards fitting exactly into the container
        const scrollDistance = cardWidth * 8; // Set the scroll distance to the width of 8 cards

        if (direction === 'left') {
            ref.current.scrollLeft -= scrollDistance;
        } else {
            ref.current.scrollLeft += scrollDistance;
        }
    };

    return (
        <div className="relative max-w-full mx-auto overflow-hidden flex flex-wrap gap-8 justify-start mt-4">
            {genres.map(genre => {
                const filteredMovies = tvSeriesData.filter(movie => movie.genres.toLowerCase().includes(genre));
                return (
                    <div key={genre}>
                        <span className="bg-gray-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold uppercase mt-4 mb-4 ml-4">
                            {genre.toUpperCase()}
                        </span>
                        <TVSeriesCollection
                            tvSeriesData={filteredMovies}
                            scroll={scroll}
                            collectionRef={collectionRef} // Passing the reference to the child component
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default TVSeriesCarousel;