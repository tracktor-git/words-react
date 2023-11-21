import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import selectors from '../../redux/selectors';

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

const GameForm = ({ formik }) => {
  const usedWords = useSelector(selectors.getUsedWords);
  const lastRobotChar = useSelector(selectors.getLastRobotChar);
  const inputRef = React.useRef(null);

  const inputSelect = () => {
    setTimeout(() => {
      inputRef?.current.select();
    }, 10);
  };

  React.useEffect(() => {
    inputSelect();
  }, [formik.errors.userWord, usedWords]);

  const placeholder = lastRobotChar
    ? `Введите слово на букву «${lastRobotChar}»...`
    : 'Введите слово...';

  return (
    <form onSubmit={formik.handleSubmit} className={formik.errors.userWord && 'invalid'}>
      <div className="form-wrapper">
        <input
          type="text"
          className="word-input"
          name="userWord"
          autoComplete="off"
          autoFocus
          ref={inputRef}
          placeholder={placeholder}
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
      <ErrorBlock text={formik.errors.userWord} />
    </form>
  );
};

export default GameForm;
