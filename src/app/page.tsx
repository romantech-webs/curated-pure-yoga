import type { Metadata } from 'next'
import { config } from '@/lib/config'
import { createFAQSchema } from '@/lib/schemas'
import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/sections/ValueProp'
import { CategoryGrid } from '@/components/sections/CategoryGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { TopSellers } from '@/components/sections/TopSellers'
import { Reviews } from '@/components/sections/Reviews'
import { FAQ } from '@/components/sections/FAQ'
import { Newsletter } from '@/components/sections/Newsletter'
import { Brands } from '@/components/sections/Brands'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://curatedbyac.com/',
  },
}

export default function HomePage() {
  const faqSchema = createFAQSchema(config.faq)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <ValueProp />
      <CategoryGrid />
      <WhyUs />
      <TopSellers />
      <Reviews />
      <FAQ />
      <Newsletter />
      <Brands />
      <Contact />
    </>
  )
}
