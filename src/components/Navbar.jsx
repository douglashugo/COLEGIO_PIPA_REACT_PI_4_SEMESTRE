import React, { useState } from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`${styles.navbar} ${showMenu ? styles['show-menu'] : ''}`}>
      <div className={styles['header-inner-content']}>
        <h1 className={styles.logo}>
          COLÉGIO <span>PIPA</span>
        </h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Dicas</li>
            <li>Cadastro</li>
          </ul>
        </nav>
        <div className={styles['nav-icon-container']}>
          <img
            src="/menu.png"
            className={styles['menu-button']}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
