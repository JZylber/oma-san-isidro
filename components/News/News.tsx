import NewsItem from "./NewsItem";
import { NewsItemData } from "./NewsTypes";
import styles from "./NewsItem.module.scss";

export default function News({newsData}:{newsData:NewsItemData[]}){
    const now = new Date();
    const daysApart = 45;
    const newsToDisplay = newsData.slice(0, 3).filter((newsItemData) => newsItemData.agregado.getTime() >= now.getTime() - 1000*60*60*24*daysApart);
    const newsAvailable : boolean = newsToDisplay.length > 0;
    return(
    <div>
        {newsAvailable ?
        newsToDisplay.map((newsItemData,index) => <NewsItem content={newsItemData.titulo} link={newsItemData.link} key={index}></NewsItem>):
        <div className={styles.noNews}> No hay novedades </div>}
    </div>
    )
}