import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import Posts from './pages/Posts';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JoinTheClub from './pages/JoinTheClub';
import NotFound from './pages/notFound';

import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Posts />} />
      <Route path="login" element={<Login />} />
      <Route path="accounts/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="submit" element={<Create />} />
      </Route>

      <Route element={<ProtectedRoute requireNonMember />}>
        <Route path="members/login" element={<JoinTheClub />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
