import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "../pages";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Navigation } from "../components/Navigation/Navigation";
import "./App.css";

export const App = () => {
  const [user, setUser] = useState(null);

  const login = () =>
    setUser({
      id: 1,
      name: "John",
      permissions: ["analize"],
      roles: ["admin"],
    });
  const logout = () => setUser(null);

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation />

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}

        <Routes>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                redirectTo="/home"
                isAllowed={!!user && user.permissions.includes("analize")}
              >
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                redirectTo="/home"
                isAllowed={!!user && user.roles.includes("admin")}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
