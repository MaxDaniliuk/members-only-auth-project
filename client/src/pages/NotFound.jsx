import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="error-page">
      <div>
        <p className="notfound-status">404</p>
        <p className="notfound-msg">Sorry we couldn't find that page.</p>
        <button>
          <Link to="/">BACK TO HOME</Link>
        </button>
      </div>
    </section>
  );
}
