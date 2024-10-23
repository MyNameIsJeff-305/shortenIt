import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from "./store/session";

import './index.css';
import Splash from "./components/Splash";

function Layout() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <div className="app-container">
      {
        sessionUser ? (
          <>
            <header className="app-header">
              <h1>This is Header</h1>
            </header>
            <main className="app-main">
              <Outlet />
            </main>
            <footer className="app-footer">
              <span>This is footer</span>
            </footer>
          </>
        ) : (
          <main className="app-main">
            <Outlet />
          </main>
        )
      }
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
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}