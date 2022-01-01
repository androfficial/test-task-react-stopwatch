import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { buffer, debounceTime, filter, fromEvent, Observable } from 'rxjs';

import { timeFormatting } from '../../services/timeFormatting';

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const waitBtnRef = useRef(null);

  const onHandleStart = () => {
    setIsStarted((prev) => !prev);
    if (isStarted) {
      setSeconds(0);
    }
  };

  const onHandleReset = () => {
    setSeconds(0);
    setIsStarted(true);
  };

  useEffect(() => {
    const observable = new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }).subscribe(() => {
      if (isStarted) {
        setSeconds((val) => val + 1);
      }
    });

    return () => observable.unsubscribe();
  }, [isStarted]);

  useEffect(() => {
    const waitBtn$ = fromEvent(waitBtnRef.current, 'click');

    const subscribeWaitBtn$ = waitBtn$
      .pipe(
        buffer(waitBtn$.pipe(debounceTime(300))),
        filter((clicks) => clicks.length > 1)
      )
      .subscribe(() => {
        setIsStarted(false);
      });

    return () => subscribeWaitBtn$.unsubscribe();
  }, []);

  return (
    <main className='page'>
      <header className='page__header header'>
        <div className='header__container _container'>
          <div className='header__inner'>
            <p className='header__text'>StopWatch</p>
          </div>
        </div>
      </header>
      <div className='page__stopwatch stopwatch'>
        <div className='stopwatch__container _container'>
          <div className='stopwatch__wrapper'>
            <div className='stopwatch__top'>
              <div
                className={cn(
                  'stopwatch__box',
                  isStarted && '_rotation-animation'
                )}
              >
                <span className='stopwatch__time'>
                  {timeFormatting(seconds)}
                </span>
              </div>
            </div>
            <div className='stopwatch__bottom'>
              <button
                onClick={onHandleStart}
                className={cn('stopwatch__btn btn', {
                  'btn-start': !isStarted,
                  'btn-stop': isStarted,
                })}
                type='button'
              >
                {isStarted ? 'Stop' : 'Start'}
              </button>
              <button
                ref={waitBtnRef}
                className='stopwatch__btn btn-wait btn'
                type='button'
              >
                Wait
              </button>
              <button
                onClick={onHandleReset}
                className='stopwatch__btn btn-reset btn'
                type='button'
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default App;
