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
    <div className="">

   <button class="hidden group-hover:block">Child</button>
    {/*<!-- Component: Basic image card --> */}
    {/* MT TOP BOTTOM */}

    {/* w-2/3 hover:w-full */}
  <div 
  className="overflow-hidden rounded text-slate-500 mt-4 ml-4 cursor-pointer hover:h-180"
  onClick={handleMovieNav}
  >
        {/*  <!--  Image --> */}
      <figure>
        <img
          src={thumbnail}
          alt="card image"
          className="h-48 w-full object-contain group-hover:hidden" 
        />
      </figure>
      {/*  <!-- Body--> */}
      <div className="p-6 group-hover:hidden">
        <header className="">
          <h3 className="text-xl font-medium text-black">
            {title}
          </h3>
          <p className="text-sm text-black">By {director}, {year_of_release}, {run_time}</p>
        </header>
      </div>
    </div>

    

    {/*<!-- End Basic image card --> */}
    </div>
  )
}

export default MovieCard;