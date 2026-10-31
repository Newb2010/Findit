import { useEffect, useState } from "react";
import "./LoadingIntro.css";

function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let exitTimer;

    const duration = 2200;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + increment, 100);

        if (next >= 100) {
          clearInterval(timer);

          setIsExiting(true);

          exitTimer = setTimeout(() => {
            onComplete();
          }, 550);
        }

        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-intro ${isExiting ? "loading-exit" : ""}`}>
      <div className="loading-content">
        <div className="loading-brand">
          <h1 className="loading-logo">
            findit<span>.</span>
          </h1>

          <p className="loading-caption">
            FINDING WHAT MATTERS
          </p>
        </div>

        <div className="loading-progress">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-footer">
          <span>
            {progress < 100
              ? "INITIALIZING EXPERIENCE"
              : "READY TO EXPLORE"}
          </span>

          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

      <span className="loading-corner loading-corner-left">
        FINDIT / 2026
      </span>

      <span className="loading-corner loading-corner-right">
        LOST & FOUND PLATFORM
      </span>
    </div>
  );
}

export default LoadingIntro;