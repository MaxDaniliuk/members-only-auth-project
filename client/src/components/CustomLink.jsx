import { NavLink, useLocation } from 'react-router-dom';

export default function CustomLink({ to, children }) {
  const location = useLocation();

  const handleClick = e => {
    if (location.pathname === to) {
      e.preventDefault();
    }
  };

  return (
    <NavLink to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
}
