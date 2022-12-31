import { useEffect, useState } from "react";

const useTimer = (duration) => {
  //   console.log(duration);
  //   const now = new Date();


  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const deadline = duration + Date.now();

  const getTime = () => {
    const time = deadline - Date.now();
    setTotalTime(time);

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, []);

  return [minutes, seconds,  totalTime/1000];
};

export { useTimer };
