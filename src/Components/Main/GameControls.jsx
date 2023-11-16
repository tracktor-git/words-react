import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addUsedWord, resetGame } from '../../redux/slices/usedWordsSlice';
import { incrementScore, resetScore } from '../../redux/slices/scoreSlice';
import { setErrorText } from '../../redux/slices/errorSlice';
import selectors from '../../redux/selectors';

const ScoreBlock = ({ score }) => {
  if (score < 1) {
    return null;
  }

  return (
    <p className="score">
      <span>Вы отгадали слов:&nbsp;</span>
      <span><b>{score}</b></span>
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

const UserWordSchema = (usedWords, firstLetter) => Yup.object().shape({
  userWord: Yup
    .string()
    .trim()
    .min(2, 'Слово должно состоять минимум из двух букв!')
    .max(35, 'Слишком длинное слово!')
    .notOneOf(usedWords, 'Слова не должны повторяться!')
    .matches(/^[а-яёА-ЯЁ-]+$/, 'Введены некорректные символы!', { excludeEmptyString: true })
    .matches(new RegExp(`^(${firstLetter}|\\b)`, 'i'), `Слово должно начинаться с буквы "${firstLetter}"!`)
    .required('Не было введено слово!'),
});

const GameControls = () => {
  const usedWords = useSelector(selectors.getUsedWords);
  const currentScore = useSelector(selectors.getCurrentScore);
  const lastRobotChar = useSelector(selectors.getLastRobotChar);
  const userWordInputRef = useRef();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { userWord: '' },
    validationSchema: UserWordSchema(usedWords, lastRobotChar),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      dispatch(setErrorText(''));
      const { userWord } = values;

      try {
        const { data } = await axios({
          method: 'post',
          url: 'http://192.168.70.134/',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            usedWords: JSON.stringify([userWord, ...usedWords]),
            userWord: userWord.toLowerCase().replaceAll('ё', 'е'),
          },
        });

        console.log(data);

        if (data.status === 'ok') {
          const { robotWord } = data;
          dispatch(addUsedWord(userWord));
          dispatch(addUsedWord(robotWord));
          dispatch(incrementScore());
          formik.resetForm();
        } else {
          formik.setFieldError('userWord', 'Произошла ошибка при получении данных с сервера...');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    userWordInputRef.current.select();
  }, [usedWords, formik.errors.userWord]);

  const handleFinishGame = () => {
    dispatch(resetGame());
    dispatch(resetScore());
  };

  if (formik.errors.userWord) {
    dispatch(setErrorText(formik.errors.userWord));
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          ref={userWordInputRef}
          className="word-input"
          name="userWord"
          type="text"
          placeholder="Введите слово..."
          disabled={formik.isSubmitting}
          value={formik.values.userWord}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        <button className="submit" type="submit" disabled={formik.isSubmitting}>
          <FontAwesomeIcon icon={faCheck} className="fas fa-check" />
          <i className="spinner" />
          <span>Отправить</span>
        </button>
      </form>
      <ScoreBlock score={currentScore} />
      <FinishGameButton formik={formik} handleClick={handleFinishGame} isShown={currentScore > 0} />
    </>
  );
};

export default GameControls;
