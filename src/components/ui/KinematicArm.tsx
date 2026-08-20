import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Minimize2 } from 'lucide-react';

interface KinematicArmProps {
  size?: number;
  className?: string;
  isFloating?: boolean;
}

export const KinematicArm: React.FC<KinematicArmProps> = ({ 
  size = 220, 
  className = '',
  isFloating = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentEffector, setCurrentEffector] = useState({ x: 50, y: 50 });
  const [isClawClosed, setIsClawClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Link lengths
  const L1 = 58; // Upper bone
  const L2 = 52; // Forearm / lower bone
  const center = size / 2;

  // Track mouse coordinates globally across the IDE
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      setTargetPos({ x: dx, y: dy });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp physics towards target
  useEffect(() => {
    let animId: number;

    const animate = () => {
      setCurrentEffector((prev) => {
        const lerpFactor = 0.12;
        const nx = prev.x + (targetPos.x - prev.x) * lerpFactor;
        const ny = prev.y + (targetPos.y - prev.y) * lerpFactor;
        return { x: nx, y: ny };
      });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  // 2-Bone Inverse Kinematics calculation
  const solveIK = () => {
    const tx = currentEffector.x;
    const ty = currentEffector.y;
    let dist = Math.sqrt(tx * tx + ty * ty);

    // Clamp distance within reachable envelope
    const maxReach = L1 + L2 - 1;
    const minReach = Math.abs(L1 - L2) + 4;
    dist = Math.max(minReach, Math.min(maxReach, dist));

    // Base angle to target
    const baseAngle = Math.atan2(ty, tx);

    // Law of Cosines for elbow joint
    const cosAlpha = (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist);
    const alpha = Math.acos(Math.max(-1, Math.min(1, cosAlpha)));

    // Joint 1 (Elbow / Knee) angle and position
    const angle1 = baseAngle - alpha;
    const j1x = center + L1 * Math.cos(angle1);
    const j1y = center + L1 * Math.sin(angle1);

    // Joint 2 (End Effector / Tip) position
    const endX = center + dist * Math.cos(baseAngle);
    const endY = center + dist * Math.sin(baseAngle);
    const angle2 = Math.atan2(endY - j1y, endX - j1x);

    return { j1x, j1y, endX, endY, angle2 };
  };

  const { j1x, j1y, endX, endY, angle2 } = solveIK();

  // Claw geometry points oriented along angle2
  const clawAngleDeg = (angle2 * 180) / Math.PI;

  if (isMinimized && isFloating) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-10 right-4 p-2.5 rounded-full bg-ide-panel border border-ide-accent/50 text-ide-accent shadow-xl hover:scale-105 transition-transform z-30 flex items-center justify-center group"
        title="Open Kinematic Arm Gadget"
      >
        <Sparkles className="w-4 h-4 animate-spin-slow" />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsClawClosed(true)}
      onMouseUp={() => setIsClawClosed(false)}
      className={`relative select-none flex flex-col items-center justify-center transition-all ${
        isFloating
          ? 'fixed bottom-10 right-4 bg-ide-sidebar/95 backdrop-blur-md border border-ide-border rounded-2xl p-2 shadow-2xl z-30'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Optional Floating Controls */}
      {isFloating && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 hover:opacity-100 transition-opacity z-20">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded bg-ide-bg hover:bg-ide-tabHover text-ide-muted hover:text-white"
            title="Minimize"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* SVG Robotic Kinematic Canvas */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible cursor-grab active:cursor-grabbing"
      >
        <defs>
          {/* Radial Glow Filter */}
          <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="pivot-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Dashed Orbit Ring */}
        <circle
          cx={center}
          cy={center}
          r={L1 + L2}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />

        {/* Inner Subtle Guide Ring */}
        <circle
          cx={center}
          cy={center}
          r={L1}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Segment 1: Upper Bone (Base -> Joint 1) */}
        <line
          x1={center}
          y1={center}
          x2={j1x}
          y2={j1y}
          stroke="#f8f9fa"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Segment 2: Lower Bone / Forearm (Joint 1 -> End Effector) */}
        <line
          x1={j1x}
          y1={j1y}
          x2={endX}
          y2={endY}
          stroke="#f8f9fa"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Joint 1 Pivot (Emerald Green Knee / Elbow) */}
        <circle
          cx={j1x}
          cy={j1y}
          r="4.5"
          fill="#34d399"
          stroke="#064e3b"
          strokeWidth="1.5"
          filter="url(#emerald-glow)"
        />
        <circle
          cx={j1x}
          cy={j1y}
          r="1.8"
          fill="#ffffff"
        />

        {/* Center Base Concentric Hub */}
        <circle
          cx={center}
          cy={center}
          r="13"
          fill="#181818"
          stroke="#e5e5e5"
          strokeWidth="3.5"
          filter="url(#pivot-glow)"
        />
        <circle
          cx={center}
          cy={center}
          r="4"
          fill="#38bdf8"
        />

        {/* End Effector Mechanical Claw (Rotated to match angle2) */}
        <g transform={`translate(${endX}, ${endY}) rotate(${clawAngleDeg})`}>
          {/* Base of claw */}
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
          
          {/* Left claw prong */}
          <line
            x1="0"
            y1="-2"
            x2={isClawClosed ? "8" : "7"}
            y2={isClawClosed ? "-2" : "-5"}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={isClawClosed ? "8" : "7"}
            y1={isClawClosed ? "-2" : "-5"}
            x2={isClawClosed ? "11" : "10"}
            y2={isClawClosed ? "-0.5" : "-2"}
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right claw prong */}
          <line
            x1="0"
            y1="2"
            x2={isClawClosed ? "8" : "7"}
            y2={isClawClosed ? "2" : "5"}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={isClawClosed ? "8" : "7"}
            y1={isClawClosed ? "2" : "5"}
            x2={isClawClosed ? "11" : "10"}
            y2={isClawClosed ? "0.5" : "2"}
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Subtle indicator label */}
      <div className="text-[10px] font-mono text-ide-muted/70 tracking-widest uppercase mt-1 pointer-events-none">
        IK•KINEMATICS
      </div>
    </div>
  );
};
