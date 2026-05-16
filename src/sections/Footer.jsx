import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MontfortLogo } from "../components/Logo";
import { navLinks } from "../data/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onNavigate }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.children, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 90%", markers: false } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-brand">
        <MontfortLogo />
        <p>© 2021 | Montfort - All rights reserved</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a href={link.path} key={link.path} onClick={(event) => onNavigate?.(event, link.path)}>{link.label}</a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href="/#contact">Contact</a>
        <a className="linkedin" href="#linkedin" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.2 8.7H2.1V22h3.1V8.7ZM3.6 2A1.8 1.8 0 1 0 3.6 5.6 1.8 1.8 0 0 0 3.6 2Zm7.1 6.7h-3V22h3v-6.8c0-3.8 4.9-4.1 4.9 0V22h3.1v-8.2c0-6.4-6.8-6.1-8-3V8.7Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
