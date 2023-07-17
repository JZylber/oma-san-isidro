'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h1>UPS...</h1>
      <h2>¡Hubo un error!</h2>
      <p>Pedimos disculpas por las molestias ocasionadas, somos un grupo de voluntarios y tenemos tiempo limitado. El error fue enviado a nuestro equipo y lo vamos a arreglar en cuanto podamos.</p>
    </div>
  )
}