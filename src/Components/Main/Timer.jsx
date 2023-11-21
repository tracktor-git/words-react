import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(() => {
    const storedTime = localStorage.getItem('timer');
    if (storedTime) {
      const storedTimestamp = parseInt(localStorage.getItem('timestamp'), 10);
      const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
      const elapsedTime = currentTime - storedTimestamp;
      const remainingTime = parseInt(storedTime, 10) - elapsedTime;
      return remainingTime > 0 ? remainingTime : 0;
    }
    return 30; // Значение по умолчанию
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('timer', newTime.toString());
          localStorage.setItem('timestamp', Math.floor(Date.now() / 1000).toString()); // Сохраняем текущую отметку времени
          return newTime;
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const handleIncrementTime = () => {
    setTime((prevTime) => {
      const newTime = prevTime + 30;
      localStorage.setItem('timer', newTime.toString());
      return newTime;
    });
  };

  return (
    <div>
      <h1>{`Таймер: ${time} сек`}</h1>
      <button type="button" onClick={handleIncrementTime}>Выполнить действие</button>
    </div>
  );
};

export default Timer;
