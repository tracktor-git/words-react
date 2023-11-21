import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FinishGameButton = ({ isShown, isDisabled, handleClick }) => {
  if (!isShown) {
    return null;
  }

  return (
    <button className="finish-game" type="button" disabled={isDisabled} onClick={handleClick}>
      <FontAwesomeIcon icon={faTimes} className="finish-game-icon" />
      <span>Завершить игру</span>
    </button>
  );
};

export default FinishGameButton;
