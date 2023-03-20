import { Dispatch, SetStateAction} from "react";
import {Swiper,SwiperProps, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper";
import NavArrow from "../../../public/images/menuArrow.svg"
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
        navigation: {
            prevEl: '.previous',
            nextEl: '.next',
        },
        slidesPerView : 3,
        loop:true,
        centeredSlides:true,
        initialSlide: displayedMonth,
        observer: true,
        observeParents: true,
        onActiveIndexChange: (swiper) =>{
            setDisplayedMonth(swiper.realIndex)
        },
        onBeforeTransitionStart: (swiper) => {
            swiper.slides.forEach((slide,index) => {
                let element = slide.firstElementChild;
                element?.classList.add(styles.sideMonth)
                element?.classList.remove(styles.selectedMonth)
            }) 
        },
        onTransitionStart : (swiper) => {
            let element = swiper.slides[swiper.activeIndex]?.firstElementChild
            element?.classList.remove(styles.sideMonth)
            element?.classList.add(styles.selectedMonth)
        },
        onTouchMove: (swiper,event) => {
            swiper.slides.forEach((slide,index) => {
                let element = slide.firstElementChild;
                element?.classList.add(styles.sideMonth)
                element?.classList.remove(styles.selectedMonth)
            }) 
        },
        onTap: (swiper,event) => {
            if(swiper.clickedIndex > swiper.activeIndex){
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        },
        className:["mySwiper",styles.swiper].join(" ")
    }
    return(
        <div className={styles.container}>
        <div className='previous' style={{transform: 'rotate(180deg)',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5rem',width:'2.5rem'}}><NavArrow/></div>
        <Swiper {...parameters}>    
            {months.map((month,idx) => 
                <SwiperSlide className={styles.swiper_slide} key={idx}>
                    <span className={[styles.sideMonth,styles.swiper_text_transition].join(" ")}>{month}</span>
                </SwiperSlide>)}
        </Swiper>
        <div className='next' style={{display:'flex',justifyContent:'center',alignItems:'center',height:'2.5rem',width:'2.5rem'}}><NavArrow/></div>
        </div>)
}

export default MonthSelect