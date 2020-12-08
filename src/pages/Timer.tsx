import React, { useState, useEffect } from 'react';

const zeroPad = (num: any) => String(num).padStart(2, '0');

const Timer = () => {
  const [state, setState] = useState({minutes: 1, seconds: 10});
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        const { seconds, minutes } = state;

        if (seconds > 0) {
          setState(state => ({...state,
            seconds: state.seconds - 1
            }));
        }

        if (seconds === 0) {
          if (minutes === 0) {
          } else {
            setState(state => ({
                  minutes: state.minutes - 1,
                  seconds: 59
              }))
          }
        } 

      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, state]);

  const { minutes, seconds } = state;

  return (
    <div className="time">
      {`${zeroPad(minutes)}:${zeroPad(seconds)}`}
    </div>
  );
};

export default Timer;