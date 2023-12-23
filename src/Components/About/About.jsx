/* eslint-disable max-len, react/jsx-one-expression-per-line */
import './About.css';
import aboutPhotoImage from 'Images/photo_square.jpg';

const About = () => (
  <section className="about" id="about">
    <div className="container about-container">
      <h2 className="about-title">Об авторе</h2>
      <div className="about-card">
        <div className="about-photo">
          <img src={aboutPhotoImage} alt="Game author" />
        </div>
        <div className="about-text">
          <p>Привет! Меня зовут <strong>Кирилл</strong>, я начинающий frontend-разработчик. В сфере IT я работаю уже более 10 лет. Прежде чем перейти в веб-разработку, я занимался системным администрированием.</p>
          <p>Я учился на frontend-разработчика в онлайн-школе <strong>«Hexlet»</strong>, где освоил основы <strong>HTML</strong>, <strong>CSS</strong> и <strong>JavaScript</strong>. Опыт обучения в <strong>«Hexlet»</strong> позволил мне развить навыки веб-разработки и глубже понять принципы создания современных пользовательских интерфейсов.</p>
          <p>Меня привлекает frontend-разработка, потому что она позволяет мне соединить мои технические навыки с творческим подходом к созданию интерфейсов, которые улучшают взаимодействие людей с веб-приложениями.</p>
          <p>Я также люблю музыку и активно вовлечен в музыкальную сцену своего города. Я играю в городских рок-группах, что придает мне не только техническое, но и творческое вдохновение.</p>
          <p>Если у вас есть вопросы или вам нужна помощь с вашим веб-проектом, не стесняйтесь обращаться ко мне.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
