import React from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';
import NotFound from './pages/404';
import Login from './pages/login';
import Users from './pages/users';
import User from './pages/user';

function App() {

  const routes: RouteProps[] = [
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/users",
      element: <Users />
    },
    {
      path: "/user/:id",
      element: <User />
    }
  ]

  return (
    <div className="w-full min-h-screen">
      <Routes>
        {routes.map(({path, element}) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
