import React, { useState, useEffect, useRef } from 'react';

interface KinematicArmProps {
  size?: number;
  className?: string;
}

export const KinematicArm: React.FC<KinematicArmProps> = ({ 
  size = 260, 
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState({ x: 40, y: 60 });
  const [currentEffector, setCurrentEffector] = useState({ x: 40, y: 60 });
  const [isClawClosed, setIsClawClosed] = useState(false);

  // Dynamic link lengths scaled with size
  const L1 = size * 0.28; // Upper bone
  const L2 = size * 0.25; // Forearm bone
  const center = size / 2;

  // Track mouse coordinates globally across the window
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

  // Smooth fluid lerp physics towards target
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

    // Reach envelope bounds
    const maxReach = L1 + L2 - 2;
    const minReach = Math.abs(L1 - L2) + 5;
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

  // Claw geometry orientation
  const clawAngleDeg = (angle2 * 180) / Math.PI;

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsClawClosed(true)}
      onMouseUp={() => setIsClawClosed(false)}
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* SVG Robotic Kinematic Canvas */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible cursor-grab active:cursor-grabbing"
      >
        <defs>
          <filter id="emerald-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="pivot-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Dashed Orbit Ring */}
        <circle
          cx={center}
          cy={center}
          r={L1 + L2}
          fill="none"
          stroke="rgba(255, 255, 255, 0.13)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
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
          strokeWidth={Math.max(5, size * 0.026)}
          strokeLinecap="round"
        />

        {/* Segment 2: Lower Bone / Forearm (Joint 1 -> End Effector) */}
        <line
          x1={j1x}
          y1={j1y}
          x2={endX}
          y2={endY}
          stroke="#f8f9fa"
          strokeWidth={Math.max(4.5, size * 0.022)}
          strokeLinecap="round"
        />

        {/* Joint 1 Pivot (Emerald Green Knee / Elbow) */}
        <circle
          cx={j1x}
          cy={j1y}
          r={Math.max(4.5, size * 0.022)}
          fill="#34d399"
          stroke="#064e3b"
          strokeWidth="1.5"
          filter="url(#emerald-glow)"
        />
        <circle
          cx={j1x}
          cy={j1y}
          r={Math.max(2, size * 0.009)}
          fill="#ffffff"
        />

        {/* Center Base Concentric Hub */}
        <circle
          cx={center}
          cy={center}
          r={Math.max(13, size * 0.06)}
          fill="#181818"
          stroke="#e5e5e5"
          strokeWidth={Math.max(3.5, size * 0.016)}
          filter="url(#pivot-glow)"
        />
        <circle
          cx={center}
          cy={center}
          r={Math.max(4, size * 0.02)}
          fill="#38bdf8"
        />

        {/* End Effector Mechanical Claw (Rotated to match angle2) */}
        <g transform={`translate(${endX}, ${endY}) rotate(${clawAngleDeg})`}>
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          
          {/* Left claw prong */}
          <line
            x1="0"
            y1="-2.5"
            x2={isClawClosed ? "9" : "8"}
            y2={isClawClosed ? "-2" : "-6"}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={isClawClosed ? "9" : "8"}
            y1={isClawClosed ? "-2" : "-6"}
            x2={isClawClosed ? "13" : "12"}
            y2={isClawClosed ? "-0.5" : "-2"}
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Right claw prong */}
          <line
            x1="0"
            y1="2.5"
            x2={isClawClosed ? "9" : "8"}
            y2={isClawClosed ? "2" : "6"}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={isClawClosed ? "9" : "8"}
            y1={isClawClosed ? "2" : "6"}
            x2={isClawClosed ? "13" : "12"}
            y2={isClawClosed ? "0.5" : "2"}
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
