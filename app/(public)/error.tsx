'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center pt-[2rem]">
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:calc(2.5*var(--mobile-spacing))] max-tablet:[margin-bottom:calc(1.5*var(--mobile-spacing))] tablet:text-[4.8rem] tablet:mb-[2.4rem]">UPS...</h1>
      <h2 className="font-unbounded font-medium max-desktop:text-[2.4rem] max-desktop:[margin-bottom:var(--mobile-spacing)] desktop:text-[3.4rem] desktop:mb-[2rem]">¡Hubo un error!</h2>
      <p className="font-montserrat font-light max-tablet:text-mobile-reading tablet:max-desktop:text-tablet-reading desktop:text-desktop-reading">Pedimos disculpas por las molestias ocasionadas, somos un grupo de voluntarios y tenemos tiempo limitado. El error fue enviado a nuestro equipo y lo vamos a arreglar en cuanto podamos.</p>
    </div>
  )
}