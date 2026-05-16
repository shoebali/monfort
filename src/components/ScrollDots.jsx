import { useEffect, useState } from "react";
import gsap from "gsap";

const sections = ["hero", "who-we-are", "what-we-do", "global-connectivity"];

export default function ScrollDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = sections.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { threshold: 0.35 },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    gsap.to(".scroll-dot", { scale: 1, duration: 0.25, overwrite: true });
    gsap.to(`.scroll-dot:nth-child(${active + 1})`, { scale: 1.6, duration: 0.35, ease: "power2.out" });
  }, [active]);

  return (
    <div className="scroll-dots" aria-hidden="true">
      {sections.map((section, index) => (
        <a className={`scroll-dot ${active === index ? "active" : ""}`} href={`#${section}`} key={section} />
      ))}
    </div>
  );
}
