import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function AbujaClock() {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const [main, seconds] = [time.slice(0, 6), time.slice(6)];

  return (
    <span>
      Abuja, {main}
      <span key={seconds} className="inline-block animate-time-fade">
        {seconds}
      </span>
    </span>
  );
}
