'use client'
import Layout from "../../../../components/Layout/Layout";
import styles from "./Canguro.module.scss";
import { Button } from "../../../../components/buttons/Button";
import Image from "next/image";

interface Medals{
    ORO: string;
    PLATA: string;
    BRONCE: string;
}

interface Category{
    categoria: string;
    link: string;
    medallas: Medals;
}

const categories : Category [] = [
    {categoria: "Pequeños",link: "/files/canguro/Pequeños 2023.pdf",medallas: {ORO: "+73",PLATA: "62-72",BRONCE: "51-61"}},
    {categoria: "Escolar",link: "/files/canguro/Escolar 2023.pdf",medallas: {ORO: "+59",PLATA: "47-58",BRONCE: "37-46"}},
    {categoria: "Benjamín",link: "/files/canguro/Benjamín 2023.pdf",medallas: {ORO: "+63",PLATA: "48-62",BRONCE: "37-47"}},
    {categoria: "Cadete",link: "/files/canguro/Cadete 2023.pdf",medallas: {ORO: "+57",PLATA: "43-56",BRONCE: "33-42"}},
    {categoria: "Juvenil",link: "/files/canguro/Juvenil 2023.pdf",medallas: {ORO: "+52",PLATA: "38-51",BRONCE: "28-37"}},
]

const KangarooPage = () => {
    return(
        <>
            <h1 className={styles.title}>Canguro Matemático</h1>
            {/*<div className={styles.button_container}>
                <Button content="Resultados" onClick={() => window.location.href = "https://www.oma.org.ar/canguro/editar.html"}>
                    <Image src="/images/newsArrow.svg" alt="" width={30} height={30} className={styles.arrow} />
                </Button>
                <p>Si no recuerda el id puede buscarlo <a href="https://www.oma.org.ar/canguro/buscador.html">https://www.oma.org.ar/canguro/buscador.html</a> poniendo parte del nombre del colegio.</p>
            </div>
            <p className={styles.main_text}>El nombre del alumno que aparece en la pantalla es el que será usado para los diplomas de las medallas. Por favor chequear el nombre del alumno y en caso de ser necesario, corregirlo antes del 11 de mayo.</p>
            <section className={styles.problems}>
                    <h2 className={styles.section_title}>Problemas</h2>
                    <div className={styles.links}>
                        {categories.map((category,i) => {
                            return(<a href={category.link} key={i} className={styles.link}>{category.categoria}</a>)})}
                    </div>
            </section>
            <section className={styles.problems}>
                    <h2 className={styles.section_title}>Resultados</h2>
                    <div className={styles.links}>
                        <a href="/files/canguro/Respuestas Canguro 2023.docx"  className={styles.link}>Todas las categorías</a>
                    </div>
            </section>
            <section>
                <h2 className={styles.section_title}>Medallas</h2>
                <div className={styles.category_medals}>
                {categories.map((category,i) => {
                    return(
                        <div key={i} className={styles.medals}>
                            <h3 className={styles.category}>{category.categoria}</h3>
                            <ul>
                                <li className={styles.medal}><span className={styles.medal_type}>Oro:</span> {category.medallas.ORO}</li>
                                <li className={styles.medal}><span className={styles.medal_type}>Plata:</span> {category.medallas.PLATA}</li>
                                <li className={styles.medal}><span className={styles.medal_type}>Bronce:</span> {category.medallas.BRONCE}</li>
                            </ul>
                        </div>
                                
                    )
                })}
                </div>
            </section>*/}
            <section className={styles.problems}>
                    <h2 className={styles.section_title}>21/3 a 14hs</h2>
                    <p className={styles.main_text}>Este año es SIN COSTO.</p>
                    <p className={styles.main_text}>Para inscribirse y más información, pueden ir a <a href="https://www.oma.org.ar/canguro">https://www.oma.org.ar/canguro</a></p>
            </section>
        </>        
    )
}

export default KangarooPage