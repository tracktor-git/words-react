import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';

import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Tooltip } from 'react-tooltip';
import { addUsedWord, resetGame } from '../../redux/slices/usedWordsSlice';
import { incrementScore, resetScore } from '../../redux/slices/scoreSlice';
import { setErrorText, resetErrorText } from '../../redux/slices/errorSlice';
import selectors from '../../redux/selectors';

import routes from '../../routes';

import 'react-tooltip/dist/react-tooltip.css';
import robotLooseImage from '../../Images/robot_loose.webp';

function pluralize(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'слово';
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'слова';
  return 'слов';
}

const ScoreBlock = ({ score }) => {
  if (score < 1) {
    return null;
  }

  return (
    <p className="score">
      <span>Вы назвали </span>
      <span className="score-count">
        {score}
        &nbsp;
      </span>
      {pluralize(score)}
    </p>
  );
};

const FinishGameButton = ({ isShown, formik, handleClick }) => {
  if (!isShown) {
    return null;
  }

  return (
    <button className="finish-game" type="button" disabled={formik.isSubmitting} onClick={handleClick}>
      <FontAwesomeIcon icon={faTimes} className="fas fa-times" />
      <span>Завершить игру</span>
    </button>
  );
};

const makeWordQuoted = (word) => `«${word}»`;

const RobotAnswerBlock = ({ startLetter, robotWord, isGameOver }) => {
  const tooltipStyles = {
    backgroundColor: '#2a6149',
    color: '#fafafa',
    maxWidth: '250px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div className="robot">
      <p>
        <span>Ответ робота: </span>
        {isGameOver && <span className="robot-word loose">я сдаюсь :(</span>}
        <a
          href={routes.vocabularyUrl(robotWord)}
          className="robot-word"
          target="_blank"
          rel="noreferrer"
          data-tooltip-id="vocabulary-link-tooltip"
          data-tooltip-content={!isGameOver && `Посмотреть значение слова ${makeWordQuoted(robotWord)} в словаре`}
          data-tooltip-place="right"
          style={{ display: isGameOver ? 'none' : 'inline' }}
        >
          {makeWordQuoted(robotWord)}
        </a>
      </p>
      {!isGameOver && (
      <p>
        <span>Назовите слово на букву </span>
        <span className="next-letter">{makeWordQuoted(startLetter)}</span>
      </p>
      )}
      {isGameOver && (
      <p>
        <span>Для продолжения нажмите </span>
        <b>{makeWordQuoted('Завершить игру')}</b>
      </p>
      )}
      {!isGameOver && <Tooltip id="vocabulary-link-tooltip" className="tooltip" style={tooltipStyles} />}
    </div>
  );
};

const UserWordBlock = ({ word }) => {
  if (!word) {
    return null;
  }

  return (
    <div className="user">
      <p>
        <span>Ваше слово: </span>
        <span className="user-word">{makeWordQuoted(word)}</span>
      </p>
    </div>
  );
};

const ErrorBlock = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <div className="error">
      <p>{text}</p>
    </div>
  );
};

const UserWordSchema = (userWord, usedWords, firstLetter) => Yup.object().shape({
  userWord: Yup
    .string()
    .trim()
    .min(2, 'Слово должно состоять минимум из двух букв!')
    .max(25, 'Слишком длинное слово! Максимальная допустимая длина - 25 букв!')
    .notOneOf(usedWords, `Слово ${userWord} повторяется! Назовите другое слово на букву ${makeWordQuoted(firstLetter)}.`)
    .matches(/^[а-яёА-ЯЁ-]+$/, 'Введены некорректные символы! Допускаются буквы русского алфавита и дефис.', { excludeEmptyString: true })
    .matches(new RegExp(`^(${firstLetter}|\\b)`, 'i'), `Слово должно начинаться с буквы ${makeWordQuoted(firstLetter)}!`)
    .required('Не было введено слово!'),
});

const handleBackendErrors = (message, word) => {
  switch (message) {
    case 'INCORRECT_LENGTH':
      return 'Слишком длинное слово! Максимальная допустимая длина - 25 букв!';
    case 'INCORRECT_QUERY':
      return 'Некорректный запрос к серверу';
    case 'DUPLICATE_WORD':
      return 'Слово повторяется! Назовите другое слово.';
    case 'WRONG_FIRST_LETTER':
      return 'Слово должно начинаться не с этой буквы!';
    case 'NO_SUCH_WORD':
      return `Слово ${makeWordQuoted(word)} отсутствует в словаре. Назовите другое слово.`;
    case 'ROBOT_LOOSE':
      return 'Робот не нашёл ответного слова. Поздравляем, вы выиграли!';
    default:
      return 'Произошла неизвестная ошибка';
  }
};

