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

const Main = () => {
  const usedWords = useSelector(selectors.getUsedWords);

  return (
    <section className="main">
      <main className="game" id="game">
        <div className="container game-container">
          <GameControls />
          <UsedWordsBlock words={usedWords} />
        </div>
      </main>
    </section>
  );
};

export default Main;
