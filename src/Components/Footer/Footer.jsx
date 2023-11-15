import './Footer.css';
import instagramIcon from '../../Images/social/instagram.svg';
import vkIcon from '../../Images/social/vk.svg';
import githubIcon from '../../Images/social/github.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
		<footer className="footer">
			<div className="container footer-container">
				<div className="copyright">Tracktor © {currentYear}</div>
				<div className="social">
					<a href="https://instagram.com/realtracktor" target="_blank" rel="noreferrer">
						<img src={instagramIcon} alt="Инстаграм" />
					</a>
					<a href="https://vk.com/tracktor" target="_blank" rel="noreferrer">
						<img src={vkIcon} alt="ВКонтакте" />
					</a>
					<a href="https://github.com/tracktor-git" target="_blank" rel="noreferrer">
						<img src={githubIcon} alt="GitHub" />
					</a>
				</div>
			</div>
		</footer>        
    );
};

export default Footer;
