import NewsItem from "./NewsItem";
import { NewsItemData } from "./NewsTypes";

export default function News({newsData}:{newsData:NewsItemData[]}){
    const newsToDisplay = newsData.slice(newsData.length - 3, newsData.length);
    return(
    <div>
        {newsToDisplay.map((newsItemData,index) => <NewsItem content={newsItemData.title} link={newsItemData.link} key={index}></NewsItem>)}
    </div>
    )
}