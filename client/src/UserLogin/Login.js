import React, { useState } from "react"

function Login(){

    const [currentUser, setCurrentUser] = useState([]);
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
                    }
                })
            } 
            else {

                resp.json().then((errorData) => {
                    console.error('Error Response:', errorData)
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
                    <input type="text" name="email" id="email" placeholder="Enter your email:"></input>
                </div>

                <br />

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password:"></input>
                </div>

                <br />

                <button type="submit">Sign in</button>
            </form>
        </div>
    )

}

export default Login;