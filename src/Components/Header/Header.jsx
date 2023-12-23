import React from 'react';

import logoImage from 'Images/bulb.svg';
import './Header.css';

const scrollToBlock = (event, headerElement) => {
  event.preventDefault();

  const headerHeight = headerElement.offsetHeight;
  const blockId = event.target.getAttribute('href');
  const offset = document.querySelector(blockId).offsetTop - headerHeight;

  window.scrollTo({ top: offset, behavior: 'smooth' });
};

const navList = [
  { id: 1, href: 'game', title: 'Игра' },
  { id: 2, href: 'about', title: 'Об авторе' },
  { id: 3, href: 'rules', title: 'Правила' },
];

const Header = () => {
  const [isMenuOpened, setMenuOpened] = React.useState();
  const headerRef = React.useRef(null);

  React.useEffect(() => {
    if (isMenuOpened !== undefined) {
      document.body.classList.toggle('opened');
    }
  }, [isMenuOpened]);

  const handleNavLinkClick = (event) => {
    if (isMenuOpened) {
      setMenuOpened(false);
    }
    scrollToBlock(event, headerRef?.current);
  };

  const handleNavButtonClick = () => setMenuOpened(!isMenuOpened);
  const butonClassName = isMenuOpened ? 'burger-menu active' : 'burger-menu';

  return (
    <header className="header" ref={headerRef}>
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
          {navList.map(({ id, href, title }) => <a key={id} href={`#${href}`} className="nav-link" onClick={handleNavLinkClick}>{title}</a>)}
        </nav>
        <button type="button" aria-label="mobile-nav" className={butonClassName} onClick={handleNavButtonClick}>
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
