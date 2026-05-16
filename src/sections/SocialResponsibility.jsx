import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  ["Alleviating Poverty", "Supporting resilient communities through practical access to essential resources, opportunity and long-term local partnerships.", "poverty"],
  ["Empowering Women", "Investing in pathways that expand representation, financial independence and leadership for women across global communities.", "women"],
  ["Supporting Education", "Backing education initiatives that develop capability, confidence and participation in tomorrow's energy economy.", "education"],
];

export default function SocialResponsibility() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".csr-card", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".csr-grid", start: "top 80%", end: "bottom 20%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="csr section" id="csr" ref={ref}>
      <RevealText text="OUR PLEDGE TO CORPORATE SOCIAL RESPONSIBILITY" className="csr-heading" />
      <div className="csr-grid">
        {cards.map(([title, copy, key]) => (
          <motion.article className="csr-card" whileHover={{ scale: 1.02 }} transition={{ duration: 0.35, ease: "easeOut" }} key={title}>
            <div className={`csr-art csr-art-${key}`} />
            <div className="csr-text">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
