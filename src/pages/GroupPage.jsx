import { Suspense, lazy } from "react";
import Hero from "../sections/Hero";

const WhoWeAre = lazy(() => import("../sections/WhoWeAre"));
const WhatWeDo = lazy(() => import("../sections/WhatWeDo"));
const GlobalConnectivity = lazy(() => import("../sections/GlobalConnectivity"));
const Sustainability = lazy(() => import("../sections/Sustainability"));
const Equality = lazy(() => import("../sections/Equality"));
const SocialResponsibility = lazy(() => import("../sections/SocialResponsibility"));
const Footer = lazy(() => import("../sections/Footer"));

export default function GroupPage({ loaded, onNavigate }) {
  return (
    <>
      <Hero loaded={loaded} />
      <Suspense fallback={<div className="section section-loading">LOADING</div>}>
        <WhoWeAre />
        <WhatWeDo />
        <GlobalConnectivity />
        <Sustainability />
        <Equality />
        <SocialResponsibility />
        <Footer onNavigate={onNavigate} />
      </Suspense>
    </>
  );
}
