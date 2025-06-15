import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">영화 웹</Link>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/ticket">예매티켓</Link>
        </nav>
      </div>
    </header>
  );
}
