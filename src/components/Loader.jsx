import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MontfortLogo } from "./Logo";

export default function Loader({ onComplete }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });
      tl.fromTo(".loader-logo", { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" })
        .fromTo(".loader-char", { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.05, duration: 0.55, ease: "power3.out" }, 0.35)
        .to(ref.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 2.2);
    }, ref);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader" ref={ref}>
      <MontfortLogo className="loader-logo" />
      <div className="loader-word" aria-label="Montfort Group">
        {"MONTFORT GROUP".split("").map((char, index) => (
          <span className="loader-char-wrap" key={`${char}-${index}`}>
            <span className="loader-char">{char === " " ? "\u00a0" : char}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
