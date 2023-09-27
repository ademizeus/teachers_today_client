import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AllTutors from "../../Pages/AllTutors/AllTutors";
import SignUpPage from "../../Pages/SignUp/SignUpPage";
import LoginPage from "../../Pages/Login/LoginPage";
import PrivateRouteTwo from "../PrivateRouteTwo/PrivateRouteTwo";
import DashboardTwo from "../../Pages/DashboardTwo/DashboardTwo";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/signup',
                element: <SignUpPage></SignUpPage>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
           

        ]
    },
    {
        path: '/dashboardTwo',
        element: <PrivateRouteTwo><DashboardTwo></DashboardTwo></PrivateRouteTwo>,
        children: [
         
            {
                path: '/dashboardTwo/jobs',
                element: <AllTutors></AllTutors>
            },

        ]
    },
])

export default router;