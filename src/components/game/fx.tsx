import { useEffect, useState } from "react";

/** Falling confetti. Right-answer celebration. */
export function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2.5 + Math.random() * 1.5,
      color: ["#D4A05C", "#D7425E", "#48A8E2", "#BA4FF5", "#59ABA9", "#fff", "#DD785E", "#ff6b6b"][i % 8],
      size: 12 + Math.random() * 14,
      rotate: Math.random() * 360,
    })),
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            top: "-30px",
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 3,
            animation: `confetti-fall ${p.duration}s ${p.delay}s linear forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
      <style>{`@keyframes confetti-fall { 0% { top: 0; opacity: 1; } 100% { top: 100vh; opacity: 0.5; } }`}</style>
    </div>
  );
}

/** Swinging wrecking ball. Wrong-answer smash. */
export function WreckingBall() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-start justify-center overflow-hidden" aria-hidden>
      <div className="relative" style={{ animation: "wreck-swing 1.6s ease-in-out forwards", transformOrigin: "top center" }}>
        <div className="mx-auto h-40 w-1.5 bg-line" />
        <div className="mx-auto size-20 rounded-full bg-orange-ink shadow-xl" style={{ animation: "wreck-impact 1.6s ease-in-out forwards" }} />
      </div>
      <div className="absolute inset-0" style={{ animation: "wreck-flash 1.6s ease-in-out forwards" }} />
      <style>{`
        @keyframes wreck-swing { 0% { transform: rotate(-50deg); } 35% { transform: rotate(25deg); } 60% { transform: rotate(-15deg); } 80% { transform: rotate(8deg); } 100% { transform: rotate(0deg); } }
        @keyframes wreck-impact { 0%, 25% { transform: scale(1); } 40% { transform: scale(1.5); } 55% { transform: scale(0.9); } 100% { transform: scale(1); } }
        @keyframes wreck-flash { 0%, 30% { background: transparent; } 42% { background: rgba(215, 66, 94, 0.55); } 100% { background: transparent; } }
      `}</style>
    </div>
  );
}
