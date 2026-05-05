import { motion, useReducedMotion } from "framer-motion";
import { Brain, Activity, AlertTriangle, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import sevraBrain from "@/assets/sevra-ai-brain.png";

const features = [
  {
    icon: Activity,
    title: "Real-time Predictions",
    desc: "Forecasts patient deterioration up to 6 hours ahead with calibrated confidence.",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    desc: "Multivariate vitals analysis flags unusual physiology before it becomes critical.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Intelligence",
    desc: "Decision-grade insights aligned to clinical pathways and hospital protocols.",
  },
];

export const SevraAi = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [showSvg, setShowSvg] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    // Lazy mount SVG after initial render
    const t = setTimeout(() => setShowSvg(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="ai" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[60px]" />

      <div className="relative container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-flex chip mb-6">
            <Brain className="h-3 w-3" />
            <span>SEVRA AI · Core Intelligence</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            From medical data to{" "}
            <span className="text-gradient">real-time intelligence</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            SEVRA AI is the cognitive engine of the platform — a deep learning core trained
            on the physiology of care, designed to think with the clinician.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Brain Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative aspect-[4/3] flex items-center justify-center will-change-transform"
            style={{ perspective: "1200px" }}
          >
            {/* Neural background */}
            {showSvg && (
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <NeuralSvg />
              </div>
            )}

            {/* Reduced glow layers */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="absolute h-[320px] w-[320px] rounded-full bg-primary/20 blur-[60px]" />
              <div className="absolute h-[200px] w-[200px] rounded-full bg-primary/30 blur-[30px]" />
            </div>

            {/* Brain Image */}
            <motion.img
              src={sevraBrain}
              alt="SEVRA AI — neural core"
              loading="lazy"
              className="relative z-10 h-[85%] w-auto object-contain will-change-transform drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              animate={
                shouldReduceMotion
                  ? {}
                  : isMobile
                  ? { y: [0, -8, 0] }
                  : {
                      y: [0, -12, 0],
                      rotateY: [-3, 3, -3],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Reflection */}
            <div className="pointer-events-none absolute bottom-[10%] left-1/2 -translate-x-1/2 h-5 w-[50%] rounded-[50%] bg-primary/20 blur-xl" />

            {/* Floating UI */}
            <div className="absolute top-2 left-2 chip z-20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Inference live
            </div>

            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-muted-foreground uppercase z-20">
              Model · sevra-core v3.2
            </div>
          </motion.div>

          {/* Features */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-panel holo-border rounded-2xl p-6 hover:translate-y-[-2px] transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary border border-primary/20">
                    <f.icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-lg">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NeuralSvg = () => {
  const layers = [4, 6, 6, 4];
  const width = 800;
  const height = 600;
  const padX = 80;
  const padY = 80;

  const nodes: { x: number; y: number; layer: number }[] = [];

  layers.forEach((count, li) => {
    const x = padX + ((width - padX * 2) / (layers.length - 1)) * li;
    for (let i = 0; i < count; i++) {
      const y = padY + ((height - padY * 2) / (count - 1 || 1)) * i;
      nodes.push({ x, y, layer: li });
    }
  });

  const lines: any[] = [];

  for (let li = 0; li < layers.length - 1; li++) {
    const a = nodes.filter((n) => n.layer === li);
    const b = nodes.filter((n) => n.layer === li + 1);

    a.forEach((na, i) => {
      if (i % 2 === 0) {
        b.forEach((nb, j) => {
          if (j % 2 === 0) {
            lines.push({
              x1: na.x,
              y1: na.y,
              x2: nb.x,
              y2: nb.y,
              key: `${li}-${i}-${j}`,
            });
          }
        });
      }
    });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
      {lines.map((l) => (
        <line
          key={l.key}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="rgba(0,200,255,0.2)"
          strokeWidth="0.5"
        />
      ))}

      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="3" fill="rgba(0,200,255,0.6)" />
      ))}
    </svg>
  );
};

export default SevraAi;
