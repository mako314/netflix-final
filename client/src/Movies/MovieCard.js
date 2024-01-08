import React from "react"

function MovieCard() {
    
  return (
    <>
      {/*<!-- Component: Basic image card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        {/*  <!--  Image --> */}
        <figure>
          <img
            src="https://picsum.photos/id/69/800/600"
            alt="card image"
            className="aspect-video w-full"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="">
            <h3 className="text-xl font-medium text-slate-700">
              Memories of the past
            </h3>
            <p className="text-sm text-slate-400"> By George, jun 3 2023</p>
          </header>
        </div>
      </div>
      {/*<!-- End Basic image card --> */}
    </>
  )
}

export default MovieCard;