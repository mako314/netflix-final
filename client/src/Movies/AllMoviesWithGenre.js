import React, {useState} from "react";
import MovieCollection from "./MovieCollection";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function AllMoviesWithGenre({ moviesData }) {

    const [dateSort, setDateSort] = useState('newest')

    const genres = ['comedy', 'drama', 'action', 'music'] // Just increase the number of genres for whatever we're aiming for

    const navigate = useNavigate()

    const handleMovieGenreNav = (movieGenre) => {
        navigate(`/movie/genre/${movieGenre}`, { state: { moviesData } })
    }

    const handleDateSort = (event) => {
        // console.log('Selected value:', event.target.value)
        setDateSort(event.target.value)
    }

    // https://stackoverflow.com/questions/72193794/how-to-sort-array-of-objects-by-date-but-with-most-current-date-first
    // https://stackoverflow.com/questions/72191289/sort-objects-by-datetime-in-javascript
    // https://stackoverflow.com/questions/68136203/how-to-use-javascript-sort-to-order-by-year-month-day
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    // userSortOption, checks whether newest is selected, only other option here is oldest, and sorts by that

    // Allows users to sort by either newest or oldest films, 
    let userSortOption = dateSort === 'newest' ?
    ((a, b) => new Date(b.release_date) - new Date(a.release_date)) : // Newest first
    ((a, b) => new Date(a.release_date) - new Date(b.release_date)) // Oldest first

    // console.log(typeof(userSortOption))
    // Create new variable to hold the data when sorting
    const sortedMovies = moviesData.sort(userSortOption)


    console.log("Movies sorted", sortedMovies)
    return (
        <div className="max-w-full mx-auto overflow-hidden mt-4 ml-4">

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

            {genres.map((genre) => {
                const filteredMovieSeries = sortedMovies.filter(tvSeries => 
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