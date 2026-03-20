import { Hero } from '@/components/sections/Hero'
import { CategoryHeroes } from '@/components/sections/CategoryHeroes'
import { TopSellers } from '@/components/sections/TopSellers'
import { Reviews } from '@/components/sections/Reviews'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryHeroes />
      <TopSellers />
      <Reviews />
      <Contact />
    </>
  )
}
