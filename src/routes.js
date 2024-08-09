import AdminDashboard from "./containers/AdminDashboard";
import AdminLoginPage from "./containers/AdminLoginPage";
import AdminUsers from "./containers/AdminUserPage";
import CartPage from "./containers/CartPage";
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
    },   {
        path:"/cart",
        element:<CartPage/>
    },
]

export default routes;