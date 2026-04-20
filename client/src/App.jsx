import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PrivateRoute } from "./api/components/PrivateRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
