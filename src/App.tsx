import { BackgroundBase } from './components/BackgroundBase';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RouterError from "./components/RouterError";
import SignIn from "./components/Forms/SignIn";
import SignUp from "./components/Forms/SignUp";
import { Home } from "./components/Home";
import ProtectedRoute from "./utils/protectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <RouterError />,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <RouterError />,
  },
]);

function App() {
  return (
    <>
      <BackgroundBase />
      <div className="relative z-10"> {/* Ensure content appears on top of the background */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