const GameResult = () => {
  console.warn('Render Game Results');
  return (
    <div className="game-result">
      <img src={robotLooseImage} alt="Результат игры" />
      <h3 className="game-result-message">Поздравляем, вы выиграли!</h3>
      <p>Робот не смог найти ответное слово.</p>
    </div>
  );
};

const GameControls = () => {
  const userWordInputRef = useRef();
  const dispatch = useDispatch();

  const usedWords = useSelector(selectors.getUsedWords);
  const currentUserWord = usedWords.length > 1 ? usedWords[1] : null;
  const currentScore = useSelector(selectors.getCurrentScore);
  const lastRobotChar = useSelector(selectors.getLastRobotChar);
  const lastRobotWord = useSelector(selectors.getLastRobotWord);
  const errorText = useSelector(selectors.getErrorText);

  const formik = useFormik({
    initialValues: { userWord: '' },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      dispatch(setErrorText(''));
      // TODO: Use polyfill for String.prototype.replaceAll() -->
      const userWord = values.userWord.trim().toLowerCase().split('ё').join('е');
      const validationSchema = UserWordSchema(makeWordQuoted(userWord), usedWords, lastRobotChar);

      try {
        await validationSchema.validate({ userWord });

        const { data } = await axios({
          method: 'post',
          url: routes.backendUrl,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            payload: {
              usedWords: JSON.stringify([...usedWords]),
              userWord: JSON.stringify(userWord),
            },
          },
        });

        if (data.status === 'error') {
          if (data.message === 'ROBOT_LOOSE') {
            dispatch(addUsedWord(userWord));
            dispatch(addUsedWord(null));
          }
          const errorMessage = handleBackendErrors(data.message, userWord);
          formik.setFieldError('userWord', errorMessage);
          return;
        }

        if (data.status === 'ok') {
          const robotWord = data.message;
          dispatch(addUsedWord(userWord));
          dispatch(addUsedWord(robotWord));
          dispatch(incrementScore());
          formik.resetForm();
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formik.setFieldError('userWord', error.message);
          return;
        }

        if (error instanceof AxiosError) {
          formik.setFieldError('userWord', 'Ошибка сети');
          return;
        }
        console.log(error);
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      userWordInputRef?.current?.select();
    }, 10);

    if (formik.errors.userWord) {
      dispatch(setErrorText(formik.errors.userWord));
    }
  }, [dispatch, usedWords, formik.errors.userWord]);

  const handleFinishGame = () => {
    dispatch(resetErrorText());
    dispatch(resetGame());
    dispatch(resetScore());
    formik.resetForm();
  };

  const isGameStarted = currentScore > 0 && usedWords.length > 0;
  const isGameOver = lastRobotChar === null && lastRobotWord === null;

  const inputPlaceholder = lastRobotChar
    ? `Введите слово на букву ${makeWordQuoted(lastRobotChar)}...`
    : 'Введите слово...';

  return (
    <>
      {!isGameOver && (
      <form onSubmit={formik.handleSubmit} className={formik.errors.userWord && 'invalid'}>
        <div className="form-wrapper">
          <input
            type="text"
            autoComplete="off"
            className="word-input"
            name="userWord"
            placeholder={inputPlaceholder}
            ref={userWordInputRef}
            disabled={formik.isSubmitting}
            value={formik.values.userWord}
            onChange={formik.handleChange}
          />
          <button className="submit" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting && <i className="spinner" />}
            <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
            <span>Отправить</span>
          </button>
        </div>
        <ErrorBlock text={errorText} />
      </form>
      )}
      {isGameOver && <GameResult />}
      {isGameStarted && (
      <div className="messages">
        <UserWordBlock word={currentUserWord} />
        <RobotAnswerBlock
          startLetter={lastRobotChar}
          robotWord={lastRobotWord}
          isGameOver={isGameOver}
        />
      </div>
      )}
      <ScoreBlock score={currentScore} />
      <FinishGameButton formik={formik} handleClick={handleFinishGame} isShown={isGameStarted} />
    </>
  );
};

export default GameControls;
