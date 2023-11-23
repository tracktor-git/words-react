import robotLooseImage from '../../Images/robot_loose.svg';
import robotWinImage from '../../Images/robot_win.webp';

const GameResult = ({ isShown, robotWin }) => {
  if (!isShown) {
    return null;
  }

  const winTextTitle = robotWin ? 'Сожалеем, вы проиграли!' : 'Поздравляем, вы выиграли!';
  const winTextDesc = robotWin ? 'Время на ответ истекло.' : 'Робот не смог найти ответное слово.';
  const resultImage = robotWin ? robotWinImage : robotLooseImage;
  const titleClassName = robotWin ? 'game-result-message loose' : 'game-result-message';

  return (
    <div className="game-result">
      <link rel="preload" as="image" href={resultImage} />
      <img src={resultImage} alt="Результат игры" />
      <h3 className={titleClassName}>{winTextTitle}</h3>
      <p>{winTextDesc}</p>
    </div>
  );
};

export default GameResult;
