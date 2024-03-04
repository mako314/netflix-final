import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// ----- HomePage Imports -----
import HomePage from './HomePage/HomePage';

// ----- Movie Imports -----
import MovieCollection from './Movies/MovieCollection';
import MovieDisplay from './Movies/MovieDisplay';
import AllMoviesWithGenre from './Movies/AllMoviesWithGenre';
import MovieByGenre from './Movies/MovieByGenre';

// ----- Nabar / Footer Imports -----
import Navbar from './NavbarAndFooter/Navbar';

// ----- TVSeries Imports -----
import TVSeriesCollection from './TV_Series/TVSeriesCollection';
import TVSeriesDisplay from './TV_Series/TVSeriesDisplay';
import TVSeriesCarousel from './TV_Series/TVSeriesCarousel';
import TvSeriesByGenre from './TV_Series/TvSeriesByGenre';

import { ApiProvider } from './Api';
import { CurrentUserProvider } from './UserLogin/UserContext';

// ----- Login Page Imports -----

import Login from './UserLogin/Login'

// ----- Admin Imports -----
import AdminDashboard from './Admin/AdminDashboard';

// ----- Search Result Imports -----
import SearchResults from './HomePage/SearchResults';

// useNavigate
function App() {

  const [moviesData, setMoviesData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [favoritesData, setFavoritesData] = useState([])
  const [tvSeriesData, setTVSeriesData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  const apiUrl = process.env.REACT_APP_API_URL

  // console.log("THE API URL", apiUrl)

  useEffect(() => {
  // let ignore = false
  //------------------------------------- Fetch for Movies ----------------

    fetch(`${apiUrl}movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((resp) => {
      // console.log(resp)
        if (resp.ok) {
            // If the response is OK
            resp.json().then((data) => {
              setMoviesData(data)
            })
        } else {
            // If the response is not OK, handle errors
            resp.json().then((errorData) => {
            console.error('Error Response:', errorData)
            })
        }
    }).catch((error) => {
        //  catch network errors and other issues with the fetch request
        console.error('Fetch Error:', error)
    })

//------------------------------------- Fetch for Users ----------------
    fetch(`${apiUrl}users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((resp) => {
      //console.log(resp)
        if (resp.ok) {
            // If the response is OK
            resp.json().then((data) => {
              setUsersData(data)
            })
        } else {
            // If the response is not OK, handle errors
            resp.json().then((errorData) => {
            console.error('Error Response:', errorData)
            })
        }
    }).catch((error) => {
        //  catch network errors and other issues with the fetch request
        console.error('Fetch Error:', error)
    })

  //----------------------FETCH FOR FAVORITES-----------------------------

  fetch(`${apiUrl}favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    }).then((resp) => {
      //console.log(resp)
        if (resp.ok) {
            // If the response is OK
            resp.json().then((data) => {
              setFavoritesData(data)
            })
        } else {
            // If the response is not OK, handle errors
            resp.json().then((errorData) => {
            console.error('Error Response:', errorData)
            })
        }
    }).catch((error) => {
        //  catch network errors and other issues with the fetch request
        console.error('Fetch Error:', error)
    })

    //----------------------FETCH FOR TV SERIES-----------------------------
    fetch(`${apiUrl}tv-series`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setTVSeriesData(data)
          console.log("TV SERIES DATA:", tvSeriesData)
        })
      }
      else {
        response.json().then((errorData) => {
          console.error('Error Response:', errorData)
        })
      }
    }).catch((error) => {
      console.error('Fetch Error:', error)
    })
  }, [])

  // console.log("THE MOVIE DATA STATE:", moviesData)
  // console.log("THE USER DATA STATE:", usersData)
  // console.log("THE FAVORITE DATA STATE:", favoritesData)
  // console.log("THE TV SERIES DATA STATE:", tvSeriesData)

  const handleDeleteAsync = (movieID) => {
    const movieToBeDeleted = moviesData.filter(item => item.id !== movieID)

    console.log("THE MOVE THATS GOING TO BE DELETED", movieToBeDeleted)

    setMoviesData(movieToBeDeleted)
  }

  // function handleDeleteFilter(movieID) {
  //   const newMovieArray = moviesData.map(item => item.filter((item) => item.id !== movieID))

  //   console.log("The new movies:", newMovieArray)

  //   // const data = moviesData.filter((item) => item.id == movieID).map((item) => item);
  //   // console.log(data);

  // }

  // https://github.com/remix-run/react-router/blob/v3/docs/guides/RouteConfiguration.md#enter-and-leave-hooks
  // https://github.com/remix-run/react-router/blob/v3/docs/Glossary.md#leavehook
  // https://stackoverflow.com/questions/32841757/detecting-user-leaving-page-with-react-router

  const onLeaveTest = () => {
    console.log("Testing leaving this display page")
  }

  // console.log("CHECK THIS FOR THE TIMESTAMP TEST", testingTimeStamp)

  
  // Next things to do:
  // Search function similar to the one slalom quest had, where we deconstruct the prop and use it as the search parameters.
  // Search function will take a user to a search page, filtering over the data both shows and movies and display it on the page.

  // Not sure what else is left to be done, the idea of a streaming site is a simple concept that doesn't need too much. We won't be accepting payments or anything,

  return (
    // UseContext gets called here
    <ApiProvider> 
    <div className="flex">
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
    

      {/* <MovieCollection moviesData={moviesData} />
      <TVSeriesCollection tvSeriesData={tvSeriesData} /> */}

      <Routes>
      <Route path='/' element={<HomePage moviesData={moviesData} tvSeriesData={tvSeriesData}/>} />
        <Route path='/movies' element={<AllMoviesWithGenre moviesData={moviesData}/>} />
        <Route path='/movie/:id' element={<MovieDisplay moviesData={moviesData}/>} />
        <Route path='/tv-series' element={<TVSeriesCarousel tvSeriesData={tvSeriesData} />} />
        <Route path='/tv-series/:id' element={<TVSeriesDisplay tvSeriesData={tvSeriesData} />} onLeave={ onLeaveTest }/>
        <Route path='/login' element={<Login />} />
        <Route path='/movie/genre/:genre' element={<MovieByGenre moviesData={moviesData}/>} />
        <Route path='/tv/series/genre/:genre' element={<TvSeriesByGenre tvSeriesData={tvSeriesData}/>} />
        <Route path='/search?query=:searchTerm}' element={<SearchResults/>}/>

      </Routes>

    </div>
    </ApiProvider>

  )
}

export default App
