import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../sections/Footer";
import { divisionPages } from "../data/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function DivisionPage({ page, onNavigate }) {
  const data = divisionPages[page] || divisionPages["/montfort-trading"];
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".division-page-kicker, .division-page-title span, .division-page-intro, .division-page-cta", { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.fromTo(".division-page-line", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out", delay: 0.45 });
      gsap.fromTo(".division-detail-card", { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.85, ease: "power2.out", scrollTrigger: { trigger: ".division-detail-grid", start: "top 80%", end: "bottom 20%" } });
      gsap.to(".division-page-bg", { yPercent: 18, scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, ref);
    return () => ctx.revert();
  }, [data.name]);

  return (
    <>
      <div className={`division-page division-page-${data.theme}`} ref={ref}>
        <section className="division-page-hero section">
          <div className="division-page-bg" />
          <div className="division-page-art" />
          <div className="division-page-copy">
            <p className="division-page-kicker">Montfort Group / {data.eyebrow}</p>
            <h1 className="division-page-title">
              {data.name.split(" ").map((word) => <span key={word}>{word}</span>)}
            </h1>
            <span className="division-page-line" />
            <p className="division-page-intro">{data.intro}</p>
            <a className="division-page-cta" href="/" onClick={(event) => onNavigate(event, "/")}>Back to Montfort Group</a>
          </div>
        </section>
        <section className="division-detail section">
          <div className="division-detail-heading">
            <p>{data.eyebrow}</p>
            <h2>{data.title}</h2>
          </div>
          <div className="division-detail-grid">
            {data.pillars.map((pillar, index) => (
              <article className="division-detail-card" key={pillar}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar}</h3>
                <p>Focused capability delivered with discretion, operational discipline and long-term market perspective.</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer onNavigate={onNavigate} />
    </>
  );
}
