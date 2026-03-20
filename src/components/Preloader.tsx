import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SMOOTH_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "finishing" | "exit">("loading");
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion.current) {
      setProgress(100);
      setPhase("finishing");
      setTimeout(() => {
        setPhase("exit");
        setTimeout(onComplete, 300);
      }, 200);
      return;
    }
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    // Simulate progress with easing - starts fast, slows near end
    const startTime = Date.now();
    const duration = 600;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);

      setProgress(value);

      if (value < 100) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // Handle completion phases
  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const t1 = setTimeout(() => setPhase("finishing"), 100);
      return () => clearTimeout(t1);
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === "finishing") {
      const t2 = setTimeout(() => setPhase("exit"), 150);
      return () => clearTimeout(t2);
    }
    if (phase === "exit") {
      const t3 = setTimeout(onComplete, 200);
      return () => clearTimeout(t3);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #ffffff 0%, #f7f7f8 60%, #eeeff1 100%)",
        }}
        initial={{ opacity: 1 }}
        animate={
          phase === "exit"
            ? { opacity: 0, filter: "blur(8px)" }
            : phase === "finishing"
            ? { opacity: 1, filter: "blur(0px)" }
            : { opacity: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: phase === "exit" ? 0.5 : 0.3,
          ease: SMOOTH_EASE,
        }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(228, 7, 20, 0.04) 0%, transparent 60%)",
          }}
        />

        {/* Central content */}
        <div className="relative flex flex-col items-center">
          {/* Logo with premium entrance */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
            animate={
              phase === "finishing"
                ? { opacity: 1, scale: 1.02, filter: "blur(0px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: 1,
              ease: PREMIUM_EASE,
              delay: 0.1,
            }}
          >
            {/* Red glow behind logo */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(228, 7, 20, 0.12) 0%, transparent 70%)",
                width: "200%",
                height: "200%",
                left: "-50%",
                top: "-50%",
              }}
              animate={
                phase === "loading"
                  ? {
                      opacity: [0.5, 1, 0.5],
                      scale: [0.95, 1.05, 0.95],
                    }
                  : { opacity: 0 }
              }
              transition={
                phase === "loading"
                  ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4 }
              }
            />

            {/* Logo breathing animation */}
            <motion.div
              animate={
                phase === "loading"
                  ? { scale: [1, 1.015, 1] }
                  : phase === "finishing"
                  ? { scale: 1.02 }
                  : { scale: 1 }
              }
              transition={
                phase === "loading"
                  ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4 }
              }
            >
              <Logo className="h-28 sm:h-36 md:h-40" />
            </motion.div>
          </motion.div>

          {/* Red accent line */}
          <motion.div
            className="mt-5 rounded-full"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #E40714, transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              phase === "finishing"
                ? { width: 120, opacity: 0 }
                : { width: 120, opacity: 1 }
            }
            transition={{
              duration: 0.8,
              ease: PREMIUM_EASE,
              delay: 0.5,
            }}
          />

          {/* Baseline text */}
          <motion.p
            className="mt-4 text-center uppercase select-none"
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#6B6B6B",
              fontWeight: 300,
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={
              phase === "finishing"
                ? { opacity: 0, y: -4 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.6,
              ease: PREMIUM_EASE,
              delay: phase === "finishing" ? 0 : 0.8,
            }}
          >
            {t("preloader.tagline")}
          </motion.p>

          {/* Progress bar container */}
          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "finishing"
                ? { opacity: 0, y: -6 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.6,
              ease: PREMIUM_EASE,
              delay: phase === "finishing" ? 0.05 : 1,
            }}
          >
            {/* Progress bar track */}
            <div
              className="relative overflow-hidden rounded-full"
              style={{
                width: "220px",
                height: "3px",
                background: "rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Progress bar fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #E40714 0%, #ff2a35 100%)",
                  boxShadow: "0 0 12px rgba(228, 7, 20, 0.4)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.15,
                  ease: "linear",
                }}
              />

              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-y-0 rounded-full"
                style={{
                  width: "40%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
                animate={{ left: ["-40%", "140%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.2,
                }}
              />
            </div>

            {/* Percentage */}
            <motion.span
              className="mt-4 tabular-nums select-none"
              style={{
                fontSize: "13px",
                letterSpacing: "0.15em",
                color: "#999",
                fontWeight: 400,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              {progress}%
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
