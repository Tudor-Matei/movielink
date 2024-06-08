import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { IUserData, UserDataContext } from "./utils/UserDataContext";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
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
