import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

const framework = [
  {
    number: 1,
    title: "OUR ETHICS AND COMPLIANCE FRAMEWORK",
    items: [
      "An integrated sustainability framework guides governance, social responsibility and commercial conduct.",
      "Global operations are aligned with applicable international laws, sanctions rules and market regulations.",
      "Counterparties and vessels pass a disciplined onboarding process before engagement.",
      "Digital compliance systems support screening, ownership checks and recurring review.",
    ],
  },
  {
    number: 2,
    title: "DELIVERING SUSTAINABLE ENERGY SOLUTIONS",
    items: [
      "Sustainable and accessible energy is treated as a long-term business responsibility.",
      "Supply chains are assessed for environmental impact, resilience and operational reliability.",
      "Investment discipline is directed toward cleaner infrastructure and lower-impact practices.",
      "Shared value is pursued through the connection of people, resources and pragmatic innovation.",
    ],
  },
];

const esg = [
  ["Environmental", ["Clean energy", "Reduced resource usage", "Climate change", "Carbon reduction"]],
  ["Social", ["Diversified workforce", "Health and safety", "Human rights", "Community impact"]],
  ["Governance", ["Policy framework", "Code of ethics", "Risk management", "Compliance training"]],
];

export default function Sustainability() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sustain-copy, .esg-card", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: ".sustain-intro", start: "top 80%", end: "bottom 20%" } });
      gsap.utils.toArray(".framework-card").forEach((card) => {
        gsap.fromTo(card.querySelector(".diamond"), { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 80%", end: "bottom 20%" } });
        gsap.fromTo(card.querySelectorAll("p"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 80%", end: "bottom 20%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sustain section" id="sustainability" ref={ref}>
      <div className="sustain-bokeh" />
      <div className="sustain-intro">
        <RevealText text="DELIVERING SUSTAINABLE ENERGY SOLUTIONS" className="sustain-heading" />
        <p className="sustain-copy">
          We integrate sustainability with value creation, powering lives while respecting communities, partners and natural systems.
        </p>
      </div>
      <div className="framework-list">
        {framework.map((card) => (
          <article className="framework-card" key={card.title}>
            <div className="diamond"><span>{card.number}</span></div>
            <div className="framework-body">
              <h2>{card.title}</h2>
              {card.items.map((copy) => (
                <p key={copy}>{copy}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="esg-grid">
        {esg.map(([title, items]) => (
          <article className="esg-card" key={title}>
            <h3>{title}</h3>
            {items.map((item) => <span key={item}>{item}</span>)}
          </article>
        ))}
      </div>
    </section>
  );
}
