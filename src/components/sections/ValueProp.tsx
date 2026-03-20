import { config } from '@/lib/config'

export function ValueProp() {
  return (
    <section className="py-12 md:py-24 bg-neutral">
      <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-secondary tracking-wide leading-snug">
          TU PIEL ES ÚNICA Y MERECE UN CUIDADO INTEGRAL
        </h2>
        <p className="mt-4 text-sm text-muted/80 italic">
          ¿Sabías que combinar yoga facial con medicina estética potencia los resultados?
        </p>
        <p className="mt-6 text-sm text-muted leading-relaxed max-w-2xl mx-auto">
          En Curated realizamos un diagnóstico personalizado de tu piel y diseñamos
          un tratamiento que integra lo mejor de ambas disciplinas. Nuestro método
          exclusivo estimula la musculatura facial desde dentro mientras los tratamientos
          médicos aportan resultados visibles desde la primera sesión.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contacto/"
            className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary/80 transition-colors duration-300"
          >
            Solicita tu diagnóstico
          </a>
          <a
            href="/servicios/"
            className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Ver tratamientos
          </a>
        </div>
      </div>
    </section>
  )
}
