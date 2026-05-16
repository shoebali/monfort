export function MontfortLogo({ className = "" }) {
  const rows = [
    { count: 5, y: 92, r: [5, 4, 6, 4, 5] },
    { count: 4, y: 78, r: [4, 5, 5, 4] },
    { count: 4, y: 64, r: [3, 5, 5, 3] },
    { count: 3, y: 50, r: [4, 6, 4] },
    { count: 3, y: 36, r: [3, 5, 3] },
    { count: 2, y: 23, r: [4, 4] },
    { count: 1, y: 12, r: [5] },
    { count: 1, y: 2, r: [2] },
  ];

  const circles = rows.flatMap((row) => {
    const spacing = 16;
    const start = 50 - ((row.count - 1) * spacing) / 2;
    return Array.from({ length: row.count }, (_, i) => ({
      cx: start + i * spacing,
      cy: row.y,
      r: row.r[i],
    }));
  });

  return (
    <svg className={`montfort-logo ${className}`} viewBox="0 0 100 104" aria-hidden="true">
      {circles.map((circle, index) => (
        <circle
          className="logo-circle"
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill="currentColor"
          key={`${circle.cx}-${circle.cy}-${index}`}
        />
      ))}
    </svg>
  );
}
