import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroWords = ["Montfort", "Trading", "Capital", "Maritime", "Fort Energy"];

export default function Hero({ loaded }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", { yPercent: 20, scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".mountain", { yPercent: 28, scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".mist", { yPercent: 16, scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!loaded) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title-line span", { yPercent: 112, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" });
      gsap.fromTo(".hero-micro, .hero-scroll, .hero-discover", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12, delay: 0.65 });
    }, ref);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section className="hero section" id="hero" ref={ref}>
      <div className="hero-bg" />
      <div className="mountains">
        <i className="mountain mountain-a" />
        <i className="mountain mountain-b" />
        <i className="mountain mountain-c" />
      </div>
      <div className="mist mist-a" />
      <div className="mist mist-b" />
      <div className="mist mist-c" />
      <div className="hero-center hero-center--site">
        <p className="hero-micro">MONTFORT GROUP</p>
        <h1 className="hero-title" aria-label="Montfort Trading Capital Maritime Fort Energy">
          {heroWords.map((word) => (
            <span className="hero-title-line" key={word}>
              <span>{word}</span>
            </span>
          ))}
        </h1>
      </div>
      <div className="hero-scroll">
        <span>↓</span>
        <b>SWIPE DOWN</b>
      </div>
      <p className="hero-discover">Scroll down to discover</p>
      <span className="hero-side-line" />
    </section>
  );
}
