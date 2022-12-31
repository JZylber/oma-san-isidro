import { NextPage } from "next";
import X from '../img/x.svg';
import MenuArrow from '../img/menuArrow.svg';
import styles from './styles/mobile-menu.module.scss';
import { useRouter } from 'next/router'
import { useState } from "react";

interface menuItem{
    text: string,
    link: string | null,
    selected : boolean
    subItems: Array<menuItem>
}

const MobileMenu: NextPage = () => {
    const router = useRouter()
    //Array con la información del menu
    const menuHierarchy : Array<menuItem> = [
        {text: "Inicio",link:"/",selected : false,subItems:[]},
        {text: "Oma",link:null,selected : false,subItems:[
            {text: "Autorización",link:'/oma/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:null,selected : false,subItems:[]},
            {text: "Reglamento",link:null,selected : false,subItems:[]},
            {text: "Sedes",link:null,selected : false,subItems:[]},
            {text: "Resultados",link:null,selected : false,subItems:[]},
            {text: "Problemas",link:null,selected : false,subItems:[]}
        ]},
        {text: "Ñandú",link:null,selected : false,subItems:[
            {text: "Autorización",link:'/nandu/autorizacion',selected : false,subItems:[]},
            {text: "Inscripción",link:null,selected : false,subItems:[]},
            {text: "Reglamento",link:null,selected : false,subItems:[]},
            {text: "Sedes",link:null,selected : false,subItems:[]},
            {text: "Resultados",link:null,selected : false,subItems:[]},
            {text: "Problemas",link:null,selected : false,subItems:[]}
        ]},
        {text: "Internacional",link:"/",selected : false,subItems:[]},
    ]
    const [hierarchy,setHierarchy] = useState(menuHierarchy);

    //Rutina para ir al link de un item correspondiente o abrir/cerrar su submenu
    const selectMainItem = (name : string) => {
        let newHierarchy : Array<menuItem> = hierarchy.map((item) => {
            if (item.text == name){
                if(item.link != null){
                    router.push(item.link);
                } 
                let newItem : menuItem = item;
                newItem.selected = !newItem.selected;
                return(newItem);
            } else {
                let newItem : menuItem = item;
                newItem.selected = false;
                return(newItem);
            }
        })
        setHierarchy(newHierarchy);
    }
    //Rutina para ir al link de un subitem correspondiente
    const selectSubItem = (mainItem: string, subItem: string) => {
        let item : menuItem | undefined = hierarchy.find((menuItem) => menuItem.text == mainItem);
        if(item){
            let selectedSubitem : menuItem | undefined = item.subItems.find((menuSubItem) => menuSubItem.text == subItem)
            if(selectedSubitem){
                if(selectedSubitem.link){
                    router.push(selectedSubitem.link)
                }
            }
        }
        
    } 

    //Renderizado de cada item del menu
    const renderMenuItem = (item : menuItem) => {
        return(
        <div className={`${styles.item} ${item.selected ? styles.selected : ""}`}>
            <div className={styles.mainItem} onClick={() => selectMainItem(item.text)}>
                <h4>{item.text}</h4>
                <MenuArrow/>
            </div>
            <ul>
                {item.subItems.map((subitem) => {
                    return(<li className={`${subitem.selected ? styles.selectedSubItem : ""}`}  onClick={() => selectSubItem(item.text,subitem.text)}>{subitem.text}</li>)
                })}
            </ul>
        </div>
        
        )
    }

    return (
    <main className={styles.menu}>
        <div className={styles.top}>
            <X onClick={() => router.back()}/>
            <h1>oma</h1>
            <h2>San Isidro</h2>
        </div>
        <div className={styles.menuItems}>
            {hierarchy.map((mainItem) => {return(
                renderMenuItem(mainItem)
            )})}
        </div>
    </main>)
}

export default MobileMenu