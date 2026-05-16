import { useEffect, useState } from "react";

export default function BackToTop({ lenis }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => (lenis || window.__lenis)?.scrollTo(0, { duration: 2 })}
    >
      ↑
    </button>
  );
}
