import { Link, useLocation } from 'react-router-dom';
 
const styles = {
  nav: {
    background: '#2C1A0E',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 20px rgba(44,26,14,0.3)',
  },
  logo: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.4rem',
    color: '#FAF7F2',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    gap: '0.5rem',
  },
  link: (active) => ({
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: active ? '#2C1A0E' : '#FAF7F2CC',
    background: active ? '#FAF7F2' : 'transparent',
    transition: 'all 0.2s',
  }),
};
 
export default function Navbar() {
  const loc = useLocation();
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🍳 Kuchařka</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link(loc.pathname === '/')}>Recepty</Link>
        <Link to="/suroviny" style={styles.link(loc.pathname === '/suroviny')}>Suroviny</Link>
      </div>
    </nav>
  );
}
 