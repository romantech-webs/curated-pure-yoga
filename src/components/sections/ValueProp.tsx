export function ValueProp() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-secondary tracking-wide leading-snug">
          TU PIEL ES ÚNICA Y TIENE UN SECRETO QUE REVELAR
        </h2>
        <p className="mt-4 text-sm text-muted/80 italic">
          ¿Sabías que tu piel cambia mil veces al año?
        </p>
        <p className="mt-6 text-sm text-muted leading-relaxed max-w-2xl mx-auto">
          Por eso, realizamos un diagnóstico inicial de tu piel y un tratamiento personalizado
          que integra lo mejor del yoga facial y la medicina estética. Nuestro método
          exclusivo estimula la musculatura facial desde dentro mientras los tratamientos
          médicos aportan resultados visibles desde la primera sesión.
        </p>
        <div className="mt-8">
          <a
            href="/contacto/"
            className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Solicita tu diagnóstico gratuito
          </a>
        </div>
      </div>

      {/* Treatment preview — 2 columns like mimotbeauty */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 mt-16">
        <div className="border border-neutral-dark">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs tracking-[0.2em] uppercase text-muted">Tratamientos</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-light text-secondary italic tracking-wide">
                Facial, Corporal y Relax
              </h3>
              <p className="mt-4 text-sm text-muted leading-relaxed">
                Descubre cuál es el mejor tratamiento para ti o solicita un diagnóstico gratuito.
              </p>
              <div className="mt-6">
                <a
                  href="/servicios/"
                  className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Descúbrelos
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src="/images/services/masaje-tratamiento.webp"
                alt="Tratamientos faciales en Curated by AC"
                className="w-full h-[280px] md:h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
