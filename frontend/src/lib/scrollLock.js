// Reference-counted page scroll lock, shared by the mobile menu and modals so
// that one closing never unlocks the page while another is still open.
let locks = 0

export function lockScroll() {
  if (locks++ === 0) document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  if (locks > 0 && --locks === 0) document.documentElement.style.overflow = ''
}
