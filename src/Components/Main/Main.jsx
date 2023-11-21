/* eslint-disable react/jsx-one-expression-per-line */
import './Main.css';
import GameControls from './GameControls';

const Main = () => (
  <section className="main">
    <main className="game" id="game">
      <div className="container game-container">
        <GameControls />
      </div>
    </main>
  </section>
);

export default Main;
