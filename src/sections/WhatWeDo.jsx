import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  ["Montfort Trading", "OPERATING EFFICIENTLY BY LEADING WITH INNOVATION", "trading"],
  ["Montfort Capital", "IDENTIFYING OPPORTUNITIES THAT MAXIMISE VALUE", "capital"],
  ["Montfort Maritime", "POWERING PROGRESS AND DELIVERING ENERGY", "maritime"],
  ["Fort Energy", "ADVANCING INNOVATION IN ENERGY INVESTMENTS", "energy"],
];

export default function WhatWeDo() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".division").forEach((section) => {
        gsap.to(section.querySelector(".division-bg"), { yPercent: 18, scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1, markers: false } });
        gsap.fromTo(section.querySelector(".division-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%" } });
        gsap.fromTo(section.querySelectorAll(".division-label, .division-cta, .division-index"), { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="what section" id="what-we-do" ref={ref}>
      {divisions.map(([name, tagline, key], index) => (
        <article className={`division division-${key}`} id={name.toLowerCase().replaceAll(" ", "-")} key={name}>
          <div className="division-bg" />
          <span className="division-index">{index + 1}</span>
          <div className="division-art" />
          <div className="division-content">
            <p className="division-label">{name}</p>
            <RevealText as="h3" text={tagline} className="division-title" />
            <span className="division-rule" />
            <a className="division-cta" href={`#${name.toLowerCase().replaceAll(" ", "-")}`}>
              <span>{name.toUpperCase()}</span>
              <i>→</i>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
