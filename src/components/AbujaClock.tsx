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

  return (
    <span>
      Abuja,{" "}
      {time.split("").map((char, index) => (
        <span key={`${index}-${char}`} className="inline-block animate-time-fade">
          {char}
        </span>
      ))}
    </span>
  );
}
