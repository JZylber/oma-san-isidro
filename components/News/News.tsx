import { useRouter } from "next/router";
import NewsItem from "./NewsItem";

export default function News(){
    return(
    <div>
        <NewsItem content="Aprobados Nacional Ñandú" link={"/"}></NewsItem>
        <NewsItem content="Aprobados Nacional OMA" link={"/oma/resultados?año=2022&instancia=NACIONAL"}></NewsItem>
        <NewsItem content="Sedes 2023" link={"/"}></NewsItem>
    </div>
    )
}