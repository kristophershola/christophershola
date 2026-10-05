import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const digitVariants = {
  initial: {
    y: 20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: -20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  },
};

export default function AbujaClock() {
  const [time, setTime] = useState(() => formatter.format(new Date()));
  const [prevDigits, setPrevDigits] = useState<string[]>([]);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const digits = time.split("");
  const lenDiff = digits.length - prevDigits.length;

  const nextTicks = digits.map((char, i) => {
    const prevI = i - lenDiff;
    const prevChar = prevI >= 0 ? prevDigits[prevI] : undefined;
    const prevTick = prevI >= 0 ? (ticks[prevI] ?? 0) : 0;
    return char !== prevChar ? prevTick + 1 : prevTick;
  });

  if (prevDigits.join("") !== digits.join("")) {
    setTicks(nextTicks);
    setPrevDigits(digits);
  }

  return (
    <span className="tabular-nums">
      Abuja,{" "}
      {digits.map((char, index) => (
        <span key={index} className="relative inline-block">
          <span className="invisible">{char}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={nextTicks[index]}
              variants={digitVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                mass: 0.6,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
