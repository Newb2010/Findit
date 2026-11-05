
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./LoadingIntro.css";

function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + increment, 100);

        if (next >= 100) {
          clearInterval(timer);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    setIsExiting(true);

    const completionTimer = setTimeout(() => {
      onComplete?.();
    }, 750);

    return () => clearTimeout(completionTimer);
  }, [progress, onComplete]);

  return (
    <div className={`loading-intro ${isExiting ? "is-exiting" : ""}`}>
      <div className="loading-grain" />

      <div className="loading-top">
        <span>F / 001</span>
        <span>LOST & FOUND PLATFORM</span>
      </div>

      <div className="loading-content">
        <div className="loading-mark">
          <span>F</span>
          <i />
        </div>

        <p className="loading-kicker">
          A PLACE FOR EVERY LOST THING
        </p>

        <h1 className="loading-logo">
          findit<span>.</span>
        </h1>

        <div className="loading-description">
          <p>Good things find their way back.</p>
          <ArrowUpRight size={19} />
        </div>

        <div className="loading-progress">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-footer">
          <span>PREPARING YOUR EXPERIENCE</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

      <div className="loading-bottom">
        <span>FINDIT — EST. 2026</span>
        <span>MADE TO RECONNECT</span>
      </div>
    </div>
  );
}

export default LoadingIntro;
