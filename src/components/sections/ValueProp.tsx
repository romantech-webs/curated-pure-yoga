export function ValueProp() {
  return (
    <section className="py-12 md:py-24 bg-neutral">
      <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-secondary tracking-wide leading-snug">
          TU PIEL ES ÚNICA Y TIENE UN SECRETO QUE REVELAR
        </h2>
        <p className="mt-4 text-sm text-muted/80 italic">
          ¿Sabías que tu piel cambia mil veces al año?
        </p>
        <p className="mt-6 text-sm text-muted leading-relaxed max-w-2xl mx-auto">
          Por eso, realizamos un diagnóstico inicial de tu piel y un tratamiento personalizado
          que integra lo mejor del yoga facial y la medicina estética. Nuestro método
          exclusivo estimula la musculatura facial desde dentro mientras los tratamientos
          médicos aportan resultados visibles desde la primera sesión. Solicita tu
          diagnóstico gratuito.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contacto/"
            className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary/80 transition-colors duration-300"
          >
            Solicita tu diagnóstico gratuito
          </a>
          <a
            href="/servicios/"
            className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Conoce nuestros tratamientos
          </a>
        </div>
      </div>
    </section>
  )
}
