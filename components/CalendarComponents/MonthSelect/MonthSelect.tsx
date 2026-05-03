import { Dispatch, SetStateAction} from "react";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper";
import Image from "next/image";
import 'swiper/scss';
import 'swiper/scss/navigation';
import styles from './MonthSelect.module.css'

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
        centeredSlides:true,
        initialSlide: displayedMonth,
        observer: true,
        observeParents: true,
        onActiveIndexChange: (swiper) =>{
            setDisplayedMonth(swiper.realIndex)
        },
        onBeforeTransitionStart: (swiper) => {
            swiper.slides.forEach((slide) => {
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
        onTouchMove: (swiper) => {
            swiper.slides.forEach((slide) => {
                let element = slide.firstElementChild;
                element?.classList.add(styles.sideMonth)
                element?.classList.remove(styles.selectedMonth)
            })
        },
        onTap: (swiper) => {
            if(swiper.clickedIndex > swiper.activeIndex){
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        },
        className: ["mySwiper", "w-full h-full"].join(" ")
    }
    return(
        <div className="my-[3.2rem] max-tablet:flex max-tablet:items-center tablet:hidden">
            <div className='previous' style={{transform: 'rotate(180deg)',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5rem',width:'2.5rem'}}>
                <Image src="/images/menuArrow.svg" width={14} height={25} alt="" />
            </div>
            <Swiper {...parameters}>
                {months.map((month,idx) =>
                    <SwiperSlide className="flex justify-center items-end h-auto" key={idx}>
                        <span className={[styles.sideMonth, styles.swiper_text_transition].join(" ")}>{month}</span>
                    </SwiperSlide>)}
            </Swiper>
            <div className='next' style={{display:'flex',justifyContent:'center',alignItems:'center',height:'2.5rem',width:'2.5rem'}}>
                <Image src="/images/menuArrow.svg" width={14} height={25} alt="" />
            </div>
        </div>
    )
}

export default MonthSelect
