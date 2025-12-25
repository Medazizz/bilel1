import { useEffect, useRef, useState } from "react";
import "./App.css";
import prankVideo from "./assets/2.mp4";
import bilelVideo from "./assets/bilel1.mp4";
import bgMain from "./assets/p1.jpg";

export default function App() {
  const [stage, setStage] = useState("idle"); // idle -> countdown -> video -> final -> bilel
  const [secondsLeft, setSecondsLeft] = useState(5);
  const videoRef = useRef(null);

  // countdown -> prank video
  useEffect(() => {
    if (stage !== "countdown") return;

    setSecondsLeft(5);
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setStage("video");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [stage]);

  // prank video -> final text after 12s
  useEffect(() => {
    if (stage !== "video") return;

    const timeoutId = setTimeout(() => {
      setStage("final");
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [stage]);

  // play prank video with sound
  useEffect(() => {
    if (stage !== "video") return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [stage]);

  return (
    <div
      className={`app ${
        stage === "video" || stage === "final" || stage === "bilel"
          ? "app-video"
          : ""
      }`}
    >
      {/* IDLE SCREEN (no background image) */}
      {stage === "idle" && (
        <>
          <header className="app-header">
            <span className="logo">Bilel</span>
          </header>

          <main className="hero">
            <div className="hero-card">
              <div className="hero-card-bg-circle hero-card-bg-circle-1" />
              <div className="hero-card-bg-circle hero-card-bg-circle-2" />

              <h1 className="hero-title">رد بالك تنزل لهنا</h1>

              <button
                className="hero-button"
                onClick={() => setStage("countdown")}
              >
                إنزل وأبعثو ينيك
              </button>
            </div>
          </main>

          <footer className="hero-icons">
            <span>🎭</span>
            <span>🐔</span>
            <span>🎯</span>
            <span>🐞</span>
          </footer>
        </>
      )}

      {/* COUNTDOWN SCREEN WITH p1.jpg BACKGROUND */}
      {stage === "countdown" && (
        <div
          className="countdown-bg"
          style={{ backgroundImage: `url(${bgMain})` }}
        >
          <div className="countdown-overlay" />

          <header className="app-header">
            <span className="logo">Bilel</span>
          </header>

          <main className="hero">
            <h1 className="hero-title hero-title-strong">
      مش قتلك ما تمس شيء يا منيك
    </h1>
            <p className="hero-chrono">
              {secondsLeft} ثانية و يصيرلك شيء خطير...
            </p>
          </main>

          <footer className="hero-icons">
            <span>🎭</span>
            <span>🐔</span>
            <span>🎯</span>
            <span>🐞</span>
          </footer>
        </div>
      )}

      {/* FIRST VIDEO (2.mp4) */}
      {stage === "video" && (
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="prank-video"
            src={prankVideo}
            playsInline
            controls
            autoPlay
          />
        </div>
      )}

      {/* FINAL MESSAGE + BILEL BUTTON */}
      {stage === "final" && (
        <div className="final-screen">
          <p className="final-text">
            نرجعو للصحيح تو إنزل وبان عليك الأمان
          </p>
          <button
            className="final-button"
            onClick={() => setStage("bilel")}
          >
            Bilel
          </button>
        </div>
      )}

      {/* LAST PAGE VIDEO (bilel1.mp4) */}
      {stage === "bilel" && (
        <div className="video-wrapper">
          <video
            className="prank-video"
            src={bilelVideo}
            autoPlay
            controls
            playsInline
          />
        </div>
      )}
    </div>
  );
}
