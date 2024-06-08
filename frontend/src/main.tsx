import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { IUserData, UserDataContext } from "./utils/UserDataContext";
import authorise from "./utils/authorise";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", loader: authorise, element: <Login /> },
  { path: "signup", loader: authorise, element: <Signup /> },
  { path: "friends", loader: authorise, element: <Friends /> },
]);

export default function App() {
  const [userData, setUserData] = useState<IUserData | null>(null);

  return (
    <React.StrictMode>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <RouterProvider router={router} />
      </UserDataContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
