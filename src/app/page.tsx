import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Team } from '@/components/sections/Team'
import { Reviews } from '@/components/sections/Reviews'
import { Gallery } from '@/components/sections/Gallery'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Team />
      <Reviews />
      <Gallery />
      <FAQ />
      <CTA />
      <Contact />
    </>
  )
}
