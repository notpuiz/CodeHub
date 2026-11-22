<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  hostEl: {
    type: Object,
    default: null,
  },
})

const themeStore = useThemeStore()
const canvasRef = ref(null)

let ctx = null
let width = 0
let height = 0
let dpr = 1
let rafId = null
let resizeObserver = null
let boundHost = null
let reducedMotion = false
let lastTime = 0
let nextMeteorAt = 0

const CODE_TOKENS = [
  '</>',
  '{}',
  '=>',
  '[]',
  'def',
  'int*',
  '::',
  'async',
  '<T>',
  '&&',
  '!=',
  'fn()',
  '0x1F',
  '//',
  '+=',
  'std::',
  'const',
  'void',
]

let stars = []
let glyphs = []
const meteors = []
const sparkDust = []

const pointer = {
  x: -9999,
  y: -9999,
  active: false,
  normX: 0,
  normY: 0,
  targetNormX: 0,
  targetNormY: 0,
}

function getInk() {
  const isDark = themeStore.theme === 'dark'
  return isDark ? { rgb: '255, 255, 255', alphaScale: 0.98 } : { rgb: '0, 0, 0', alphaScale: 0.68 }
}

function seedSky() {
  const area = width * height
  const starCount = Math.min(340, Math.max(150, Math.floor(area / 3600)))
  stars = Array.from({ length: starCount }, () => {
    const depth = Math.pow(Math.random(), 1.55)
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      depth,
      r: 0.55 + depth * 1.7,
      sparkle: depth > 0.78 && Math.random() < 0.45,
      baseAlpha: 0.24 + depth * 0.7,
      twinkleSpeed: 0.0012 + Math.random() * 0.0028,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: -(0.02 + depth * 0.07),
      driftY: -(0.015 + depth * 0.045),
    }
  })

  // Spread a light sprinkle of floating monospace code symbols across the sky
  const glyphCount = Math.min(24, Math.max(12, Math.floor(area / 56000)))
  const cols = Math.ceil(Math.sqrt(glyphCount * (width / Math.max(1, height))))
  const rows = Math.ceil(glyphCount / Math.max(1, cols))
  const cellW = width / Math.max(1, cols)
  const cellH = height / Math.max(1, rows)

  glyphs = []
  let idx = 0
  for (let r = 0; r < rows && idx < glyphCount; r += 1) {
    for (let c = 0; c < cols && idx < glyphCount; c += 1) {
      const depth = 0.35 + Math.random() * 0.65
      glyphs.push({
        text: CODE_TOKENS[idx % CODE_TOKENS.length],
        x: (c + 0.18 + Math.random() * 0.64) * cellW,
        y: (r + 0.18 + Math.random() * 0.64) * cellH,
        vx: (Math.random() - 0.5) * 0.12 * depth,
        vy: -(0.06 + Math.random() * 0.12) * depth,
        depth,
        size: Math.round(11 + depth * 4),
        rotation: (Math.random() - 0.5) * 0.2,
        highlight: 0,
      })
      idx += 1
    }
  }
}

function spawnMeteor(originX, originY) {
  const startX = originX ?? width * (0.18 + Math.random() * 0.78)
  const startY = originY ?? height * (0.04 + Math.random() * 0.28)
  const angle = Math.PI * (0.68 + Math.random() * 0.16)
  const speed = 560 + Math.random() * 340
  meteors.push({
    x: startX,
    y: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: 70 + Math.random() * 60,
    life: 0,
    maxLife: 0.65 + Math.random() * 0.35,
  })
  if (meteors.length > 6) meteors.shift()
}

function resize() {
  const canvas = canvasRef.value
  const host = props.hostEl || canvas?.parentElement
  if (!canvas || !host) return

  const rect = host.getBoundingClientRect()
  const nextW = Math.max(1, Math.floor(rect.width))
  const nextH = Math.max(1, Math.floor(rect.height))
  const significantResize = Math.abs(nextW - width) > 40 || Math.abs(nextH - height) > 80

  width = nextW
  height = nextH
  dpr = Math.min(window.devicePixelRatio || 1, 2)

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  if (!stars.length || significantResize) {
    seedSky()
  }
  draw(performance.now(), 0)
}

