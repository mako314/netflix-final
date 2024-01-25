import React, { useState } from "react"

function Login(){

    const [currentUser, setCurrentUser] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [loginError, setLoginError] = useState({
        error: false,
        message: ""
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    function handleLogin(e) {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        fetch(`${apiUrl}login`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((resp) => {

            if (resp.ok) {

                resp.json().then((data) => {
                    if (data.role === 'user') {
                        console.log("A user has logged in successfully");
                        
                        setCurrentUser(data.user);
                        setUserFavorites(data.user.favorites);

                        setLoginError({
                            error: false,
                            message: ""
                        })

                        console.log(data.user);
                    }
                })
            } 
            else {

                resp.json().then((errorData) => {
                    console.error('Error Response:', errorData);
                    
                    setLoginError({
                        error: true,
                        message: errorData.error
                    })

                })
            }
        }).catch((error) => {
            //  catch network errors and other issues with the fetch request
            console.error('Fetch Error:', error)
        })
    }

    function handleLogout() {
        fetch(`${apiUrl}logout`, {
            method: "DELETE"
        }).then(setCurrentUser(null))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="mx-4 bg-slate-200 rounded-md" placeholder="Enter your email:"></input>
                </div>

                <br />

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="mx-4 bg-slate-200 rounded-md" placeholder="Enter your password:"></input>
                </div>

                <br />

                <button type="submit" className="bg-red-600 text-white" >Sign in</button>

                <br />
                { loginError.error && 
                    <p className="font-bold text-black">
                        {JSON.stringify(loginError.message)}
                    </p>
                }

                { currentUser.id &&
                    <>
                        <h1>
                            {`Welcome ${currentUser.first_name} ${currentUser.last_name}!`}
                        </h1>
                        <h1>
                            {`Your favorites: ${userFavorites[0].movie.title} and ${userFavorites[1].movie.title}`}
                        </h1>
                    </>
                }
            </form>
        </div>

    )

}

export default Login;