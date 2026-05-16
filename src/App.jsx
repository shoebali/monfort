import { useCallback, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./hooks/useLenis";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Header from "./components/Header";
import ScrollDots from "./components/ScrollDots";
import BackToTop from "./components/BackToTop";
import GroupPage from "./pages/GroupPage";
import DivisionPage from "./pages/DivisionPage";
import { divisionPages } from "./data/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenis = useLenis();
  const [loaded, setLoaded] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  const normalizedPath = useMemo(() => {
    if (path === "/index.html") return "/";
    return divisionPages[path] ? path : "/";
  }, [path]);

  const navigate = useCallback((event, nextPath) => {
    if (event) event.preventDefault();
    if (nextPath === window.location.pathname) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    (window.__lenis || lenis)?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lenis]);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 200);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, [normalizedPath]);

  return (
    <>
      <Cursor />
      <Loader onComplete={handleLoaded} />
      <Header currentPath={normalizedPath} onNavigate={navigate} />
      {normalizedPath === "/" && <ScrollDots />}
      <BackToTop lenis={lenis} />
      <main id="smooth-content">
        {normalizedPath === "/" ? (
          <GroupPage loaded={loaded} onNavigate={navigate} />
        ) : (
          <DivisionPage page={normalizedPath} onNavigate={navigate} />
        )}
      </main>
    </>
  );
}
