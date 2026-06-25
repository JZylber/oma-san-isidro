import FaqItem from './FaqItem'

export default function Faq() {
  return (
    <div className="border-2 border-black rounded-[9px] text-left flex flex-wrap mt-[1.6rem] px-[1.6rem] py-[2.4rem] mb-[5.6rem] justify-around tablet:mb-0 tablet:justify-start">
      <FaqItem question='¿Qué son las Olimpíadas?' answer='Es una competencia en la que se resuelven problemas de matemática usando mucho sentido común y un poco de la matemática escolar elemental.' />
      <FaqItem question='¿OMA o Ñandú?' answer='OMA es para 2°, 3°, 4°, 5°, 6° y 7° (colegios técnicos) secundario. Ñandú es para 5° y 6° primario y 1° secundario.' />
      <FaqItem question='¿Cómo funciona?' answer='Son cinco rondas (Escolar, Intercolegial, Zonal, Regional y Nacional). Para pasar de una a otra tenés que hacer bien, por lo menos, dos de los tres problemas que te dan. También podes viajar a las Olimpíadas Provinciales si cumplis con los requisitos.' />
      <FaqItem question='¿Qué partidos forman parte de la región?' answer='La secretaría regional San Isidro comprende los partidos de Vicente López, San Isidro, San Fernando, Don Torcuato, Tigre, Malvinas Argentinas, San Miguel y José C.Paz.' />
      <FaqItem question='¿Es obligatoria?' answer='¡No! La participación es voluntaria y se puede hacer a través de tu colegio o individualmente.' />
      <FaqItem question='¿Y las charito?' answer='Las rondas charito no son parte de la OMA. Nosotros no las organizamos.' />
    </div>
  )
}
