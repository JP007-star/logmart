import AdminDashboard from "./containers/AdminDashboard";
import AdminLoginPage from "./containers/AdminLoginPage";
import HomePage from "./containers/HomePage";

const routes=[
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/admin",
        element:<AdminLoginPage/>
    },
    {
        path:"/admin-dash",
        element:<AdminDashboard/>
    },
   
]

export default routes;