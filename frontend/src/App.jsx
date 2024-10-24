import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from "./store/session";

import './index.css';
import Splash from "./components/Splash";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Links from "./components/Links/Links";
import Header from "./components/Navigation";
import Footer from "./components/Navigation/Footer";

function Layout() {
  const dispatch = useDispatch();

  // const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header>
        <Header />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <Footer />
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />
      },
      {
        path: "/login",
        element: <LoginSignup />
      },
      {
        path: "links",
        element: <Links />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}