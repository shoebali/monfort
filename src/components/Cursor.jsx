import { useEffect, useRef } from "react";
import gsap from "gsap";

const lerp = (start, end, amount) => start + (end - start) * amount;

export default function Cursor() {
  const rootRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const root = rootRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const setRootX = gsap.quickSetter(root, "x", "px");
    const setRootY = gsap.quickSetter(root, "y", "px");
    const setInnerX = gsap.quickSetter(inner, "x", "px");
    const setInnerY = gsap.quickSetter(inner, "y", "px");
    const setRotate = gsap.quickSetter(root, "rotation", "deg");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let down = false;
    let hover = false;
    let frame;

    const move = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const enter = (event) => {
      if (event.target.closest("a, button, [role='button']")) {
        hover = true;
        gsap.to(outer, {
          scale: down ? 0.8 : 2.2,
          backgroundColor: "rgba(45,98,140,0.15)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(inner, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const leave = (event) => {
      if (event.target.closest("a, button, [role='button']")) {
        hover = false;
        gsap.to(outer, {
          scale: down ? 0.8 : 1,
          backgroundColor: "rgba(45,98,140,0)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(inner, { autoAlpha: 1, duration: 0.2 });
      }
    };

    const press = () => {
      down = true;
      gsap.to(outer, { scale: 0.8, duration: 0.18, ease: "power2.out" });
    };

    const release = () => {
      down = false;
      gsap.to(outer, { scale: hover ? 2.2 : 1, duration: 0.24, ease: "power2.out" });
    };

    const tick = () => {
      const oldX = ring.x;
      const oldY = ring.y;
      ring.x = lerp(ring.x, mouse.x, 0.12);
      ring.y = lerp(ring.y, mouse.y, 0.12);
      setRootX(ring.x);
      setRootY(ring.y);
      setInnerX(mouse.x - ring.x);
      setInnerY(mouse.y - ring.y);
      const angle = Math.atan2(ring.y - oldY, ring.x - oldX) * (180 / Math.PI);
      if (Number.isFinite(angle)) setRotate(angle);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mouseout", leave);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, []);

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor__ring" ref={outerRef} />
      <div className="cursor__inner" ref={innerRef}>
        <span />
        <i />
        <span />
      </div>
    </div>
  );
}
