import React, { useContext } from "react";
import ApiUrlContext from "../Api";
import { CurrentUserContext } from "../UserLogin/UserContext";

function AdminDashboard( { usersData, tvSeriesData, moviesData } ) {
    const { currentUser } = CurrentUserContext();

    const apiUrl = process.env.REACT_APP_API_URL;

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

    return (
        <div>
            <p>Hi {currentUser.first_name}</p>
            <div>
                <p>Need to add a way to retrieve all users... maybe delete them</p>
                <p>Need to add a way to edit existing movies and tv_series</p>
                <p>Need to add a way to add new tv series and movies</p>
            </div>

            <div className="m-6">
                <p>User Div</p>
                <tbody>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                        </tr>
                    {
                        usersData.map((user) =>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.date_of_birth}</td>
                            <td>
                                <button className="bg-red-600" type="button">
                                    &#128465;&#65039;
                                </button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
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
                        <tr>
                            <td>{tvSeries.id}</td>
                            <td>{tvSeries.title}</td>
                            <td><img className="h-8 w-16" src={tvSeries.thumbnail} /></td>
                            <td>{tvSeries.popularity}</td>
                            <td>{tvSeries.num_of_clicks}</td>
                            <td>
                                <button className="bg-red-600" type="button">
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