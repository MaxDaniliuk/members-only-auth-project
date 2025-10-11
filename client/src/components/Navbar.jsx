import NavigationsList from './NavigationsList';
import DropdownButton from '../assets/images/hamburger-button.svg?react';
import CloseDropdownButton from '../assets/images/close-nav-button.svg?react';
import CustomLink from './CustomLink';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, isLoaded, dispatch } = useAuthContext();
  const { dispatch: postsDispatch } = usePostsContext();
  const [dropdownMode, setdropdownMode] = useState(true);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  useEffect(() => {
    const handleDropdownResize = () => {
      if (window.innerWidth <= 700) {
        setdropdownMode(true);
      } else {
        setdropdownMode(false);
      }
    };

    handleDropdownResize();

    window.addEventListener('resize', handleDropdownResize);

    return () => window.removeEventListener('resize', handleDropdownResize);
  }, []);

  function toggleDropdown() {
    setDropdownOpened(prevState => !prevState);
  }

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/user/logout', {
        credentials: 'include',
      });
      const result = await res.json();

      if (res.ok && result?.logout) {
        dispatch({ type: 'LOGOUT' });
        postsDispatch({ type: 'SUCCESS', payload: result.postsResponse });
        return result?.logout;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  return (
    <header id="header">
      <nav className="nav">
        <h1>
          <CustomLink to="/">CyberClub</CustomLink>
        </h1>
        {isLoaded && (
          <div className="navigation-wrapper">
            {dropdownMode ? (
              <button className="dropdown-btn" onClick={toggleDropdown}>
                {dropdownOpened ? (
                  <CloseDropdownButton className="close-dropdown" />
                ) : (
                  <DropdownButton className="hamburger-dropdown" />
                )}
              </button>
            ) : (
              <NavigationsList
                className={'nav-links'}
                user={user}
                handleLogout={handleLogout}
              />
            )}
          </div>
        )}
      </nav>
      {dropdownOpened && dropdownMode ? (
        <NavigationsList
          className={'dropdown'}
          user={user}
          handleLogout={handleLogout}
        />
      ) : null}
    </header>
  );
}
