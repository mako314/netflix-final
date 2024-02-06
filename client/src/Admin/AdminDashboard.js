import React, { useContext } from "react";
import ApiUrlContext from "../Api";
import { CurrentUserContext } from "../UserLogin/UserContext";

function AdminDashboard() {
    const { currentUser } = CurrentUserContext();

    return (
        <>
            <p>Hi {currentUser.first_name}</p>

        </>
    )
}

export default AdminDashboard;