// ── GFA Design Tokens ──────────────────────────────────────────────────────
// Single source of truth for all brand colours.
// Import into any component: import { W, T, GREEN } from '@/lib/tokens'

export const W      = '#ffffff'   // white
export const T      = '#3e3e3f'   // near-black text
export const LIGHT  = '#f7f7f6'   // light background
export const MID    = '#ebebea'   // mid border / divider
export const GREEN  = '#77d46c'   // brand green
export const YELLOW = '#ffd110'   // yellow
export const ORANGE = '#ed5a29'   // orange
export const CYAN   = '#01b3ff'   // cyan
export const GRAY   = '#75756d'   // gray

// Category pill colours
export const CATEGORY_COLORS = {
  'olive-oils': GREEN,
  grains:       YELLOW,
  legumes:      CYAN,
  snacks:       GRAY,
  lna:          GREEN,
  seafood:      CYAN,
}

export const CATEGORY_TEXT_COLORS = {
  grains: T,   // yellow needs dark text
}
