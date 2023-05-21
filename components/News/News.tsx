import NewsItem from "./NewsItem";
import { NewsItemData } from "./NewsTypes";

export default function News({newsData}:{newsData:NewsItemData[]}){
    const env = process.env.NODE_ENV;
    const vercel_env = process.env.VERCEL_ENV;
    console.log(env,vercel_env,process.env.VERCEL);
    let newsToDisplay = newsData;
    if(env === "production" && (vercel_env?vercel_env === "production":true)){
        newsToDisplay = newsToDisplay.filter((newsItemData) => newsItemData.visible);
    }
    newsToDisplay = newsToDisplay.slice(0, 3);
    return(
    <div>
        {newsToDisplay.map((newsItemData,index) => <NewsItem content={newsItemData.titulo} link={newsItemData.link} key={index}></NewsItem>)}
    </div>
    )
}