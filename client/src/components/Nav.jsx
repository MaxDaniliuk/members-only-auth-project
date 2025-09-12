import CustomLink from '../components/CustomLink';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav() {
  const { user, isLoaded } = useAuthContext();
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
            <CustomLink to="login">Log in</CustomLink>
          </div>
        )}
      </nav>
    </header>
  );
}
