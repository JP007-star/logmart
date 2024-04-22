import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <>
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
