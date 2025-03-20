import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import apiSlice from '../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '../redux/apis/userSlice';
import { isPermitted } from '../helpers/isPermitted';

function Header() {
    const { data: userProfileData } = useGetProfileQuery({}, { skip: !localStorage.getItem("token") });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Logout function
    const logout = () => {
        localStorage.clear(); // Clear local storage
        dispatch(apiSlice.util.resetApiState()); // Clear RTK Query Cache
        navigate("/login");
    };


    return (
        <header className="bg-gray-800 py-4 shadow-md">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">User Management System</h1>
                <nav className="flex gap-6">
                    {isPermitted(userProfileData, "VIEW_USERS") && <NavLink to="/users" className="hover:text-gray-400">Users</NavLink>}
                    {isPermitted(userProfileData, "VIEW_ROLE") && <NavLink to="/roles" className="hover:text-gray-400">Roles</NavLink>}
                    {isPermitted(userProfileData, "VIEW_PERMISSION") && <NavLink to="/permissions" className="hover:text-gray-400">Permissions</NavLink>}
                    <button onClick={() => { logout(); navigate("/login"); }} className="hover:text-red-500">
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
