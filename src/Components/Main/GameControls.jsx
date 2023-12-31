import 'polyfills';

import * as Yup from 'yup';
import Axios from 'axios';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addUsedWords, resetUsedWords } from 'redux/slices/usedWordsSlice';
import { incrementScore, resetScore } from 'redux/slices/scoreSlice';
import { addTime, resetTime } from 'redux/slices/timerSlice';
import selectors from 'redux/selectors';

import routes from 'routes';
import RobotAnswerBlock from './RobotAnswerBlock';
import UserWordBlock from './UserWordBlock';
import GameResultBlock from './GameResultBlock';
import ScoreBlock from './ScoreBlock';
import FinishGameButton from './FinishGameButton';
import GameForm from './GameForm';
import UsedWordsBlock from './UsedWordsBlock';

const UserWordSchema = (userWord, usedWords, firstLetter) => {
  const firstLetterRegexp = new RegExp(`^(${firstLetter})`, 'i');
  const alowedSymbolsRegExp = /^[а-яёА-ЯЁ-]+$/;

  return Yup.object().shape({
    userWord: Yup
      .string()
      .trim()
      .required('Не было введено слово!')
      .min(2, 'Слово должно состоять минимум из двух букв!')
      .max(25, 'Слишком длинное слово! Максимальная допустимая длина - 25 букв!')
      .matches(alowedSymbolsRegExp, 'Допускаются только буквы русского алфавита и дефис.', { excludeEmptyString: true })
      .test('firstLetter', `Слово должно начинаться с буквы «${firstLetter}»!`, (value) => value.match(firstLetterRegexp))
      .test('uniqueWord', `Слово «${userWord}» повторяется! Назовите другое слово на букву «${firstLetter}».`, (value) => !usedWords.includes(value)),
  });
};

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
      return `Слово «${word}» отсутствует в словаре. Назовите другое слово.`;
    default:
      return 'Произошла неизвестная ошибка';
  }
};

const handleSubmitError = (error, setFieldError) => {
  if (error instanceof Yup.ValidationError) {
    setFieldError('userWord', error.message);
    return;
  }

  if (error instanceof Axios.AxiosError) {
    setFieldError('userWord', 'Ошибка сети');
    return;
  }
  console.log(error);
};

const setAxiosOptions = (userWord, usedWords) => ({
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

const MessagesBlock = ({ children, isShown }) => {
  if (!isShown) {
    return null;
  }

  return (
    <div className="messages">{children}</div>
  );
};

const GameControls = () => {
  const dispatch = useDispatch();

  const usedWords = useSelector(selectors.getUsedWords);
  const currentUserWord = usedWords.length > 1 ? usedWords.at(1) : null;
  const currentScore = useSelector(selectors.getCurrentScore);
  const lastRobotChar = useSelector(selectors.getLastRobotChar);
  const lastRobotWord = useSelector(selectors.getLastRobotWord);
  const timeLeft = useSelector(selectors.getTime);

  const formik = useFormik({
    initialValues: { userWord: '' },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const userWord = values.userWord.trim().toLowerCase().replaceAll('ё', 'е');
      const validationSchema = UserWordSchema(userWord, usedWords, lastRobotChar);

      try {
        await validationSchema.validate({ userWord });
        const { data } = await Axios(setAxiosOptions(userWord, usedWords));

        switch (data.status) {
          case 'ok':
            dispatch(addUsedWords([data.message, userWord]));
            dispatch(incrementScore());
            dispatch(addTime());
            formik.resetForm();
            break;
          case 'error':
            formik.setFieldError('userWord', handleBackendErrors(data.message, userWord));
            break;
          default:
            throw new Error(`Unexpected answer status: ${data.status}`);
        }
      } catch (error) {
        handleSubmitError(error, formik.setFieldError);
      }
    },
  });

  const handleFinishGame = () => {
    dispatch(resetUsedWords());
    dispatch(resetScore());
    dispatch(resetTime());
    formik.resetForm();
  };

  const isGameStarted = currentScore > 0 && usedWords.length > 0;
  const isUserLoose = timeLeft < 1;
  const isRobotLoose = lastRobotChar === null && lastRobotWord === null;

  return (
    <>
      <GameResultBlock isShown={isRobotLoose || isUserLoose} robotWin={timeLeft < 1} />
      <GameForm formik={formik} isShown={!isUserLoose && !isRobotLoose} />
      <MessagesBlock isShown={isGameStarted}>
        <UserWordBlock word={currentUserWord} />
        <RobotAnswerBlock
          isRobotLoose={isRobotLoose}
          startLetter={lastRobotChar}
          word={lastRobotWord}
        />
      </MessagesBlock>
      <ScoreBlock score={currentScore} />
      <FinishGameButton
        isShown={isGameStarted}
        isDisabled={formik.isSubmitting}
        handleClick={handleFinishGame}
      />
      <UsedWordsBlock words={usedWords} />
    </>
  );
};

export default GameControls;
