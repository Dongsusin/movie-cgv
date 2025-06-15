import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">영화 웹</Link>
        <nav>
          <Link to="/">홈</Link>
          {/* 추후 다른 메뉴 추가 가능 */}
        </nav>
      </div>
    </header>
  );
}
