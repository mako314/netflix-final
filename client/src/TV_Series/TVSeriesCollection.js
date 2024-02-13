import React, {useRef, useState, useEffect} from "react";
import TVSeriesCard from "./TVSeriesCard";
import TVSeriesCarousel from "./TVSeriesCarousel";

function TVSeriesCollection ({tvSeriesData, marginLeft}){

    //https://react.dev/reference/react/useRef

    const collectionRef  = useRef(null)
    
    const cardContainerStyle = `relative flex flex-nowrap overflow-hidden gap-4 ${marginLeft === 0 ? "justify-start mt-4 pr-[calc(198px+16px)]" : "justify-start mt-4 ml-8 pr-[calc(198px+16px)] gap-4"}`;

    // // Function to scroll the carousel 
    const scroll = (direction) => {
        // Assume each card has a fixed width, here it's an example value in pixels
        const scrollDistance = 600; 

        if (collectionRef.current) {
            const currentScroll = collectionRef.current.scrollLeft;
            const newScroll = direction === 'left' ? currentScroll - scrollDistance : currentScroll + scrollDistance;
            collectionRef.current.scrollLeft = newScroll;
        }
    }

    // Calculate the total width of 8 cards, including the gap between them
    const cardWidth = 195 // The width of one card
    const gapWidth = 16 // The gap between cards
    const totalWidthOfVisibleArea = (cardWidth + gapWidth) * 8 - gapWidth // Total width of 8 cards and 7 gaps

    const containerStyle = {
        width: '100vw', // Or '100%' if it's based on the parent's width
        overflowX: 'hidden', // Hide the horizontal scrollbar
        margin: '0 8px',
    }

    return (
        <div className="relative overflow-hidden" style={containerStyle}>

           <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-30 cursor-pointer bg-black bg-opacity-50 text-white p-2 -translate-y-1/2 hover:bg-opacity-70" // Adjust padding to change size
            style={{ top: '50%', transform: 'translateY(-50%)' }} // Center button vertically
            >
            {"<"}
            </button>

            <div ref={collectionRef} className={cardContainerStyle}> 
            {tvSeriesData?.map((tvSeries) => (
            
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

        <button
        onClick={() => scroll('right')}
        className="absolute left-0 top-1/2 z-30 cursor-pointer bg-black bg-opacity-50 text-white p-2 -translate-y-1/2 hover:bg-opacity-70"
            style={{
                top: '50%',
                transform: 'translateY(-50%) translateX(-100%)', // This adjusts for the size of the button itself
                left: `${totalWidthOfVisibleArea}px`, // Position it at the end of the visible area
            }}
        >
            {">"}
        </button>

            <style>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>

        </div>
        
)
}

export default TVSeriesCollection





    // Would collection be thrown into the carousel? and multiple carousels for a collection in a sense?

    // Few things to implement for tomorrow: 
    // Break this down even further, currently we have TVSeriesCollection map over for TVSeriesCard
    // TV Series Card should have Lazy Loading,
    
    // Carousel: This could be a top-level component that manages the display and navigation of multiple CarouselSlide components.
    // An array which we can move through it with index? or Pagination? Technically, this is the collection page we are currently in.
    // Actually, collection will hold carousels, so that is something that needs to be implemented. They will be sorted by genre / A-Z, etc.

    // CarouselSlide: Represents a single item within the carousel, possibly containing a VideoPreview and ActionButtons.
    // Contains a video card essentially, this would hold all buttons from the action button.
    // This will be a styling nightmare-esque for the most part. Need to figure a way out with this hover and change youtube embedded styling based on where it's being rendered. Can just pass a prop like whereRendered={TVCard}

    // VideoPreview: A component that displays a video or image thumbnail and plays a video on hover or click.
    // I think the easiest approach is to go through with the youtube embedded videos for now. As hosting too many videos on a local machine would be taxing. In a sense, we could do only 1 video preview, really up in the air.
    // Again, will need to adjust the styling to account for where the card is being rendered. As there's already been issues with rendering this here in the tv card section. Should be fixed all by Wednesday.

    // GradientOverlay: A visual component that overlays a gradient on top of the video or image thumbnail to enhance text visibility or UI aesthetics.
    // Will have to do more research on this.

    // ActionButton: Reusable buttons for actions like play, add to watchlist, or share. Can be customized via props to perform different actions or display different icons.
    // Exists outside of both movie / tv collection and cards
    // Self explanatory, for user actions.
    // Buttons for admin also? 

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
  
    // const mainDivStyle = marginLeft === 0 ? "flex flex-nowrap overflow-y-hidden overflow-x-auto gap-8 justify-start mt-4" :"flex flex-nowrap overflow-y-hidden overflow-x-auto gap-8 justify-start mt-4 ml-8"