import { Suspense, lazy } from "react";
import { RevealText } from "../hooks/useTextReveal";

const Globe = lazy(() => import("../three/Globe"));

export default function GlobalConnectivity() {
  return (
    <section className="global section" id="global-connectivity">
      <div className="global-text">
        <RevealText text="Established in the world's major trade hubs and financial markets with over 15 global offices, we connect and serve both emerging and mature markets worldwide." className="global-heading" />
      </div>
      <div className="globe-wrap">
        <Suspense fallback={<div className="globe-fallback">GLOBAL NETWORK</div>}>
          <Globe />
        </Suspense>
      </div>
    </section>
  );
}
