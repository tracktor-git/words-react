import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

import Timer from './Timer';

import routes from '../../routes';

const WordLink = ({ word }) => {
  const tooltipStyles = {
    backgroundColor: '#2a6149',
    color: '#fafafa',
    maxWidth: '250px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
      <a
        href={routes.vocabularyUrl(word)}
        className="robot-word"
        target="_blank"
        rel="noreferrer"
        data-tooltip-id="vocabulary-link-tooltip"
        data-tooltip-content={`Посмотреть значение слова «${word}» в словаре`}
        data-tooltip-place="right"
      >
        {`«${word}»`}
      </a>
      <Tooltip wrapper="span" id="vocabulary-link-tooltip" className="tooltip" style={tooltipStyles} />
    </>
  );
};

const RobotAnswerBlock = ({ startLetter, word, isRobotLoose }) => {
  if (isRobotLoose) {
    return (
      <div className="robot">
        <p>
          <span>Ответ робота: </span>
          <span className="robot-word loose">я сдаюсь :(</span>
        </p>
        <p>
          <span>Для продолжения нажмите </span>
          <b>«Завершить игру»</b>
        </p>
      </div>
    );
  }

  return (
    <div className="robot">
      <p>
        <span>Ответ робота: </span>
        <WordLink word={word} />
      </p>
      <p>
        <span>Назовите слово на букву </span>
        <span className="next-letter">{`«${startLetter}»`}</span>
        <Timer />
      </p>
    </div>
  );
};

export default RobotAnswerBlock;
