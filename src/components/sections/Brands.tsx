export function Brands() {
  return (
    <section className="py-14 md:py-20 bg-[#414141]">
      <div className="mx-auto max-w-5xl px-5 md:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">
          CONTAMOS CON LOS MEJORES
        </h2>
        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-lg mx-auto">
          Nos apoyamos en las marcas más prestigiosas de productos de belleza y estética,
          acompañada de la tecnología más innovadora y avanzada del mercado.
        </p>

        {/* Brand logos */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          <div className="text-white/70 font-display text-2xl md:text-3xl font-light tracking-wider">
            BIOLOGIQUE RECHERCHE
          </div>
          <div className="text-white/70 font-display text-2xl md:text-3xl font-light tracking-wider italic">
            Medical Grade
          </div>
        </div>
      </div>
    </section>
  )
}
