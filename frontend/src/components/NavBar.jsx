import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ cartItemCount }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link style={styles.link} to="/">How Bazaar?</Link></li>
        <li style={styles.li}><Link style={styles.link} to="/seller/items">Manage Items</Link></li>
        <li style={styles.li}><Link style={styles.link} to="/seller/ratings">Ratings</Link></li>
        <li style={styles.li}><Link style={styles.link} to="/chatbot">Chatbot</Link></li>
        <li style={styles.li}><Link style={styles.link} to="/login">Login</Link></li>
        <li style={styles.li}>
          <Link style={styles.link} to="/cart">
            Cart ({cartItemCount})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#333',
    padding: '10px',
    borderBottom: '3px solid #c14400', // Moroccan terracotta accent
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  li: {
    margin: '0 10px',
  },
  link: {
    backgroundColor: '#c14400', // Warm terracotta
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontFamily: 'Merriweather, serif', // Moroccan-inspired font
    transition: 'background-color 0.3s ease',
    display: 'inline-block',
  },
};

export default NavBar;
