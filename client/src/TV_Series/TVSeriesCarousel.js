import React, {useState} from "react";
import TVSeriesCollection from "./TVSeriesCollection";
import HomePage from "../HomePage/HomePage";
import { useParams, useNavigate, useLocation } from "react-router-dom";


function TVSeriesCarousel({ tvSeriesData, homePage }) {
    const [dateSort, setDateSort] = useState('newest')
    const [alphabetSort, setAlphabetSort] = useState(true)


    const navigate = useNavigate()

    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for

    const handleTvGenreNav = (movieGenre) => {
        navigate(`/tv/series/genre/${movieGenre}`, { state: { tvSeriesData } })
    }

    const handleDateSort = (event) => {
        // console.log('Selected value:', event.target.value)
        setDateSort(event.target.value)
    }

    const handleAlphabetSort = (event) => {
        // console.log('Selected value:', event.target.value)
        if (event.target.value === "true"){
            return setAlphabetSort(true)
        }
        setAlphabetSort(false)
    }

    let userSortOption = dateSort === 'newest' ?
    ((a, b) => new Date(b.release_date) - new Date(a.release_date)) : // Newest first
    ((a, b) => new Date(a.release_date) - new Date(b.release_date)) // Oldest first

    // console.log(typeof(userSortOption))

    const sortedSeries = tvSeriesData.sort(userSortOption)

    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    // https://stackoverflow.com/questions/48111425/sort-objects-in-an-array-alphabetically-based-on-one-property
    // https://stackoverflow.com/questions/54298232/sorting-an-array-of-objects-alphabetically

    const alphabeticalSort = sortedSeries.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
      
        return alphabetSort ? textA.localeCompare(textB) : textB.localeCompare(textA);
    })

    



    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
            {/* <label for="foods">What do you want to eat?</label><br /> */}
            <div className="flex flex-row"> 
        <select 
                className="block appearance-none w-auto bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2"
                value={dateSort}
                onChange={handleDateSort}
        >
                <option value="" disabled>--Please choose an option--</option>
                <option name="newest_option" value="newest" id="newest">Newest Series</option>
                <option name="oldest_option" value="oldest" id="oldest">Oldest Series</option>
        </select>

        <select 
                className="block appearance-none w-auto bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2 ml-4"
                value={alphabetSort}
                onChange={handleAlphabetSort}
        >
                <option value="" disabled>--Please choose an option--</option>
                <option name="newest_option" value="true" id="alphabetTrue">A-Z</option>
                <option name="oldest_option" value="false" id="alphabetFalse">Z-A</option>
        </select>

        </div>

        


            {genres.map((genre) => {
                const filteredTvSeries = alphabeticalSort.filter(tvSeries => 
                    tvSeries.genres.toLowerCase().includes(genre)
                )

                if (filteredTvSeries.length === 0) {
                    return null // Skip rendering if no TV series match the genre
                }

                console.log("FILTERED TV SERIES LENGTH", filteredTvSeries.length)

                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#remove_all_elements_starting_from_index_2
                // const smallerFilterForHomePage = filteredTvSeries.splice(5)

                // https://stackoverflow.com/questions/26568536/remove-all-items-after-an-index

                if(homePage === true){
                filteredTvSeries.length = 8
                }
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

                return (
                    <div key={genre} className="mb-8">
                    <h2 className="bg-gray-800 text-gray-200 py-2 rounded text-sm font-semibold uppercase mb-4 text-center w-screen cursor-pointer" onClick={() => handleTvGenreNav(genre)}>
                        {genre.toUpperCase()}
                    </h2>
                        <div className="flex flex-wrap gap-4 overflow-x-auto">
                            {filteredTvSeries.map(tvSeries => (
                                <TVSeriesCollection
                                    key={tvSeries.id}
                                    tvSeriesData={[tvSeries]} // Assuming TVSeriesCollection can handle an array of one
                                />
                            ))}
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default TVSeriesCarousel;