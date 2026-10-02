import logoUrl from '../assets/church-logo.png'

// The church logo (a leaf with a cross) from assets/church-logo.png.
// The PNG is used as a mask, so the leaf takes the current text color and stays
// visible on light and dark backgrounds. Set the color with a text class.
const mask = {
  WebkitMaskImage: `url(${logoUrl})`,
  maskImage: `url(${logoUrl})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
}

export default function Logo({ className = 'h-10' }) {
  return <span aria-hidden="true" style={mask} className={`inline-block aspect-[41/48] shrink-0 bg-current ${className}`} />
}
