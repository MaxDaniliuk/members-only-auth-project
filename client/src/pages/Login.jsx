import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  return (
    <section className="login-post-page">
      <div className="form-wrapper">
        <form autocomplete="false" action="" method="" id="form-login">
          <div className="login-username">
            <p>SIGN IN WITH ACCOUNT NAME</p>
            <input
              autocomplete="false"
              type="text"
              name="username"
              id="login-username"
            />
          </div>
          <div className="login-password">
            <p>PASSWORD</p>
            <input
              autocomplete="false"
              type="password"
              name="password"
              id="login-password"
            />
          </div>
          <Button specClass={'signin'} disabled={true}>
            Sign in
          </Button>
        </form>
        <div className="redirect-block">
          <p>
            Don't have an account?{' '}
            <Link to="/accounts/signup">Sign up</Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}
