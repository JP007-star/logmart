import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
     <ToastContainer />
       <Routes>
        {
          routes.map(route =>
            <Route key={route.path} inline={true.toString()} path={route.path}  element={route.element} />
          )
        }
      </Routes>
    </>
  );
}

export default App;
