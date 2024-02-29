import React, {useState} from "react";
import TVSeriesCollection from "./TVSeriesCollection";
import HomePage from "../HomePage/HomePage";
import { useParams, useNavigate, useLocation } from "react-router-dom";


function TVSeriesCarousel({ tvSeriesData, homePage }) {
    // State to hold filter condtions, can likely become one state ? Wonder the pros / cons
    const [dateSort, setDateSort] = useState('newest')
    const [alphabetSort, setAlphabetSort] = useState(true)


    const navigate = useNavigate()

    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for

    // Navigate to that specific genre page, i.e., comedies, dramas, etc.
    const handleTvGenreNav = (movieGenre) => {
        navigate(`/tv/series/genre/${movieGenre}`, { state: { tvSeriesData } })
    }
    // Handle capturing the value logged by the users choice when sorting by Newest or Oldest.
    const handleDateSort = (event) => {
        // console.log('Selected value:', event.target.value)
        setAlphabetSort(null)
        setDateSort(event.target.value)
    }

    // Handle capturing the value logged by the users choice when sorting A-Z, or Z-A. No need for an else because return pulls you out of the function.
    const handleAlphabetSort = (event) => {
        // console.log('Selected value:', event.target.value)
        if (event.target.value === "true"){
            setDateSort(null)
            return setAlphabetSort(true)
        }
        setDateSort(null)
        setAlphabetSort(false)
    }

    // Sort the data by newest / oldest based on their release date. Create new date object, compare.
    // let userSortOption = dateSort === 'newest' ?
    // ((a, b) => new Date(b.release_date) - new Date(a.release_date)) : // Newest first
    // ((a, b) => new Date(a.release_date) - new Date(b.release_date)) // Oldest first

    // console.log(typeof(userSortOption))
    // Create new variable to hold the data when sorting
    const dateSortedData = [...tvSeriesData].sort(function(a,b){
        if(dateSort === 'newest'){
        return new Date(a.release_date) - new Date(b.release_date)
    } else if (dateSort === 'oldest'){
        return new Date(b.release_date) - new Date(a.release_date)
    } else{
        return
    }
    })

    // const sortedSeries = tvSeriesData.sort(userSortOption)

    // console.log(tvSeriesData.sort(userSortOption))

    console.log("the date sort option:", dateSort)

    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    // https://stackoverflow.com/questions/48111425/sort-objects-in-an-array-alphabetically-based-on-one-property
    // https://stackoverflow.com/questions/54298232/sorting-an-array-of-objects-alphabetically
    // https://stackoverflow.com/questions/12900058/how-can-i-sort-a-javascript-array-of-objects-numerically-and-then-alphabetically


    // Handles sorting the tv series by their title alphabetically, taking in a,b is standard syntax. Compare their titles uppercased, however this may be unnecessary as I believe localeCompare handles this already.
    // https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array
    // Removed upper casing.

    const alphabetSortedData = [...tvSeriesData].sort(function (a, b) {
        var textA = a.title
        var textB = b.title
      
        return alphabetSort ? textA.localeCompare(textB) : textB.localeCompare(textA);
    })


    // https://www.tutorialspoint.com/how-to-create-a-dropdown-list-using-javascript

    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">
            {/* <label for="foods">What do you want to eat?</label><br /> */}
        
        {!homePage && <div className="flex flex-row"> 
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

        </div>}

        


            {genres.map((genre) => {
                const dataToBeShown = alphabetSort !== null ? alphabetSortedData : dateSortedData
                const filteredTvSeries = dataToBeShown.filter(tvSeries => 
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