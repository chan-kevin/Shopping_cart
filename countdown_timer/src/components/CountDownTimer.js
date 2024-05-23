import React, { useState, useRef, useEffect } from "react";

const CountDownTimer = () => {
  const [minutes, setMiutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  let timer = useRef(null);

  useEffect(() => {
    if (!pause) {
      timer.current = setInterval(() => {
        setTimerSeconds((prevSec) => {
          if (prevSec <= 0) {
            setTimerMinutes((prevMin) => {
              if (prevMin <= 0) {
                clearInterval(timer.current);
                setTimerSeconds(0);
                setPause(true);
                alert("time's up!");
                return 0;
              }
              setTimerSeconds(59);
              return prevMin - 1;
            });
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [pause]);

  const handleMinutesInput = (e) => {
    const value = e.target.value;
    if (value.toString().startsWith("0") && value.length > 1) {
      alert("please enter a number not start with 0");
    } else if (value > 99) {
      alert("maximum minutes is 99");
    } else {
      setMiutes(value);
    }
  };

  const handleSecondsInput = (e) => {
    const value = e.target.value;
    if (value.toString().startsWith("0") && value.length > 1) {
      alert("please enter a number not start with 0");
    } else if (value > 60) {
      alert("maximum minutes is 60");
    } else {
      setSeconds(e.target.value);
    }
  };

  const handleStart = () => {
    if (minutes === "") {
      setTimerMinutes(0);
    } else {
      setTimerMinutes(minutes);
    }

    if (seconds === "") {
      setTimerSeconds(0);
    } else {
      setTimerSeconds(seconds);
    }

    if (minutes || seconds) {
      setPause(false);
    } else {
      alert("please enter a valid time");
    }
  };

  const handleReset = () => {
    setPause(true);
    setTimerMinutes(0);
    setTimerSeconds(0);
    setMiutes(0);
    setSeconds(0);
  };

  return (
    <div>
      <h1>Timer</h1>

      <div>
        <input type="number" value={minutes} onChange={handleMinutesInput} />
        <span>Minutes</span>
        <input type="number" value={seconds} onChange={handleSecondsInput} />
        <span>Seconds</span>
        <button onClick={handleStart}>START</button>
      </div>

      <div>
        <button onClick={() => setPause(!pause)}>PAUSE/RESUME</button>
        <button onClick={handleReset}>RESET</button>
      </div>

      <h2>
        {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:
        {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
      </h2>
    </div>
  );
};

export default CountDownTimer;