function draw(now, dt) {
  if (!ctx || width <= 0 || height <= 0) return

  const ink = getInk()
  const sec = Math.min(dt / 1000, 0.05)
  const step = Math.min(dt / 16.667, 2.2)

  if (!reducedMotion) {
    pointer.normX += (pointer.targetNormX - pointer.normX) * 0.07
    pointer.normY += (pointer.targetNormY - pointer.normY) * 0.07

    if (now >= nextMeteorAt) {
      spawnMeteor()
      nextMeteorAt = now + 2600 + Math.random() * 3200
    }
  }

  ctx.clearRect(0, 0, width, height)

  const px = reducedMotion ? 0 : pointer.normX
  const py = reducedMotion ? 0 : pointer.normY

  // 1. Monochrome parallax twinkling starfield
  for (let i = 0; i < stars.length; i += 1) {
    const s = stars[i]

    if (!reducedMotion && step > 0) {
      s.x += s.driftX * step
      s.y += s.driftY * step
      if (s.x < -8) s.x = width + 8
      else if (s.x > width + 8) s.x = -8
      if (s.y < -8) s.y = height + 8
      else if (s.y > height + 8) s.y = -8
    }

    const sx = s.x + px * (4 + s.depth * 22)
    const sy = s.y + py * (3 + s.depth * 14)

    const twinkle = reducedMotion
      ? 0.85
      : 0.6 + 0.4 * Math.sin(now * s.twinkleSpeed + s.twinklePhase)
    const alpha = Math.min(0.95, s.baseAlpha * twinkle * ink.alphaScale)

    ctx.fillStyle = `rgba(${ink.rgb}, ${alpha.toFixed(3)})`
    ctx.beginPath()
    ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
    ctx.fill()

    // Crisp monochrome 4-point star glint on select bright foreground stars
    if (s.sparkle) {
      const arm = s.r * (2.6 + twinkle * 1.4)
      ctx.strokeStyle = `rgba(${ink.rgb}, ${(alpha * 0.65).toFixed(3)})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(sx - arm, sy)
      ctx.lineTo(sx + arm, sy)
      ctx.moveTo(sx, sy - arm)
      ctx.lineTo(sx, sy + arm)
      ctx.stroke()
    }
  }

  // 2. Subtle floating monochrome code symbols
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < glyphs.length; i += 1) {
    const g = glyphs[i]

    if (!reducedMotion && step > 0) {
      g.vx *= 0.99
      if (Math.abs(g.vy) > 0.35) g.vy *= 0.96
      g.x += g.vx * step
      g.y += g.vy * step

      if (g.y < -28) {
        g.y = height + 24
        g.x = Math.random() * width
      } else if (g.y > height + 28) {
        g.y = -24
      }
      if (g.x < -36) g.x = width + 36
      else if (g.x > width + 36) g.x = -36

      g.highlight *= 0.93
    }

    const gx = g.x + px * (6 + g.depth * 20)
    const gy = g.y + py * (4 + g.depth * 13)

    let proximity = 0
    if (pointer.active && !reducedMotion) {
      const dist = Math.hypot(gx - pointer.x, gy - pointer.y)
      if (dist < 160) {
        const n = 1 - dist / 160
        proximity = n * n * (3 - 2 * n)
      }
    }

    const glow = Math.min(1, Math.max(proximity, g.highlight))
    const alpha = Math.min(0.75, (0.1 + g.depth * 0.1 + glow * 0.42) * ink.alphaScale)

    ctx.save()
    ctx.translate(gx, gy)
    ctx.rotate(g.rotation)
    ctx.font = `500 ${g.size}px 'JetBrains Mono', ui-monospace, monospace`
    ctx.fillStyle = `rgba(${ink.rgb}, ${alpha.toFixed(3)})`
    ctx.fillText(g.text, 0, 0)
    ctx.restore()
  }

  // 3. Click stardust burst particles
  if (!reducedMotion && sparkDust.length > 0) {
    for (let i = sparkDust.length - 1; i >= 0; i -= 1) {
      const sp = sparkDust[i]
      sp.life -= dt
      if (sp.life <= 0) {
        sparkDust.splice(i, 1)
        continue
      }
      sp.vx *= 0.96
      sp.vy *= 0.96
      sp.x += sp.vx * step
      sp.y += sp.vy * step
      const ratio = sp.life / sp.maxLife
      ctx.fillStyle = `rgba(${ink.rgb}, ${(ratio * 0.85 * ink.alphaScale).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(sp.x, sp.y, sp.r * ratio + 0.4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 4. Pure monochrome shooting stars (flat color, no gradients)
  if (!reducedMotion && meteors.length > 0) {
    ctx.lineCap = 'round'
    for (let i = meteors.length - 1; i >= 0; i -= 1) {
      const m = meteors[i]
      m.life += sec
      if (m.life >= m.maxLife) {
        meteors.splice(i, 1)
        continue
      }
      m.x += m.vx * sec
      m.y += m.vy * sec

      const progress = m.life / m.maxLife
      const fade = Math.sin(progress * Math.PI) * ink.alphaScale
      const speed = Math.hypot(m.vx, m.vy)
      const ux = m.vx / speed
      const uy = m.vy / speed

      const segments = [
        { from: 0, to: 0.35, w: 1.5, a: 0.85 },
        { from: 0.35, to: 0.7, w: 1.1, a: 0.42 },
        { from: 0.7, to: 1, w: 0.7, a: 0.16 },
      ]

      for (let s = 0; s < segments.length; s += 1) {
        const seg = segments[s]
        ctx.strokeStyle = `rgba(${ink.rgb}, ${(fade * seg.a).toFixed(3)})`
        ctx.lineWidth = seg.w
        ctx.beginPath()
        ctx.moveTo(m.x - ux * m.length * seg.from, m.y - uy * m.length * seg.from)
        ctx.lineTo(m.x - ux * m.length * seg.to, m.y - uy * m.length * seg.to)
        ctx.stroke()
      }

      ctx.fillStyle = `rgba(${ink.rgb}, ${(fade * 0.95).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function loop(now) {
  const dt = lastTime ? now - lastTime : 16.667
  lastTime = now
  draw(now, dt)
  rafId = requestAnimationFrame(loop)
}

function startLoop() {
  if (reducedMotion || rafId !== null || document.hidden) return
  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function handleVisibility() {
  if (document.hidden) stopLoop()
  else startLoop()
}

function handlePointerMove(e) {
  if (reducedMotion || e.pointerType !== 'mouse' || !boundHost) return
  const rect = boundHost.getBoundingClientRect()
  pointer.x = e.clientX - rect.left
  pointer.y = e.clientY - rect.top
  pointer.active = true
  pointer.targetNormX = (pointer.x / Math.max(1, rect.width)) * 2 - 1
  pointer.targetNormY = (pointer.y / Math.max(1, rect.height)) * 2 - 1
}

function handlePointerLeave() {
  pointer.active = false
  pointer.targetNormX = 0
  pointer.targetNormY = 0
}

function handlePointerDown(e) {
  if (reducedMotion || !boundHost) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  const rect = boundHost.getBoundingClientRect()
  const cx = e.clientX - rect.left
  const cy = e.clientY - rect.top
  if (cx < 0 || cy < 0 || cx > rect.width || cy > rect.height) return

  spawnMeteor(cx, cy)

  // Gently push nearby floating code symbols outward and brighten them
  for (let i = 0; i < glyphs.length; i += 1) {
    const g = glyphs[i]
    const dx = g.x - cx
    const dy = g.y - cy
    const dist = Math.hypot(dx, dy)
    if (dist > 1 && dist < 200) {
      const push = (1 - dist / 200) * 1.6
      g.vx += (dx / dist) * push
      g.vy += (dy / dist) * push
      g.highlight = Math.min(1, g.highlight + (1 - dist / 200))
    }
  }

  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4
    const speed = 0.8 + Math.random() * 1.4
    sparkDust.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.4,
      life: 620,
      maxLife: 620,
    })
  }
  if (sparkDust.length > 36) {
    sparkDust.splice(0, sparkDust.length - 36)
  }
}

watch(
  () => themeStore.theme,
  () => {
    if (reducedMotion) draw(performance.now(), 0)
  },
)

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  nextMeteorAt = performance.now() + 1400
  resize()

  boundHost = props.hostEl || canvasRef.value?.parentElement || null
  if (boundHost) {
    boundHost.addEventListener('pointermove', handlePointerMove, { passive: true })
    boundHost.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    boundHost.addEventListener('pointerdown', handlePointerDown, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resize())
      resizeObserver.observe(boundHost)
    }
  }

  document.addEventListener('visibilitychange', handleVisibility)
  startLoop()
})

onUnmounted(() => {
  stopLoop()
  document.removeEventListener('visibilitychange', handleVisibility)
  if (resizeObserver) resizeObserver.disconnect()
  if (boundHost) {
    boundHost.removeEventListener('pointermove', handlePointerMove)
    boundHost.removeEventListener('pointerleave', handlePointerLeave)
    boundHost.removeEventListener('pointerdown', handlePointerDown)
    boundHost = null
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 block h-full w-full"
  />
</template>
