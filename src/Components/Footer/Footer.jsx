import './Footer.css';

import instagramIcon from '../../Images/social/instagram.svg';
import vkIcon from '../../Images/social/vk.svg';
import githubIcon from '../../Images/social/github.svg';
import telegramIcon from '../../Images/social/telegram.svg';
import mailRuIcon from '../../Images/social/mailru.svg';

const currentYear = new Date().getFullYear();

const SocialLink = ({ url, image, description }) => (
  <a href={url} target="_blank" rel="noreferrer">
    <img src={image} alt={description} title={description} />
  </a>
);

const socialLinksData = [
  {
    id: 1,
    url: 'https://t.me/tracktor',
    image: telegramIcon,
    description: 'Telegram',
  },
  {
    id: 2,
    url: 'https://instagram.com/realtracktor',
    image: instagramIcon,
    description: 'Instagram',
  },
  {
    id: 3,
    url: 'mailto:tracktor@bk.ru',
    image: mailRuIcon,
    description: 'Mail.RU',
  },
  {
    id: 4,
    url: 'https://vk.com/tracktor',
    image: vkIcon,
    description: 'ВКонтакте',
  },
  {
    id: 5,
    url: 'https://github.com/tracktor-git',
    image: githubIcon,
    description: 'GitHub',
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="container footer-container">
      <div className="copyright">{`Tracktor © ${currentYear}`}</div>
      <div className="social">
        {socialLinksData.map(({
          id, url, description, image,
        }) => <SocialLink key={id} url={url} description={description} image={image} />)}
      </div>
    </div>
  </footer>
);

export default Footer;
