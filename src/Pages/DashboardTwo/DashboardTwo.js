import React, { useContext } from 'react';

import { Link, Outlet } from 'react-router-dom';
import UseAdmin from '../../Hook/useAdmin';
import { AuthContext } from '../../contexts/AuthProvider';
import Navbar from '../Shared/Navbar/Navbar';


const DashboardTwo = () => {

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to="/dashboardTwo/jobs">All tutors</Link></li>


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardTwo;