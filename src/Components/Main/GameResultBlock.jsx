import robotLooseImage from '../../Images/robot_loose.svg';

const GameResult = ({ isShown }) => {
  if (!isShown) {
    return null;
  }

  return (
    <div className="game-result">
      <link rel="preload" as="image" href={robotLooseImage} />
      <img src={robotLooseImage} alt="Результат игры" />
      <h3 className="game-result-message">Поздравляем, вы выиграли!</h3>
      <p>Робот не смог найти ответное слово.</p>
    </div>
  );
};

export default GameResult;
