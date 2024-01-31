import React, {useContext} from "react";
import { useNavigate} from 'react-router-dom';
import ApiUrlContext from "../Api";

function MovieCard({thumbnail, title, director, year_of_release, run_time, movieId, fullMovie, handleDeleteAsync}) {
  
  const navigate = useNavigate()
  const apiUrl = useContext(ApiUrlContext)


  console.log("INSIDE OF THE MOVIE CARD:", handleDeleteAsync)
  // const handleMovieNav = () => {
  //   navigate(`/movie/${movieId}`)
  // }


  const handleMovieDelete = () => {
    fetch(`${apiUrl}movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
  }).then((resp) => {
    // console.log(resp)
      if (resp.ok) {
          // If the response is OK
          // resp.json().then((data) => {
          //   setMoviesData(data)
          // })
          console.log(`${title} MOVIE DELETED`)
          handleDeleteAsync(movieId)
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
  }

  const handleMovieNav = (e) => {
    navigate(`/movie/${movieId}`, { state: { fullMovie } })
  }

  return (
    <>
    {/*<!-- Component: Basic image card --> */}
    {/* MT TOP BOTTOM */}
      <> 
      <div 
      className="overflow-hidden rounded bg-gray-400 text-slate-500 shadow-xl shadow-slate-200 mt-4 ml-4"
      onClick={handleMovieNav}
      >
        {/*  <!--  Image --> */}
      <figure>
        <img
          src={thumbnail}
          alt="card image"
          className="h-48 w-full object-contain" 
        />
      </figure>
      {/*  <!-- Body--> */}
      <div className="p-6">
        <header className="">
          <h3 className="text-xl font-medium text-black">
            {title}
          </h3>
          <p className="text-sm text-black">By {director}, {year_of_release}, {run_time}</p>
        </header>

      </div>
    </div>
    <button 
        className="py-4 px-4 border-2 border-red-600 border-b-gray-300"
        onClick={handleMovieDelete}
        >
        DELETE
  </button>

    </>

    {/*<!-- End Basic image card --> */}
    </>
  )
}

export default MovieCard;