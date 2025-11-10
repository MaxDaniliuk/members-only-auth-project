import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import PostsPage from './pages/Posts';
import CreatePage from './pages/Create';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import JoinTheClubPage from './pages/JoinTheClub';
import NotFoundPage from './pages/NotFound';

import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<PostsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="accounts/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="submit" element={<CreatePage />} />
      </Route>

      <Route element={<ProtectedRoute requireNonMember />}>
        <Route path="members/login" element={<JoinTheClubPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
