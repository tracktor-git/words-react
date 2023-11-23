import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { decrementTime } from '../../redux/slices/timerSlice';

import selectors from '../../redux/selectors';

const formatTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
};

const Timer = () => {
  const dispatch = useDispatch();

  const secondsLeft = useSelector(selectors.getTime);
  const timerClassName = secondsLeft <= 10 ? 'timer danger' : 'timer';

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        dispatch(decrementTime());
        return;
      }
      clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, secondsLeft]);

  if (!secondsLeft) {
    return null;
  }

  return <span className={timerClassName}>{formatTime(secondsLeft)}</span>;
};

export default Timer;
