import React, {useContext, useState} from "react";
import { useNavigate} from 'react-router-dom';
import YoutubeEmbed from "../YouTubeEmbedds/YouTubeEmbedd";
import ApiUrlContext from "../Api";

function MovieCard({thumbnail, title, director, year_of_release, run_time, movieId, trailerLink, fullMovie, handleDeleteAsync}) {
  
  const navigate = useNavigate()
  const apiUrl = useContext(ApiUrlContext)
  const [isHovered, setIsHovered] = useState(false);

  // console.log("TRAILER LINK:", trailerLink)
  // console.log("INSIDE OF THE MOVIE CARD:", handleDeleteAsync)

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

  const handleMovieNav = () => {
    navigate(`/movie/${movieId}`, { state: { fullMovie } })
  }


  return (

    <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className={`bg-gray-200 w-full transition-transform transform-gpu duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer rounded-lg mb-4 flex-shrink-0 ${isHovered ? 'scale-105' : 'scale-100'} h-auto mx-2`}
    style={{ width: isHovered ? '300px': '150px' }} // Updated width calculation
    onClick={handleMovieNav}
    >

    {isHovered ? (
      <div className="relative"> 
          <YoutubeEmbed 
          key={`${title}-${year_of_release}-S${run_time}`}
          embedId={trailerLink} 
          whereRendered={"TVSeries"}
          title={title}
          director={director} 
          year_of_release={year_of_release} 
          run_time={run_time}
          movieCard={true}
          />
          </div>
    ) : (
      <>
        <img
            src={thumbnail}
            alt={`Thumbnail of ${title}`}
            className="h-auto w-full overflow-hidden mx-auto"/>
      </>
    )}
    </div>
  )
}

export default MovieCard;