import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.005));

  return (
    <div className="fixed top-0 right-0 left-0 z-60 h-0.5 bg-transparent">
      <motion.div
        style={{ scaleX: width, transformOrigin: "0% 50%", opacity: visible ? 1 : 0 }}
        className="h-full bg-sage transition-opacity duration-300"
      />
    </div>
  );
}
