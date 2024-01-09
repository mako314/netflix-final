import React from "react"
import { useNavigate} from 'react-router-dom';

function MovieCard({thumbnail, title, director, year_of_release, run_time, movieId, fullMovie}) {
  
  const navigate = useNavigate()

  // const handleMovieNav = () => {
  //   navigate(`/movie/${movieId}`)
  // }

  const handleMovieNav = (e) => {
    navigate(`/movie/${movieId}`, { state: { fullMovie } })
  }

  return (
    <>
    {/*<!-- Component: Basic image card --> */}
    {/* MT TOP BOTTOM */}

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

    {/*<!-- End Basic image card --> */}
    </>
  )
}

export default MovieCard;