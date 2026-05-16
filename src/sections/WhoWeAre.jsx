import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".who-label, .who-copy, .circle-arrow", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12, scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 20%", markers: false } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who section" id="who-we-are" ref={ref}>
      <div className="who-mountains" />
      <div className="who-block who-block-a">
        <p className="section-label who-label">Who we are</p>
        <RevealText text="Montfort is a global commodity trading and asset investment company." className="who-heading" />
        <p className="who-copy">
          We trade, refine, store and move energy products across connected markets, while investing in assets and services that create enduring value.
        </p>
      </div>
      <div className="who-block who-block-b">
        <RevealText text="We provide energy solutions with integrity and efficiency through our different business divisions." className="who-heading" />
        <p className="who-copy">
          Our divisions work as one system, combining trading intelligence, capital discipline, maritime capability and energy infrastructure experience.
        </p>
        <a className="circle-arrow" href="#what-we-do" aria-label="Scroll to business divisions">
          ↓
        </a>
      </div>
    </section>
  );
}
