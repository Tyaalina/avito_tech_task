import GameDetails from './pages/GameDetails';
import MainPage from './pages/MainPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import GamePage from './pages/GamePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "game/:id",
    element: <GameDetails />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
