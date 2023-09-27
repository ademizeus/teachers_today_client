import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Navbar.css';
import { AuthContextTwo } from '../../../contexts/AuthProviderTwo';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { userTwo, logOutTwo } = useContext(AuthContextTwo);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }
    const handleLogOutTwo = () => {
        logOutTwo()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li className='navTextTwo'><Link to="/">Home</Link></li>
        <li className='navTextTwo'><Link to="/allTutors">All Tutors</Link></li>
        <li className='navTextTwo'><Link to="/allTutors">Contact Us</Link></li>

    </React.Fragment>

    return (
        <div className="navbar bg-transparent sticky flex justify-between max-w-[1320px] mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <img className='w-10 h-10' src='https://i.ibb.co/JzNfYXT/TT-transparent.png' alt=''></img>
                <h1 className='navText ml-5'>Teachers Today</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>

            </div>
            <div className="navbar-end">
                {
                    user?.uid ?
                    <div>
                         {user?.uid ?
                        <>
    
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogOut}>Sign out</button></li>
                        </>
                        :
                        <>
                            <Link to="/login"><a href="#_" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                                Log In
                            </a></Link>
                            <Link className='ml-5' to="/signup"><a href="#_" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                Create Account
                            </a></Link>
                        </>
                    } 
                    </div>
                    :
                    <div>
                        {userTwo?.uid ?
                        <>
    
                            <li><Link to="/dashboardTwo">Dashboard</Link></li>
                            <li><button onClick={handleLogOutTwo}>Sign out</button></li>
                        </>
                        :
                        <>
                            <Link to="/login"><a href="#_" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                                Log In
                            </a></Link>
                            <Link className='ml-5' to="/signup"><a href="#_" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                Create Account
                            </a></Link>
                        </>
                    }
                    </div>
                }
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;