export type menuItem = {
    text: string,
    link?: string,
    selected : boolean
    subItems: Array<menuItem>
}

export type MenuHierarchy = Array<menuItem>;

//Rutina que refleja la página actual
export const showCurrentPageSelected = (menuComponents : Array<menuItem>,currentRoute:string) => {
    let newHierarchy : Array<menuItem> = menuComponents.map((item : menuItem) => {
        let subitemSelected = item.subItems.find((subitem) => subitem.link == currentRoute);
        if(subitemSelected){
            let newItem : menuItem = {...item,selected: true};
            newItem.subItems = newItem.subItems.map((subitem) => {
                if(subitem === subitemSelected){
                    let newSubitem :  menuItem = {...subitem,selected:true};
                    return newSubitem;
                } else {
                    return subitem;
                }
            })
            return(newItem)
        }else{
            if(item.link == currentRoute){
                let newItem = {...item,selected:true}
                return(newItem);
            } else {
                return(item);
            };
        }
    })
    return newHierarchy;
}