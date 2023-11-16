/* eslint-disable react/jsx-one-expression-per-line */
import './Main.css';
import { useSelector } from 'react-redux';
import selectors from '../../redux/selectors';

import GameControls from './GameControls';

const UsedWordsBlock = ({ words }) => {
  if (words.length < 1) {
    return null;
  }
  return (
    <div className="used-words">
      <p>
        <span className="used-words-title">Ранее использованные слова:&nbsp;</span>
        <span className="used-words-body">{words.join(', ')}</span>
      </p>
    </div>
  );
};

const RobotAnswerBlock = ({ lastRobotChar, lastRobotWord }) => {
  if (!lastRobotChar || !lastRobotWord) {
    return null;
  }

  return (
    <div className="robot">
      <p>
        <span>Ответ робота:&nbsp;</span>
        <a href={`https://sanstv.ru/dict/${lastRobotWord}`} className="robot-word" target="_blank" rel="noreferrer">
          {lastRobotWord}
        </a>.&nbsp;
        <span>Назовите слово на букву&nbsp;</span>
        <span className="next-letter">«{lastRobotChar}»</span>
      </p>
    </div>
  );
};

const Main = () => {
  const usedWords = useSelector(selectors.getUsedWords);
  const lastRobotChar = useSelector(selectors.getLastRobotChar);
  const lastRobotWord = useSelector(selectors.getLastRobotWord);
  const errorText = useSelector(selectors.getErrorText);

  const userWord = usedWords.length > 1 ? usedWords[1] : null;

  return (
    <section className="main">
      <main className="game" id="game">
        <div className="container game-container">
          <GameControls />
          <div className="messages">
            <div className="error">
              <p>{errorText}</p>
            </div>
            <div className="user">
              {userWord && <p>Ваше слово: <span className="user-word">«{userWord}»</span></p>}
            </div>
            <RobotAnswerBlock
              lastRobotChar={lastRobotChar}
              lastRobotWord={lastRobotWord}
            />
          </div>
          <UsedWordsBlock words={usedWords} />
        </div>
      </main>
    </section>
  );
};

export default Main;
