import React, { useContext, useState } from "react";
import ApiUrlContext from "../Api";
import { CurrentUserContext } from "../UserLogin/UserContext";
import AccordionItem from "./AccordionItem";

const UserDataTable = ({usersData, deleteUser}) => {

  return (
    <div>
      <div className="border-gray-300 mb-4 rounded border">       
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
      </div>
    </div>
    
  )
}

const AddUserForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getCookie = (name) => {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }

    return cookieValue
  }

  const addUser = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {};

    // Iterate over form data and store values in userData object
    for (let [key, value] of formData.entries()) {
        userData[key] = value;
    }

    fetch(`${apiUrl}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      },
      credentials: "include",
      body: JSON.stringify(userData),
    }).then((response) => {
      if (response.ok) {
        console.log(`A new user has successfully been added`)
      }
      else {
        response.json().then((errorData) => {
          console.error('Error Response:', errorData)
        })
      }
    }).catch((error) => {
      console.error('Fetch Error:', error)
    })

    console.log(userData);
  }
  
  return (
    <div>
      <form onSubmit={addUser}>
        <div className="flex flex-row">
          <label htmlFor="firstName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> First Name </label>
          <input type="text" name="first_name" className="w-50% rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="lastName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Last Name </label>
          <input type="text" name="last_name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
          <input type="email" name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="phone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone Number</label>
          <input type="phone" name="phone" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
          <input type="password" name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="date_of_birth" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Date of Birth</label>
          <input type="date_of_birth" name="date_of_birth" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="profile_image" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Profile Image</label>
          <input type="profile_image" name="profile_image" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="country" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Country</label>
          <input type="country" name="country" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="state" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">State</label>
          <input type="state" name="state" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>
        
        <div className="flex flex-row">
          <label htmlFor="city" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">City</label>
          <input type="city" name="city" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="address_line_1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Address Line 1</label>
          <input type="address_line_1" name="address_line_1" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="address_line_2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Address Line 2</label>
          <input type="address_line_2" name="address_line_2" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="postal_code" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Postal Code</label>
          <input type="postal_code" name="postal_code" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <button type="submit" className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none">Add User</button>

      </form>
    </div>
  )
}

const MovieDataTable = ({moviesData, deleteMovie}) => {

  return (
    <div>
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
    
  )
}

const AddMovieForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getCookie = (name) => {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }

    return cookieValue
  }

  const addMovie = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const movieData = {};

    for (let [key, value] of formData.entries()) {
        movieData[key] = value;
    }

    fetch(`${apiUrl}movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      },
      credentials: "include",
      body: JSON.stringify(movieData),
    }).then((response) => {
      if (response.ok) {
        console.log(`A new user has successfully been added`)
      }
      else {
        response.json().then((errorData) => {
          console.error('Error Response:', errorData)
        })
      }
    }).catch((error) => {
      console.error('Fetch Error:', error)
    })

    console.log(movieData);
  }
  
  return (
    <div>
      <form onSubmit={addMovie}>
        <div className="flex flex-row">
          <label htmlFor="firstName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> First Name </label>
          <input type="text" name="first_name" className="w-50% rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="lastName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Last Name </label>
          <input type="text" name="last_name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
          <input type="email" name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="phone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone Number</label>
          <input type="phone" name="phone" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
          <input type="password" name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="date_of_birth" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Date of Birth</label>
          <input type="date_of_birth" name="date_of_birth" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="profile_image" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Profile Image</label>
          <input type="profile_image" name="profile_image" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="country" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Country</label>
          <input type="country" name="country" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="state" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">State</label>
          <input type="state" name="state" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>
        
        <div className="flex flex-row">
          <label htmlFor="city" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">City</label>
          <input type="city" name="city" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="address_line_1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Address Line 1</label>
          <input type="address_line_1" name="address_line_1" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="address_line_2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Address Line 2</label>
          <input type="address_line_2" name="address_line_2" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div className="flex flex-row">
          <label htmlFor="postal_code" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Postal Code</label>
          <input type="postal_code" name="postal_code" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <button type="submit" className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none">Add User</button>

      </form>
    </div>
  )
}

function AdminDashboard({ usersData, tvSeriesData, moviesData }) {
    const { currentUser } = CurrentUserContext();
    const [activeIndex, setActiveIndex] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';')
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim()

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
              "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
            credentials: "include",
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
              "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
            credentials: "include",
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
          {index === 0 &&
            <div>
              <AccordionItem 
                contents={<UserDataTable usersData={usersData} deleteUser={deleteUser}/>}
                title={"All DNN Users"}
              />
              <AccordionItem 
                contents={<AddUserForm />}
                title={"Add a New User"}
              />
            </div>
          }

          {index === 1 &&
            <div>
              <AccordionItem 
                contents={<MovieDataTable moviesData={moviesData} deleteMovie={deleteMovie} />}
                title={"All DNN Movies"}
              />
            </div>
          }

          {index === 2 &&
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

      </div>
  )
}

export default AdminDashboard;