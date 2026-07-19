// ── GFA DESIGN TOKENS ─────────────────────────────────────────────────────
export const C = {
  white:  '#ffffff',
  ink:    '#3e3e3f',
  light:  '#f7f7f6',
  mid:    '#ebebea',
  green:  '#77d46c',
  yellow: '#ffd110',
  orange: '#ed5a29',
  cyan:   '#01b3ff',
  gray:   '#75756d',
}

export const F = {
  heading: "'Poppins', sans-serif",
  body:    "'Mulish', sans-serif",
  mono:    "'IBM Plex Mono', monospace",
}

// Category colour map
export const CATEGORY_COLOR = {
  'oils-condiments':  C.green,
  'grains-noodles':   C.yellow,
  'legumes-pulses':   C.cyan,
  'snacks-pantry':    C.gray,
  'low-no-alcohol':   C.green,
  'seafood':          C.cyan,
}

export const CATEGORY_TEXT_COLOR = {
  'grains-noodles': C.ink,  // yellow needs dark text
}

// GFA score symbols
export const SCORE = {
  found:   '✓',
  partial: '~',
  missing: '—',
}

export const SCORE_COLOR = {
  '✓': C.green,
  '~': C.yellow,
  '—': '#cccccc',
}
