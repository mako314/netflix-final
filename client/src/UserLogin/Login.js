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

}

export default Login;