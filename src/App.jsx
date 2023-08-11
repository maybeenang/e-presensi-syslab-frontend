import { RootLayout } from "./layouts/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HistoryPage } from "./pages/HistoryPage";
import { PersistPage } from "./pages/PersistPage";
import { ProtectedPage } from "./pages/ProtectedPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminHistoryPage } from "./pages/AdminHistoryPage";
import { AdminUserPage } from "./pages/AdminUserPage";
import { AdminAbsenPage } from "./pages/AdminAbsenPage";
import { AdminUserDetail } from "./pages/AdminUserDetail";
import { AdminAbsenDetail } from "./pages/AdminAbsenDetail";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<PersistPage />}
        errorElement={
          <div className="grid h-screen w-screen place-content-center">
            <h1 className="text-2xl">Something went wrong {":("}</h1>
          </div>
        }
      >
        <Route element={<RootLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="admin" element={<ProtectedPage />}>
            <Route index element={<AdminPage />} />
            <Route path="history" element={<AdminHistoryPage />} />
            <Route path="user" element={<AdminUserPage />} />
            <Route path="user/:id" element={<AdminUserDetail />} />
            <Route path="absen" element={<AdminAbsenPage />} />
            <Route path="absen/:id" element={<AdminAbsenDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
