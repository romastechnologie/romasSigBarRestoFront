import type { Directive } from 'vue'

const formatMontant: Directive = {
  mounted(el: HTMLInputElement) {
    applyFormat(el)
    el.addEventListener('input', () => handleInput(el))
  },
  updated(el: HTMLInputElement) {
    applyFormat(el)
  }
}

let isFormatting = false

function handleInput(el: HTMLInputElement) {
  if (isFormatting) return
  isFormatting = true

  const raw = parse(el.value)
  const formatted = format(raw.replace('.', ','))
  el.value = formatted

  // Important pour VeeValidate / v-model
  el.dispatchEvent(new Event('input', { bubbles: true }))

  isFormatting = false
}

function applyFormat(el: HTMLInputElement) {
  const raw = parse(el.value)
  const formatted = format(raw.replace('.', ','))
  if (formatted !== el.value) {
    el.value = formatted
  }
}

function parse(val: string): string {
  if (!val) return ''
  const clean = val.replace(/\s+/g, '').replace(',', '.')
  const match = clean.match(/^(\d+)(\.\d{0,2})?/)
  return match ? match[0] : ''
}

function format(val: string): string {
  if (!val) return ''
  let [int, decimal] = val.replace(/\s/g, '').split(',')
  int = int?.replace(/^0+/, '') || '0'
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return decimal ? `${int},${decimal}` : int
}

export default formatMontant
