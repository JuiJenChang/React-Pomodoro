import { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from './SettingsContext';
import '../App.css';
import { IoSettingsSharp, IoRefreshCircleSharp } from "react-icons/io5";
import sound from '../assets/timeout-sound.mp3';

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);

  const [isPause, setIsPause] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isPauseref = useRef(isPause)
  const secondsLeftRef = useRef(secondsLeft)
  const modeRef = useRef(mode)

  const switchMode = () => {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakminutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;

    isPauseref.current = true;
    setIsPause(isPauseref.current);
  }

  const initTimer = () => {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const resetTimer = () => {
    isPauseref.current = true;
    setIsPause(isPauseref.current);
    const currentSeconds = modeRef.current === 'work' ? settingsInfo.workMinutes : settingsInfo.breakminutes;
    secondsLeftRef.current = currentSeconds * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  const changeTimer = (timerMode) => {
    if (timerMode === modeRef.current) {
      return
    }
    isPauseref.current = true;
    setIsPause(isPauseref.current);
    switchMode()
  }

  const playSound = () => {
    new Audio(sound).play()
  }

  useEffect(() => {
    initTimer();

    const countDownTimer = setInterval(() => {
      if (isPauseref.current) {
        return
      }
      if (secondsLeftRef.current === 0) {
        playSound()
        return switchMode()
      }
      tick()
    }, 1000);
    
    return () => clearInterval(countDownTimer)
  }, [settingsInfo]);
  
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div className="container" style={{backgroundColor: modeRef.current === 'work' ? '#426c9d' : '#518a58'}}>
      <div className="timer-box">
        <div className="mode-box">
          <button
            className="mode-button"
            style={{
              backgroundColor: modeRef.current === 'work' ? '#7f7f7f40' : '#fff',
              color: modeRef.current === 'work' ? '#fff' : '#518a58',
            }}
            onClick={() => changeTimer('work')}
          >
            Work
          </button>
          <button
            className="mode-button"
            style={{
              backgroundColor: modeRef.current === 'work' ? '#fff' : '#7f7f7f40',
              color: modeRef.current === 'work' ? '#426c9d' : '#fff',
            }}
            onClick={() => changeTimer('break')}
          >
            Break
          </button>
        </div>
        <div className="timer">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      <div className="control-area">
        {
          isPause
          ? <button
            className="play-button start"
            style={{color: modeRef.current === 'work' ? '#426c9d' : '#518a58'}}
            onClick={() => { setIsPause(false); isPauseref.current = false; }}
            >
              start
            </button>
          : <button
            className="play-button pause"
            style={{color: modeRef.current === 'work' ? '#426c9d' : '#518a58'}}
            onClick={() => { setIsPause(true); isPauseref.current = true; }}>
              pause
            </button>
        }
        <div className="set">
          <div className="icon-bg" onClick={() => {settingsInfo.setShowSettings(true)}}>
            <IoSettingsSharp className="icon" />
          </div>
          <div className="icon-bg" onClick={resetTimer}>
            <IoRefreshCircleSharp className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer;