import React, {useState} from "react";
import MovieCollection from "./MovieCollection";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function AllMoviesWithGenre({ moviesData, homePage}) {
    // State to hold filter condtions, can likely become one state ? Wonder the pros / cons
    const [dateSort, setDateSort] = useState('newest')
    const [alphabetSort, setAlphabetSort] = useState(true)

    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for

    const navigate = useNavigate()

    const handleMovieGenreNav = (movieGenre) => {
        navigate(`/movie/genre/${movieGenre}`, { state: { moviesData } })
    }

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

    // https://stackoverflow.com/questions/72193794/how-to-sort-array-of-objects-by-date-but-with-most-current-date-first
    // https://stackoverflow.com/questions/72191289/sort-objects-by-datetime-in-javascript
    // https://stackoverflow.com/questions/68136203/how-to-use-javascript-sort-to-order-by-year-month-day
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    // userSortOption, checks whether newest is selected, only other option here is oldest, and sorts by that

    // Allows users to sort by either newest or oldest films, 
    // console.log(typeof(userSortOption))
    // Create new variable to hold the data when sorting
    const dateSortedData = [...moviesData].sort(function(a,b){
        if(dateSort === 'newest'){
        return new Date(a.release_date) - new Date(b.release_date)
    } else if (dateSort === 'oldest'){
        return new Date(b.release_date) - new Date(a.release_date)
    } else{
        return
    }
    })

    // Handles sorting the tv series by their title alphabetically, taking in a,b is standard syntax. Compare their titles uppercased, however this may be unnecessary as I believe localeCompare handles this already.
    // https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array
    // Removed upper casing.

    // sortedMovies.sort(function (a, b) {
    //     var textA = a.title
    //     var textB = b.title
      
    //     return alphabetSort ? textA.localeCompare(textB) : textB.localeCompare(textA);
    // })

    const alphabetSortedData = [...moviesData].sort(function (a, b) {
        var textA = a.title
        var textB = b.title
      
        return alphabetSort ? textA.localeCompare(textB) : textB.localeCompare(textA);
    })

    // https://www.tutorialspoint.com/how-to-create-a-dropdown-list-using-javascript            

    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">

        {!homePage && <div className="flex flex-row"> 
                    {/* <label for="foods">What do you want to eat?</label><br /> */}
                    <select 
                        className="block appearance-none w-auto bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2"
                        value={dateSort}
                        onChange={handleDateSort}
                    >
                        <option value="" disabled>--Please choose an option--</option>
                        <option name="newest_option" value="newest" id="newest">Newest Movies</option>
                        <option name="oldest_option" value="oldest" id="oldest">Oldest Movies</option>
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
        }

            {genres.map((genre) => {
                const dataToBeShown = alphabetSort !== null ? alphabetSortedData : dateSortedData                
                const filteredMovieSeries = dataToBeShown.filter(tvSeries => 
                    tvSeries.genres.toLowerCase().includes(genre)
                )

                if (filteredMovieSeries.length === 0) {
                    return null // Skip rendering if no TV series match the genre
                }

                return (
                    <div key={genre} className="mb-8">
                        <h2 className="bg-gray-800 text-gray-200 py-2 rounded text-sm font-semibold uppercase mb-4 text-center w-screen cursor-pointer" onClick={() => handleMovieGenreNav(genre)}>
                            {genre.toUpperCase()}
                        </h2>
                        <div className="flex flex-nowrap gap-4 overflow-x-auto">
                            {filteredMovieSeries.map((movies, index) => (
                                <MovieCollection
                                    key={index}
                                    filteredMovieData={[movies]} // Assuming TVSeriesCollection can handle an array of one
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default AllMoviesWithGenre;