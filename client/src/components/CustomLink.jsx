import { NavLink, useLocation } from 'react-router-dom';

export default function CustomLink({ to, children, onClick, className }) {
  const location = useLocation();

  const handleClick = e => {
    if (onClick) {
      const loggedOut = onClick();

      if (!loggedOut) return;
    }
    if (location.pathname === to) {
      e.preventDefault();
    }
  };

  return (
    <NavLink className={className} to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
}
