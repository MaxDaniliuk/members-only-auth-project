import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// Layout
import RootLayout from './layouts/RootLayout';

// Pages
import Posts from './pages/Posts';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JoinTheClub from './pages/JoinTheClub';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Posts />} />
      <Route path="submit" element={<Create />} />
      <Route path="login" element={<Login />} />
      <Route path="accounts/signup" element={<Signup />} />
      <Route path="members/login" element={<JoinTheClub />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
