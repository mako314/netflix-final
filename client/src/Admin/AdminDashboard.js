import React, { useContext } from "react";
import ApiUrlContext from "../Api";
import { CurrentUserContext } from "../UserLogin/UserContext";

function AdminDashboard() {
    const { currentUser } = CurrentUserContext();

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
            </div>
            <div className="m-6">
                <p>Movie Div</p>
            </div>
            <div className="m-6">
                <p>TV Series Div</p>
            </div>
        </div>
    )
}

export default AdminDashboard;