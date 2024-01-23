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


// useNavigate
function App() {

  const [moviesData, setMoviesData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [favoritesData, setFavoritesData] = useState([])
  const [tvSeriesData, setTVSeriesData] = useState([]);

  useEffect(() => {
  // let ignore = false
  //------------------------------------- Fetch for Movies ----------------

    fetch(`https://netflix-final.onrender.com/movies`, {
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
    fetch(`http://127.0.0.1:5555/users`, {
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

  fetch(`http://127.0.0.1:5555/favorites`, {
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
    fetch(`http://127.0.0.1:5555/tv-series`, {
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

  return (


    <div className="App">
      <div className='flex'>
            <Navbar />
      </div>
      <div className='flex-grow p-4'>
      <h2 className="text-2xl font-bold">
        The current user's data: 
      </h2>
      <MovieCollection moviesData={moviesData} />
      <TVSeriesCollection tvSeriesData={tvSeriesData} />
      <Routes>
        <Route path='/movies' element={<MovieCollection moviesData={moviesData}/>} />
        <Route path='/movie/:id' element={<MovieDisplay moviesData={moviesData}/>} />
        <Route path='/tv-series' element={<TVSeriesCollection tvSeriesData={tvSeriesData} />} />
        <Route path='/tv-series/:id' element={<TVSeriesDisplay tvSeriesData={tvSeriesData} />} />
      </Routes>
    </div>
    </div>

  )
}

export default App
