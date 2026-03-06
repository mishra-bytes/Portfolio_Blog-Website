const spores = [
  { left: "8%", top: "22%", size: 8, duration: "14s", delay: "0s" },
  { left: "18%", top: "66%", size: 10, duration: "18s", delay: "1.6s" },
  { left: "28%", top: "34%", size: 6, duration: "16s", delay: "4.2s" },
  { left: "42%", top: "72%", size: 9, duration: "19s", delay: "2.4s" },
  { left: "58%", top: "28%", size: 7, duration: "17s", delay: "5.3s" },
  { left: "72%", top: "62%", size: 11, duration: "20s", delay: "0.9s" },
  { left: "84%", top: "24%", size: 7, duration: "15s", delay: "3.7s" },
];

export function HeroSpores() {
  return (
    <div
      aria-hidden="true"
      className="hero-spores pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {spores.map((spore, index) => (
        <span
          key={`${spore.left}-${spore.top}-${index}`}
          className="hero-spore"
          style={{
            left: spore.left,
            top: spore.top,
            width: `${spore.size}px`,
            height: `${spore.size}px`,
            animationDuration: spore.duration,
            animationDelay: spore.delay,
          }}
        />
      ))}
    </div>
  );
}
