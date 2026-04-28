import { animate, motion, useMotionValue } from 'motion/react'
import { useEffect } from 'react'

interface Props {
  progress: number
  width: number | null
  height: number | null
}

const SVG_CONFIG = {
  strokeWidth: 10,
  radius: 12,
} as const

export function AnimatedProgress({ progress, width, height }: Props) {
  const { strokeWidth, radius } = SVG_CONFIG

  const pathLength = useMotionValue(0)

  useEffect(() => {
    const controls = animate(pathLength, progress, {
      duration: progress > 0 ? 1 : 0,
      ease: 'linear',
    })
    return () => controls.stop()
  }, [progress, pathLength])

  if (width === null || height === null) return

  const x = strokeWidth / 2
  const y = strokeWidth / 2
  const w = width - strokeWidth
  const h = height - strokeWidth

  const path = `
    M ${width / 2} ${y}
    L ${w - radius + x} ${y}
    Q ${w + x} ${y} ${w + x} ${radius + y}
    L ${w + x} ${h - radius + y}
    Q ${w + x} ${h + y} ${w - radius + x} ${h + y}
    L ${radius + x} ${h + y}
    Q ${x} ${h + y} ${x} ${h - radius + y}
    L ${x} ${radius + y}
    Q ${x} ${y} ${radius + x} ${y}
    L ${width / 2} ${y}
  `

  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path d={path} fill="none" stroke="rgb(229 231 235)" strokeWidth={strokeWidth} />
      <motion.path
        d={path}
        fill="none"
        stroke="rgb(34 197 94)"
        strokeWidth={strokeWidth}
        style={{ pathLength }}
      />
    </svg>
  )
}
