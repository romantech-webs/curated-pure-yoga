import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/sections/ValueProp'
import { CategoryGrid } from '@/components/sections/CategoryGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { TopSellers } from '@/components/sections/TopSellers'
import { Reviews } from '@/components/sections/Reviews'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <CategoryGrid />
      <WhyUs />
      <TopSellers />
      <Reviews />
      <Contact />
    </>
  )
}
