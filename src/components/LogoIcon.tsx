import type { SVGProps } from "react";

export default function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <clipPath id="logo-aurora-circle-clip">
          <circle cx="50" cy="50" r="47" />
        </clipPath>

        <filter id="logo-aurora-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1.25 0"
          />
        </filter>

        <linearGradient id="logo-aurora-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#330000" />
          <stop offset="25%" stopColor="#28000b" />
          <stop offset="50%" stopColor="#1d0017" />
          <stop offset="75%" stopColor="#110022" />
          <stop offset="100%" stopColor="#000033" />
        </linearGradient>

        <radialGradient id="logo-aurora-red" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
          <stop offset="45%" stopColor="#e3001c" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#c60039" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c60039" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="logo-aurora-magenta" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3298" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#aa0055" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#8e0071" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#71008e" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="logo-aurora-blue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5500aa" stopOpacity="1" />
          <stop offset="35%" stopColor="#3900c6" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#1c00e3" stopOpacity="0.85" />
          <stop offset="90%" stopColor="#0000ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0000ff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="logo-aurora-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff23d3" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#71008e" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#3900c6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0000ff" stopOpacity="0" />
        </radialGradient>

        <style>{`
          @keyframes logo-aurora-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes logo-wave-1 {
            0%, 100% { transform: translate(-12px, -10px) scale(1) rotate(0deg); }
            33% { transform: translate(14px, 12px) scale(1.22) rotate(110deg); }
            66% { transform: translate(-8px, 16px) scale(0.92) rotate(230deg); }
          }
          @keyframes logo-wave-2 {
            0%, 100% { transform: translate(12px, 10px) scale(1.15) rotate(0deg); }
            33% { transform: translate(-14px, -8px) scale(0.88) rotate(-115deg); }
            66% { transform: translate(10px, -14px) scale(1.28) rotate(-235deg); }
          }
          @keyframes logo-wave-3 {
            0%, 100% { transform: translate(-8px, 14px) scale(0.9) rotate(0deg); }
            50% { transform: translate(12px, -12px) scale(1.3) rotate(180deg); }
          }
          @keyframes logo-wave-4 {
            0%, 100% { transform: translate(14px, -10px) scale(1.2) rotate(0deg); }
            50% { transform: translate(-12px, 10px) scale(0.85) rotate(-180deg); }
          }
          .logo-spin-group {
            animation: logo-aurora-spin 20s linear infinite;
            transform-origin: 50px 50px;
          }
          .logo-wave-red {
            animation: logo-wave-1 7s ease-in-out infinite;
            transform-origin: 38px 38px;
          }
          .logo-wave-blue {
            animation: logo-wave-2 9s ease-in-out infinite;
            transform-origin: 62px 62px;
          }
          .logo-wave-magenta {
            animation: logo-wave-3 8s ease-in-out infinite;
            transform-origin: 60px 36px;
          }
          .logo-wave-core {
            animation: logo-wave-4 11s ease-in-out infinite;
            transform-origin: 36px 64px;
          }
        `}</style>
      </defs>

      <g clipPath="url(#logo-aurora-circle-clip)">
        <rect width="100" height="100" fill="url(#logo-aurora-base)" />
        <g className="logo-spin-group" filter="url(#logo-aurora-blur)">
          <ellipse className="logo-wave-red" cx="36" cy="36" rx="42" ry="34" fill="url(#logo-aurora-red)" />
          <ellipse className="logo-wave-blue" cx="64" cy="64" rx="44" ry="38" fill="url(#logo-aurora-blue)" />
          <ellipse className="logo-wave-magenta" cx="64" cy="34" rx="38" ry="42" fill="url(#logo-aurora-magenta)" />
          <ellipse className="logo-wave-core" cx="36" cy="66" rx="36" ry="36" fill="url(#logo-aurora-core)" />
        </g>
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      </g>
      <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
    </svg>
  );
}
