'use client'

import { config } from '@/lib/config'

export function WhatsAppFloat() {
  const waUrl = `https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(config.whatsappMessage)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.39l6.2-1.964A15.89 15.89 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.32 22.616c-.39 1.1-1.932 2.012-3.168 2.278-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.828-6.8-8.066-7.114-.228-.314-1.918-2.556-1.918-4.874s1.214-3.458 1.646-3.932c.39-.428 1.026-.642 1.636-.642.198 0 .376.01.536.018.432.018.648.044.934.724.356.848 1.226 2.986 1.332 3.204.108.218.216.514.068.808-.138.304-.258.438-.476.688-.218.25-.426.442-.644.712-.198.236-.42.488-.178.92.242.432 1.078 1.78 2.316 2.882 1.592 1.418 2.892 1.874 3.372 2.07.356.148.778.108 1.03-.158.32-.342.714-.908 1.116-1.468.286-.398.648-.45 1.04-.304.398.138 2.528 1.192 2.96 1.41.432.218.72.324.828.504.106.18.106 1.048-.284 2.148z" />
      </svg>
    </a>
  )
}
