import { MODULE_COLORS } from './data'

const PALETTE = Object.values(MODULE_COLORS)

// Small burst of palette-colored squares from a click point.
export function confettiBurst(x, y, count = 26) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    const size = 5 + Math.random() * 7
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${PALETTE[i % PALETTE.length]};pointer-events:none;z-index:9999;border-radius:${Math.random() > 0.5 ? '50%' : '1px'};`
    document.body.appendChild(el)
    const angle = Math.random() * Math.PI * 2
    const velocity = 60 + Math.random() * 130
    const dx = Math.cos(angle) * velocity
    const dy = Math.sin(angle) * velocity - 70
    el.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 160}px) rotate(${(Math.random() - 0.5) * 540}deg)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(.2,.6,.35,1)' }
    ).onfinish = () => el.remove()
  }
}
