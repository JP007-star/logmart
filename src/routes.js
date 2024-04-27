import AdminDashboard from "./containers/AdminDashboard";
import AdminLoginPage from "./containers/AdminLoginPage";
import AdminUsers from "./containers/AdminUserPage";
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
        path:"/admin/dash",
        element:<AdminDashboard/>
    },
    {
        path:"/admin/user",
        element:<AdminUsers/>
    },
   
]

export default routes;