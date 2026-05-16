import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { navLinks } from "../data/navigation";

const bottom = ["Contact", "ESG", "Privacy Policy", "Terms of Use"];

export default function FullscreenMenu({ open, currentPath, onClose, onNavigate }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (open) {
        gsap.to(ref.current, { xPercent: 0, duration: 0.7, ease: "power4.inOut", pointerEvents: "auto" });
        gsap.fromTo(".menu-link", { x: 80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.2 });
        gsap.fromTo(".menu-bottom a", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.5, ease: "power2.out", delay: 0.45 });
      } else {
        gsap.to(ref.current, { xPercent: 100, duration: 0.6, ease: "power4.inOut", pointerEvents: "none" });
      }
    }, ref);
    return () => ctx.revert();
  }, [open]);

  const handleNavigate = (event, path) => {
    onClose();
    onNavigate(event, path);
  };

  return (
    <aside className="fullscreen-menu" ref={ref} aria-hidden={!open}>
      <button className="menu-close" type="button" onClick={onClose} aria-label="Close menu">
        <span>MENU / CLOSE</span>
        <i />
      </button>
      <nav className="menu-nav" aria-label="Main menu">
        {navLinks.map((link) => (
          <a className={`menu-link ${currentPath === link.path ? "is-active" : ""}`} href={link.path} key={link.path} onClick={(event) => handleNavigate(event, link.path)}>
            <svg viewBox="0 0 32 10" aria-hidden="true">
              <path d="M0 5h28M23 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="menu-link__mask">
              <span>{link.label}</span>
              <span>{link.label}</span>
            </span>
          </a>
        ))}
      </nav>
      <div className="menu-bottom">
        {bottom.map((item) => (
          <a href={`/#${item.toLowerCase().replaceAll(" ", "-")}`} key={item} onClick={onClose}>
            {item}
          </a>
        ))}
      </div>
    </aside>
  );
}
