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

const spring = { type: "spring" as const, stiffness: 500, damping: 25, mass: 0.6 };

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
    <span className="inline-flex items-center tabular-nums">
      <span className="relative mr-2 flex h-2 w-2 items-center justify-center">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: "linear-gradient(135deg, #0000ff, #008e71, #00ff00)" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full shadow-[0_0_8px_#00e31c]"
          style={{ background: "linear-gradient(135deg, #0000ff 0%, #00718e 50%, #00ff00 100%)" }}
        />
      </span>
      <span>Abuja,&nbsp;</span>
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
              transition={spring}
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
