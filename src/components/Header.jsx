import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import FullscreenMenu from "./FullscreenMenu";
import { navLinks } from "../data/navigation";

export default function Header({ currentPath, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return undefined;

    const move = (target) => {
      if (!target) return;
      const navBox = nav.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      gsap.to(indicator, {
        x: box.left - navBox.left,
        width: box.width,
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const active = nav.querySelector(`[data-path="${currentPath}"]`) || nav.querySelector("a");
    move(active);
    const anchors = Array.from(nav.querySelectorAll("a"));
    const handlers = anchors.map((anchor) => {
      const handler = () => move(anchor);
      anchor.addEventListener("mouseenter", handler);
      return [anchor, handler];
    });
    const leave = () => move(active);
    nav.addEventListener("mouseleave", leave);
    return () => {
      handlers.forEach(([anchor, handler]) => anchor.removeEventListener("mouseenter", handler));
      nav.removeEventListener("mouseleave", leave);
    };
  }, [currentPath]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-link" href="/" onClick={(event) => onNavigate(event, "/")} aria-label="Montfort Group home">
          MONTFORT GROUP
        </a>
        <nav className="center-nav" ref={navRef} aria-label="Primary navigation">
          <span className="nav-indicator" ref={indicatorRef} />
          {navLinks.map((link) => (
            <a className={currentPath === link.path ? "is-active" : ""} data-path={link.path} href={link.path} key={link.path} onClick={(event) => onNavigate(event, link.path)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="news-link" href="#news">
            <span>NEWS</span>
            <i>18</i>
          </a>
          <button className={`menu-toggle ${open ? "is-open" : ""}`} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
            <span>{open ? "CLOSE" : "MENU"}</span>
            <i><b /><b /><b /><b /></i>
          </button>
        </div>
      </header>
      <FullscreenMenu open={open} currentPath={currentPath} onClose={() => setOpen(false)} onNavigate={onNavigate} />
    </>
  );
}
