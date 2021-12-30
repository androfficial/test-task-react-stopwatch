const App = () => (
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
            <div className='stopwatch__box'>
              <span className='stopwatch__time'>00:00:00</span>
            </div>
          </div>
          <div className='stopwatch__bottom'>
            <button className='stopwatch__btn btn-start btn' type='button'>
              Start
            </button>
            {/* <button className='stopwatch__btn btn-stop btn' type='button'>
              Stop
            </button> */}
            <button className='stopwatch__btn btn-wait btn' type='button'>
              Wait
            </button>
            <button className='stopwatch__btn btn-reset btn' type='button'>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);
export default App;