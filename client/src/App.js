import './App.css';
import { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';

// ----- HomePage Imports -----
import HomePage from './HomePage/HomePage';

// ----- Movie Imports -----
import MovieCollection from './Movies/MovieCollection';
import MovieDisplay from './Movies/MovieDisplay';


// ----- Nabar / Footer Imports -----
import Navbar from './NavbarAndFooter/Navbar';

// ----- TVSeries Imports -----
import TVSeriesCollection from './TV_Series/TVSeriesCollection';
import TVSeriesDisplay from './TV_Series/TVSeriesDisplay';

import {ApiProvider} from './Api';

import Login from './UserLogin/Login'


// useNavigate
function App() {

  const [moviesData, setMoviesData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [favoritesData, setFavoritesData] = useState([])
  const [tvSeriesData, setTVSeriesData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL

  console.log("THE API URL", apiUrl)

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

  console.log("THE MOVIE DATA STATE:", moviesData)
  console.log("THE USER DATA STATE:", usersData)
  console.log("THE FAVORITE DATA STATE:", favoritesData)
  console.log("THE TV SERIES DATA STATE:", tvSeriesData)

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

  return (


    <div className="flex">
      <Navbar />
    

      {/* <MovieCollection moviesData={moviesData} />
      <TVSeriesCollection tvSeriesData={tvSeriesData} /> */}

      <Routes>
      <Route path='/' element={<HomePage moviesData={moviesData} tvSeriesData={tvSeriesData}/>} />
        <Route path='/movies' element={<MovieCollection moviesData={moviesData}/>} />
        <Route path='/movie/:id' element={<MovieDisplay moviesData={moviesData}/>} />
        <Route path='/tv-series' element={<TVSeriesCollection tvSeriesData={tvSeriesData} />} />
        <Route path='/tv-series/:id' element={<TVSeriesDisplay tvSeriesData={tvSeriesData} />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>

  )
}

export default App
