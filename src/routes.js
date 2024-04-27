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
   
]

export default routes;