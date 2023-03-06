import { Dispatch, SetStateAction} from "react";
import {Swiper,SwiperProps, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './MonthSelect.module.scss'


interface MonthSelectProps {
    displayedMonth : number,
    setDisplayedMonth: Dispatch<SetStateAction<number>>;
}

const MonthSelect = ({displayedMonth,setDisplayedMonth}: MonthSelectProps) => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    const parameters : SwiperProps = {
        modules:[Navigation],
        navigation: true,
        slidesPerView : 3,
        loop:true,
        centeredSlides:true,
        initialSlide: displayedMonth,
        onSlideChange:(swiper) => {
            swiper.slides.forEach((slide,index) => {
                let element = slide.firstElementChild;
                if(index == swiper.activeIndex){
                    element?.classList.remove(styles.sideMonth)
                    element?.classList.add(styles.selectedMonth)
                } else {
                    element?.classList.add(styles.sideMonth)
                    element?.classList.remove(styles.selectedMonth)
                }
            })
            setDisplayedMonth(swiper.realIndex)
        },
        className:["mySwiper",styles.swiper].join(" ")
    }
    return(
        <div className={styles.container}>
        <Swiper {...parameters}>
            {months.map((month,idx) => 
                <SwiperSlide className={styles.swiper_slide} key={idx}>
                    <span className={styles.sideMonth}>{month}</span>
                </SwiperSlide>)}
        </Swiper>
        </div>)
}

export default MonthSelect