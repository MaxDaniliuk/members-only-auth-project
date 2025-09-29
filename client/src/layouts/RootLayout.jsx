import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
