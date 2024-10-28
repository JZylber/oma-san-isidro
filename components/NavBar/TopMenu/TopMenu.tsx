import { Fragment } from "react";
import NavBarItem from "./NavBarItem";
import styles from "./TopMenu.module.scss";
import { MenuHierarchy, menuItem } from "../Navbar";

type topMenuProps = {
  menuHierarchy: MenuHierarchy;
  onMainItemClick: (itemName: string) => void;
};

const TopMenu = ({ menuHierarchy, onMainItemClick }: topMenuProps) => {
  //const [hovered,setHovered] = useState<number>()

  //Renderizado de cada item del menu
  const renderMenuItem = (item: menuItem, position: number) => {
    return (
      <Fragment key={position}>
        {position == 1 && (
          <NavBarItem text={""} phantom={true} selected={false} key="phantom" />
        )}
        <NavBarItem
          text={item.text}
          link={item.link}
          selected={item.selected}
          onClick={() => onMainItemClick(item.text)}
          key={item.text}
        />
      </Fragment>
    );
  };

  return (
    <div className={styles.menu_bar}>{menuHierarchy.map(renderMenuItem)}</div>
  );
};

export default TopMenu;
