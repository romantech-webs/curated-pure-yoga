import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-6xl font-light text-primary">404</h1>
        <p className="mt-4 text-lg text-muted">Página no encontrada</p>
        <div className="mt-8">
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
