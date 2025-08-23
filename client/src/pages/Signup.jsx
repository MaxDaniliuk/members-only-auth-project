import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Signup() {
  return (
    <section className="signup-post-page">
      <div className="form-wrapper">
        <form autocomplete="false" action="" method="" id="form-signup">
          <div className="welcome-block">
            <h1>Create a new account</h1>
            <p>It’s quick and easy.</p>
          </div>
          <input
            autocomplete="false"
            type="text"
            name="fullname"
            id="signup-fullname"
            placeholder="Full Name"
          />
          <input
            autoComplete="false"
            type="email"
            name="email"
            id="signup-email"
            placeholder="Email"
          />
          <input
            autocomplete="false"
            type="text"
            name="username"
            id="signup-username"
            placeholder="Username"
          />
          <input
            autocomplete="false"
            type="password"
            name="password"
            id="signup-password"
            placeholder="Password"
          />
          <input
            autocomplete="false"
            type="password"
            name="confirmpassword"
            id="signup-confirm-password"
            placeholder="Confirm password"
          />

          <Button specClass={'signup'} disabled={true}>
            Sign up
          </Button>
        </form>
        <div className="redirect-block">
          <p>
            Have an account? <Link to="/login">Log in</Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}
