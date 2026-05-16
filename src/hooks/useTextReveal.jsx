import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RevealText({ as: Tag = "h2", text, className = "", delay = 0, once = true }) {
  const ref = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll(".word-inner"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.06,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
            markers: false,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, once, text]);

  return (
    <Tag className={`reveal-text ${className}`} ref={ref}>
      {words.map((word, index) => (
        <span className="word-clip" key={`${word}-${index}`}>
          <span className="word-inner">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
