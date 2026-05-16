import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Equality() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".equality-copy, .metric", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 20%" } });
      gsap.utils.toArray(".metric-number").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value)}${suffix}`;
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="equality section" id="equality" ref={ref}>
      <div>
        <RevealText text="OUR COMMITMENT TO EQUALITY" className="equality-heading" />
      </div>
      <div className="equality-right">
        <p className="equality-copy">
          We build teams where people can contribute fully across cultures, disciplines and markets. Representation is treated as a measurable commitment, not a decorative statement.
        </p>
        <div className="metrics">
          <div className="metric">
            <strong className="metric-number" data-value="36" data-suffix="%">0%</strong>
            <span>Global team represented by women</span>
          </div>
          <div className="metric">
            <strong className="metric-number" data-value="27" data-suffix="+">0+</strong>
            <span>Nationalities across five continents</span>
          </div>
          <div className="metric">
            <strong className="metric-number" data-value="22" data-suffix="%">0%</strong>
            <span>Management roles held by women</span>
          </div>
        </div>
      </div>
    </section>
  );
}
