export default function GFASeedMark({ size = 14, style }) {
  return (
    <svg
      width={size}
      height={size * 1.02}
      viewBox="130 90 130 225"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 6, ...style }}
    >
      <path d="M200,95 C225,100 248,120 253,150 C258,185 250,225 234,258 C222,282 210,298 200,310 C190,298 178,282 166,258 C150,225 142,185 147,150 C152,120 175,100 200,95 Z" fill="#3e3e3f"/>
      <path d="M200,120 L214,139 L200,158 L186,139 Z" fill="#77d46c"/>
      <path d="M200,160 L214,179 L200,198 L186,179 Z" fill="#01b3ff"/>
      <path d="M200,200 L214,219 L200,238 L186,219 Z" fill="#ed5a29"/>
      <path d="M200,240 L214,259 L200,278 L186,259 Z" fill="#75756d"/>
      <line x1="200" y1="105" x2="200" y2="122" stroke="#ffffff" strokeWidth="4"/>
      <line x1="200" y1="276" x2="200" y2="300" stroke="#ffffff" strokeWidth="4"/>
    </svg>
  )
}
