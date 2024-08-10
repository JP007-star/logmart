import AdminHome from "./containers/AdminHome";
import AdminLoginPage from "./containers/AdminLoginPage";
import AdminOrders from "./containers/AdminOrders";
import AdminProducts from "./containers/AdminProducts";
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
        path:"/admin/home",
        element:<AdminHome/>
    },
    {
        path:"/admin/users",
        element:<AdminUsers/>
    },  
    {
        path:"/admin/orders",
        element:<AdminOrders/>
    },  
    {
        path:"/admin/products",
        element:<AdminProducts/>
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