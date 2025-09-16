import CustomLink from '../components/CustomLink';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav() {
  const { user, isLoaded, dispatch } = useAuthContext();

  async function handleLogout() {
    try {
      const res = await fetch('api/auth/user/logout', {
        credentials: 'include',
      });
      const result = await res.json();

      if (res.ok && result?.logout) {
        dispatch({ type: 'LOGOUT' });
        console.log(result?.message);
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
          <div className="nav-links">
            {user && !user?.ismember && (
              <CustomLink to="members/login">Star</CustomLink>
            )}

            <CustomLink to="/">Posts</CustomLink>
            {user && (
              <CustomLink to="submit">
                <div className="add-post">
                  <span className="add">+</span>
                  <span>Create</span>
                </div>
              </CustomLink>
            )}
            {user ? (
              <CustomLink to="/" onClick={handleLogout}>
                Log out
              </CustomLink>
            ) : (
              <CustomLink to="login">Log in</CustomLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
