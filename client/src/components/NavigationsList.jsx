import CustomLink from '../components/CustomLink';
import StarJoin from '../assets/images/star_join.svg?react';
import AddSign from '../assets/images/add.svg?react';

export default function NavigationsList({ className, user, handleLogout }) {
  return (
    <div className={className}>
      {user && !user?.ismember && (
        <CustomLink clsName="svg-nav-wrapper" to="members/login">
          <StarJoin className="star-join" />
        </CustomLink>
      )}
      <CustomLink clsName="nav-link" to="/">
        Posts
      </CustomLink>
      {user && (
        <CustomLink clsName="nav-link" to="submit">
          <div className="add-post">
            <span>Create</span>
            <AddSign className="add-sign" />
          </div>
        </CustomLink>
      )}
      {user ? (
        <CustomLink clsName="nav-link" to="/" onClick={handleLogout}>
          Log out
        </CustomLink>
      ) : (
        <CustomLink clsName="nav-link" to="login">
          Log in
        </CustomLink>
      )}
    </div>
  );
}
