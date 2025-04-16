import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { lazy } from "react"; // React's lazy import

const World = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World }))
);

export default function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    // ... (same as your provided sampleArcs array)
  ];

  return (
    <div className="flex flex-row items-center justify-center h-[400px] lg:h-[500px] xl:h-auto bg-none relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full lg:h-[35rem] xl:h-[40rem] px-4 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
        </motion.div>
        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 sm:h-72 lg:h-[35rem] xl:h-full z-10">
          <Suspense fallback={<div>Loading...</div>}>
            <World data={sampleArcs} globeConfig={globeConfig} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
