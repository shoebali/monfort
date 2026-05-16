import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createGlobeTexture } from "./GlobeTexture";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  ["United Arab Emirates", 25.2, 55.3],
  ["Singapore", 1.3, 103.8],
  ["Geneva", 46.2, 6.1],
  ["Luxembourg", 49.6, 6.1],
  ["Switzerland", 47.4, 8.5],
  ["Istanbul", 41.0, 28.9],
  ["Nairobi", -1.3, 36.8],
  ["Dar es Salaam", -6.8, 39.2],
  ["Mumbai", 19.1, 72.9],
  ["Karachi", 24.9, 67.0],
  ["Maputo", -25.9, 32.6],
  ["Xiamen", 24.5, 118.1],
  ["Cape Town", -33.9, 18.4],
  ["São Paulo", -23.5, -46.6],
];

function latLngToVector3(lat, lng, radius = 2.04) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Marker({ name, lat, lng, index }) {
  const ring = useRef(null);
  const group = useRef(null);
  const position = useMemo(() => latLngToVector3(lat, lng), [lat, lng]);

  useFrame(({ clock }) => {
    const pulse = (clock.elapsedTime + index * 0.13) % 2;
    if (ring.current) {
      const scale = 1 + pulse * 0.75;
      ring.current.scale.setScalar(scale);
      ring.current.material.opacity = Math.max(0, 0.7 - pulse * 0.35);
    }
  });

  useLayoutEffect(() => {
    gsap.fromTo(group.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.7, delay: index * 0.045, ease: "back.out(1.7)" });
  }, [index]);

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.045, 0.004, 8, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
      <Html distanceFactor={8} position={[0.1, 0.04, 0]} center>
        <span className="globe-label">{name}</span>
      </Html>
    </group>
  );
}

function GlobeScene() {
  const group = useRef(null);
  const texture = useMemo(() => createGlobeTexture(), []);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.0008;
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        group.current.rotation,
        { y: -0.3 },
        {
          y: 0.8,
          scrollTrigger: {
            trigger: "#global-connectivity",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            markers: false,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ambientLight color="#4488bb" intensity={0.3} />
      <directionalLight color="#ffffff" intensity={0.8} position={[4, 5, 4]} />
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhongMaterial map={texture} shininess={18} />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.15, 64, 64]} />
          <meshBasicMaterial color="#2D628C" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
        {locations.map(([name, lat, lng], index) => (
          <Marker name={name} lat={lat} lng={lng} index={index} key={name} />
        ))}
      </group>
    </>
  );
}

function MobileMap() {
  return (
    <svg className="mobile-map" viewBox="0 0 760 360" aria-label="Global offices map">
      <path d="M95 145 170 95l92 30 32 62-58 42-102-12-55-48Zm275-38 97-15 94 48-28 88-88 28-82-50Zm96 151 58 54-15 82-48 45-25-103Zm93-132 123-18 118 56 30 80-102 45-116-43Zm198 173 75 28 46 63-48 35-86-42Zm94-70 58 22 33 55-48 25-58-42Z" fill="#1A3050" />
      {locations.map(([name, lat, lng]) => {
        const x = ((lng + 180) / 360) * 760;
        const y = ((90 - lat) / 180) * 360;
        return <circle className="map-dot" cx={x} cy={y} r="4" key={name} />;
      })}
    </svg>
  );
}

export default function Globe() {
  const [mobile, setMobile] = useState(false);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (mobile) return <MobileMap />;

  return (
    <Canvas className="globe-canvas" camera={{ position: [0, 0, 5.4], fov: 45 }} dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}>
      <GlobeScene />
    </Canvas>
  );
}
