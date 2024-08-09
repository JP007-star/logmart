import AdminDashboard from "./containers/AdminDashboard";
import AdminLoginPage from "./containers/AdminLoginPage";
import AdminUsers from "./containers/AdminUserPage";
import CartPage from "./containers/CartPage";
import CheckOutPage from "./containers/CheckOutPage";
import HomePage from "./containers/HomePage";
import OrderConfirmationPage from "./containers/OrderConfirmationPage";

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
        path:"/admin/dashboard",
        element:<AdminDashboard/>
    },
    {
        path:"/admin/user/users",
        element:<AdminUsers/>
    },  
    {
        path:"/cart",
        element:<CartPage/>
    },
    {
        path:"/checkout",
        element:<CheckOutPage/>
    },
    {
        path:"/success",
        element:<OrderConfirmationPage/>
    },
]

export default routes;