import { useEffect, useState } from 'react';

import logoImage from '../../Images/bulb.svg';
import './Header.css';

const scrollToBlock = (event) => {
  event.preventDefault();

  const headerHeight = document.querySelector('.header').offsetHeight;
  const blockId = event.target.getAttribute('href');
  const offset = document.querySelector(blockId).offsetTop - headerHeight;

  window.scrollTo({ top: offset, behavior: 'smooth' });
};

const Header = () => {
  const [isMenuOpened, setMenuOpened] = useState();

  useEffect(() => {
    if (isMenuOpened !== undefined) {
      document.body.classList.toggle('opened');
    }
  }, [isMenuOpened]);

  const handleNavLinkClick = (event) => {
    if (isMenuOpened) {
      setMenuOpened(false);
    }
    scrollToBlock(event);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <a href="./">
            <div className="logo-img">
              <img src={logoImage} alt="Logo" />
            </div>
            <div className="logo-text">Игра в слова</div>
          </a>
        </div>
        <nav className={isMenuOpened ? 'nav opened' : 'nav'}>
          <a href="#game" className="nav-link" onClick={handleNavLinkClick}>Игра</a>
          <a href="#about" className="nav-link" onClick={handleNavLinkClick}>Об авторе</a>
          <a href="#rules" className="nav-link" onClick={handleNavLinkClick}>Правила</a>
        </nav>
        <button type="button" aria-label="mobile-nav" className={isMenuOpened ? 'burger-menu active' : 'burger-menu'} onClick={() => setMenuOpened(!isMenuOpened)}>
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
