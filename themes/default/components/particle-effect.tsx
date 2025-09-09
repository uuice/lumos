import React from 'react'

export const ParticleEffect: React.FC = () => {
  return (
    <>
      <style>
        {`
          .particle-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            background: transparent;
            transition: background 0.3s;
          }
          body.dark .particle-canvas {
            /* 暗黑模式下粒子颜色可调整 */
            background: transparent;
          }
        `}
      </style>

      <canvas id="particle-canvas" className="particle-canvas"></canvas>
    </>
  )
}
