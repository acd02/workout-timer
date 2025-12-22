interface Props {
  progress: number
}

// SVG viewBox dimensions
// width and height values are arbitrary, only the aspect ratio matters
// (5:1 ratio stretches to fit actual container via preserveAspectRatio="none")
const SVG_CONFIG = {
  width: 1000,
  height: 200,
  strokeWidth: 12,
  radius: 12,
} as const

export function AnimatedProgress({ progress }: Props) {
  const { width, height, strokeWidth, radius } = SVG_CONFIG

  // Calculate path for rounded rectangle
  const x = strokeWidth / 2
  const y = strokeWidth / 2
  const w = width - strokeWidth
  const h = height - strokeWidth

  // Rounded rectangle path starting from top center, going clockwise
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
      className="pointer-events-none absolute inset-0"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background border */}
      <path d={path} fill="none" stroke="rgb(229 231 235)" strokeWidth={strokeWidth} />

      {/* Animated progress border */}
      <path
        d={path}
        fill="none"
        stroke="rgb(34 197 94)"
        strokeWidth={strokeWidth}
        strokeDasharray="1"
        strokeDashoffset={1 - progress}
        pathLength="1"
        style={{
          transition: progress > 0 ? 'stroke-dashoffset 1s linear' : undefined,
        }}
      />
    </svg>
  )
}
