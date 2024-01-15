import './App.css';
import { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';

// ----- Movie Imports -----
import MovieCollection from './Movies/MovieCollection';
import MovieDisplay from './Movies/MovieDisplay';


// useNavigate
function App() {

  const [moviesData, setMoviesData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [favoritesData, setFavoritesData] = useState([])
  const [tvSeriesData, setTVSeriesData] = useState([]);

  useEffect(() => {
  // let ignore = false
  //------------------------------------- Fetch for Movies ----------------

    fetch(`http://127.0.0.1:5555/movies`, {
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
  <h1 className="text-3xl font-bold underline">
    NAV
  </h1>
  <MovieCollection moviesData={moviesData}/>
      <Routes>
        <Route path='/movies' element={<MovieCollection moviesData={moviesData}/>} />
        <Route path='/movie/:id' element={<MovieDisplay moviesData={moviesData}/>}/>
      </Routes>
    </div>
  )
}

export default App
