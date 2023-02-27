import NewsItem from "./NewsItem";
import { NewsItemData } from "./NewsTypes";

export default function News({newsData}:{newsData:NewsItemData[]}){
    const newsToDisplay = newsData.slice(0, 3);
    return(
    <div>
        {newsToDisplay.map((newsItemData,index) => <NewsItem content={newsItemData.titulo} link={newsItemData.link} key={index}></NewsItem>)}
    </div>
    )
}