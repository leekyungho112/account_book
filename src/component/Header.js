import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
function Header() {
  return (
    <div className={styles.header}>
      <h1>
        <Link className={styles.header_logo} to="/">
          account_books
        </Link>
      </h1>
      <div className={styles.menu}>
        <Link to="/create_account" className={styles.link}>
          작성하기
        </Link>
        <Link to="/create_day" className={styles.link}>
          Day 추가
        </Link>
      </div>
    </div>
  );
}

export default Header;
