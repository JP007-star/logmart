// src/routes.js
import AdminHome from './containers/AdminHome';
import AdminLoginPage from './containers/AdminLoginPage';
import AdminOrders from './containers/AdminOrders';
import AdminProducts from './containers/AdminProducts';
import AdminUsers from './containers/AdminUserPage';
import CartPage from './containers/CartPage';
import CheckOutPage from './containers/CheckOutPage';
import HomePage from './containers/HomePage';
import OrderConfirmationPage from './containers/OrderConfirmationPage';
import PrivateRoute from './privateRoutes';

// Routes configuration
const routes = [
  {
    path: '/',
    element: <HomePage /> // Accessible by all users
  },
  {
    path: '/admin',
    element: <AdminLoginPage /> // Login page accessible by everyone
  },
  {
    path: '/admin/home',
    element: <PrivateRoute element={AdminHome} roles={['admin']} /> // Admin role required
  },
  {
    path: '/admin/users',
    element: <PrivateRoute element={AdminUsers} roles={['admin']} /> // Admin role required
  },
  {
    path: '/admin/orders',
    element: <PrivateRoute element={AdminOrders} roles={['admin']} /> // Admin role required
  },
  {
    path: '/admin/products',
    element: <PrivateRoute element={AdminProducts} roles={['admin']} /> // Admin role required
  },
  {
    path: '/cart',
    element: <PrivateRoute element={CartPage} roles={['user', 'admin']} /> // User or Admin role required
  },
  {
    path: '/checkout',
    element: <PrivateRoute element={CheckOutPage} roles={['user', 'admin']} /> // User or Admin role required
  },
  {
    path: '/success',
    element: <PrivateRoute element={OrderConfirmationPage} roles={['user', 'admin']} /> // User or Admin role required
  }
];

export default routes;
