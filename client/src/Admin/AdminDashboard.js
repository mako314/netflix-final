import React, { useContext, useState } from "react";
import ApiUrlContext from "../Api";
import { CurrentUserContext } from "../UserLogin/UserContext";

function AdminDashboard( { usersData, tvSeriesData, moviesData } ) {
    const { currentUser } = CurrentUserContext();
    const [activeIndex, setActiveIndex] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';')
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim()
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                  break
              }
          }
      }
      return cookieValue
  }
    

    function deleteUser(userID) {
        console.log(usersData);

        fetch(`${apiUrl}users/${userID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
            credentials: "include",
            body: JSON.stringify({
                id: userID,
            }),
          }).then((response) => {
            if (response.ok) {
              console.log(`User of id of ${userID} has been successfully deleted`)
              /*response.json().then((data) => {
                setTVSeriesData(data)
              }) */
            }
            else {
              response.json().then((errorData) => {
                console.error('Error Response:', errorData)
              })
            }
          }).catch((error) => {
            console.error('Fetch Error:', error)
        })
    }

    function deleteMovie(movieID) {
        console.log(moviesData);
        
        fetch(`${apiUrl}movies/${movieID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: movieID,
            }),
          }).then((response) => {
            if (response.ok) {
              console.log(`Movie of id of ${movieID} has been successfully deleted`)
              /*response.json().then((data) => {
                setTVSeriesData(data)
              }) */
            }
            else {
              response.json().then((errorData) => {
                console.error('Error Response:', errorData)
              })
            }
          }).catch((error) => {
            console.error('Fetch Error:', error)
        })
    }

    function deleteTVSeries(tvSeriesID) {
        console.log(tvSeriesData);
        
        fetch(`${apiUrl}tv-series/${tvSeriesID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: tvSeriesID,
            }),
          }).then((response) => {
            if (response.ok) {
              console.log(`TV series with id of ${tvSeriesID} has been successfully deleted`)
              /*response.json().then((data) => {
                setTVSeriesData(data)
              }) */
            }
            else {
              response.json().then((errorData) => {
                console.error('Error Response:', errorData)
              })
            }
          }).catch((error) => {
            console.error('Fetch Error:', error)
        })
    }

	const handleClick = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	const accordionData = [
		{
			title: "User Panel",
			content: usersData,
		},
		{
			title: "Movie Panel",
			content: moviesData,
		},
		{
			title: "TV Series Panel",
			content: tvSeriesData,
		},
	];

    return (
        <div>
            {accordionData.map((item, index) => (
				<div
					className="border-gray-300 mb-4 rounded border"
					key={index}
				>
					<div
						className="accordion-header bg-gray-100 cursor-pointer px-4 py-2"
						onClick={() => handleClick(index)}
					>
						{item.title}
					</div>
					<div
						className={`accordion-content bg-white px-4 pb-4 pt-2 ${
							activeIndex === index ? "block" : "hidden"
						}`}
					>
            {index == 0 && 
             <tbody>
             <tr>
                 <th>ID</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Email</th>
                 <th>Date of Birth</th>
             </tr>
              {
                item.content.map((user) =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.date_of_birth}</td>
                    <td>
                        <button className="bg-red-600" type="button" onClick={() => deleteUser(user.id)}>
                            &#128465;&#65039;
                        </button>
                    </td>
                </tr>
                )
              }
              </tbody>
            }

            {index == 1 &&
              <tbody>
              <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Popularity</th>
                  <th>Click Count</th>
              </tr>
                {
                    item.content.map((movie) =>
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td><img className="h-8 w-16" src={movie.thumbnail} /></td>
                        <td>{movie.popularity}</td>
                        <td>{movie.num_of_clicks}</td>
                        <td>
                            <button className="bg-red-600" type="button" onClick={() => deleteMovie(movie.id)}>
                                &#128465;&#65039;
                            </button>
                        </td>
                    </tr>
                    )
                }
              </tbody>
            }

            {index == 2 &&
              <tbody>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Popularity</th>
                    <th>Click Count</th>
                </tr>
                {
                  item.content.map((tvSeries) =>
                  <tr key={tvSeries.id}>
                      <td>{tvSeries.id}</td>
                      <td>{tvSeries.title}</td>
                      <td><img className="h-8 w-16" src={tvSeries.thumbnail} /></td>
                      <td>{tvSeries.popularity}</td>
                      <td>{tvSeries.num_of_clicks}</td>
                      <td>
                          <button className="bg-red-600" type="button" onClick={() => deleteTVSeries(tvSeries.id)}>
                              &#128465;&#65039;
                          </button>
                      </td>
                  </tr>
                  )
                }
              </tbody>
            }

					</div>
				</div>
			))}

            <p>Hi {currentUser.first_name}</p>
            <div>
                <p>Need to add a way to retrieve all users... maybe delete them</p>
                <p>Need to add a way to edit existing movies and tv_series</p>
                <p>Need to add a way to add new tv series and movies</p>
            </div>

            <div className="m-6">
             
              <p>User Div</p>
          </div>

            <div className="m-6">
                <p>Movie Div</p>

                <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Popularity</th>
                            <th>Click Count</th>
                        </tr>
                    {
                        moviesData.map((movie) =>
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td><img className="h-8 w-16" src={movie.thumbnail} /></td>
                            <td>{movie.popularity}</td>
                            <td>{movie.num_of_clicks}</td>
                            <td>
                                <button className="bg-red-600" type="button" onClick={() => deleteMovie(movie.id)}>
                                    &#128465;&#65039;
                                </button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </div>

            <div className="m-6">
                <p>TV Series Div</p>
                <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Popularity</th>
                            <th>Click Count</th>
                        </tr>
                    {
                        tvSeriesData.map((tvSeries) =>
                        <tr key={tvSeries.id}>
                            <td>{tvSeries.id}</td>
                            <td>{tvSeries.title}</td>
                            <td><img className="h-8 w-16" src={tvSeries.thumbnail} /></td>
                            <td>{tvSeries.popularity}</td>
                            <td>{tvSeries.num_of_clicks}</td>
                            <td>
                                <button className="bg-red-600" type="button" onClick={() => deleteTVSeries(tvSeries.id)}>
                                    &#128465;&#65039;
                                </button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </div>

        </div>
    )
}

export default AdminDashboard;