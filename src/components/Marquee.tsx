import React from "react";

const Marquee: React.FC = () => {
  const items = ["✦ FULL STACK", "✦ DEVELOPER", "✦ SYED HASSAN", "✦ OPEN TO WORK", "✦ REACT", "✦ NODE.JS", "✦ TYPESCRIPT"];

  return (
    <div
      className="relative overflow-hidden py-3 my-0"
      style={{
        background: "rgba(108,99,255,0.06)",
        borderTop: "1px solid rgba(108,99,255,0.15)",
        borderBottom: "1px solid rgba(108,99,255,0.15)",
      }}
    >
      {/* Fading edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, rgb(10,10,15), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, rgb(10,10,15), transparent)" }}
      />

      {/* Marquee content */}
      <div className="animate-marquee flex whitespace-nowrap select-none">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex">
              {items.map((item, j) => (
                <span
                  key={j}
                  className="mx-6 text-sm font-bold tracking-widest"
                  style={{ color: j % 2 === 0 ? "rgba(108,99,255,0.9)" : "rgba(0,212,255,0.8)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
