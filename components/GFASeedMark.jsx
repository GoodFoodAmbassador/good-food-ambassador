import Image from 'next/image'

// Brand mark used in page footers. Renders the same logo as the nav bar and
// favicon (public/logo.png) so the site shows one consistent mark everywhere.
export default function GFASeedMark({ size = 20, style }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '-5px', marginRight: 8, width: size, height: size, ...style }}
    />
  )
}
