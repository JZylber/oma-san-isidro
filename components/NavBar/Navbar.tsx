"use client";
import { useEffect, useReducer, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import NavUserChip from "./UserChip";
import useSticky from "hooks/useSticky";

interface MenuItem {
  text: string;
}

interface SubItem extends MenuItem {
  link: string;
}

interface MainItem extends MenuItem {
  link?: string;
  defaultSubItem?: number;
  subItems: Array<SubItem>;
}

export type MenuHierarchy = Array<MainItem>;

const defaultMenuHierarchy: MenuHierarchy = [
  { text: "Inicio", link: "/", subItems: [] },
  {
    text: "Oma",
    link: "/oma",
    defaultSubItem: 0,
    subItems: [
      { text: "general", link: "/oma" },
      {
        text: "inscripción",
        link: "/oma/inscripcion",
      },
      {
        text: "autorización",
        link: "/oma/autorizacion",
      },
      {
        text: "instancias",
        link: "/oma/instancias",
      },
      {
        text: "reglamento",
        link: "/oma/reglamento",
      },
      {
        text: "resultados",
        link: "/oma/resultados",
      },
      {
        text: "problemas",
        link: "/oma/problemas",
      },
    ],
  },
  {
    text: "Ñandú",
    link: "/nandu",
    defaultSubItem: 0,
    subItems: [
      { text: "general", link: "/nandu" },
      {
        text: "inscripción",
        link: "/nandu/inscripcion",
      },
      {
        text: "autorización",
        link: "/nandu/autorizacion",
      },
      {
        text: "instancias",
        link: "/nandu/instancias",
      },
      {
        text: "reglamento",
        link: "/nandu/reglamento",
      },
      {
        text: "resultados",
        link: "/nandu/resultados",
      },
      {
        text: "problemas",
        link: "/nandu/problemas",
      },
    ],
  },
  {
    text: "Otros",
    subItems: [
      {
        text: "internacional",
        link: "/otros/internacional",
      },
      {
        text: "mateclubes",
        link: "/otros/mateclubes",
      },
      {
        text: "geometría",
        link: "/otros/geometria",
      },
      {
        text: "canguro",
        link: "/otros/canguro",
      },
      {
        text: "calendario",
        link: "/otros/calendario",
      },
      { text: "libros", link: "/otros/libros" },
    ],
  },
];

interface SelectMainItemAction {
  type: "selectMainItem";
  item: MainItem;
  index: number;
  selectDefaultSubitem: boolean;
}

interface SelectSubItemAction {
  type: "selectSubItem";
  item: SubItem;
  index: number;
}

interface UpdateOnCurrentPageAction {
  type: "currentPage";
  page: string;
}

interface DeselectMainItemAction {
  type: "deselectMainItem";
}

type MenuAction =
  | SelectMainItemAction
  | SelectSubItemAction
  | UpdateOnCurrentPageAction
  | DeselectMainItemAction;

interface MenuStatus {
  currentPage: string;
  mainItem?: number;
  subItem?: number;
}

const reduce = (status: MenuStatus, action: MenuAction) => {
  switch (action.type) {
    case "selectMainItem":
      return {
        currentPage: action.item.link?.toString() || status.currentPage,
        mainItem: action.index,
        subItem: action.selectDefaultSubitem
          ? action.item.defaultSubItem
          : undefined,
      };
    case "selectSubItem":
      return {
        currentPage: action.item.link,
        mainItem: status.mainItem,
        subItem: action.index,
      };
    case "currentPage":
      if (status.currentPage === action.page) return status;
      /* Find index in menu hierarchy */
      const mainItemIndex = defaultMenuHierarchy.findIndex(
        (item) => item.link === action.page
      );
      if (mainItemIndex >= 0) {
        return {
          currentPage: action.page,
          mainItem: mainItemIndex,
          subItem: defaultMenuHierarchy[mainItemIndex].defaultSubItem,
        };
      }
      /* Find index in subitems */
      const subItemIndex = defaultMenuHierarchy.reduce((acc, mainItem) => {
        if (acc !== -1) return acc;
        return mainItem.subItems.findIndex(
          (subItem) => subItem.link === action.page
        );
      }, -1);
      if (subItemIndex === -1) return status;
      return {
        currentPage: action.page,
        mainItem: defaultMenuHierarchy.findIndex((item) =>
          item.subItems.find((subItem) => subItem.link === action.page)
        ),
        subItem: subItemIndex,
      };
    case "deselectMainItem":
      return {
        currentPage: status.currentPage,
        mainItem: undefined,
        subItem: undefined,
      };
    default:
      return status;
  }
};

const capitalizeFirstLetter = (word: string) => {
  return word[0].toLocaleUpperCase() + word.slice(1);
};

const MobileNavItem = ({
  item,
  isSelected,
  selectedSubIndex,
  clickItem,
  clickSubitem,
}: {
  item: MainItem;
  isSelected: boolean;
  selectedSubIndex?: number;
  clickItem: () => void;
  clickSubitem: (item: SubItem, index: number) => void;
}) => {
  return (
    <div
      className={`px-[10%] transition-all ${isSelected && "bg-primary-white"}`}
    >
      <div
        className="flex justify-between items-center py-[1.6rem]"
        onClick={clickItem}
      >
        <span className="font-unbounded text-[3.6rem]">{item.text}</span>
        <Image
          src={"/images/menuArrow.svg"}
          alt="go to link"
          width={14}
          height={24}
          className={`transition-transform ${isSelected && "rotate-90"}`}
        />
      </div>
      <div
        className={`transition-all overflow-hidden font-unbounded ${
          isSelected ? "h-[var(--height)]" : "h-0"
        }`}
        style={
          {
            "--height": `calc(${item.subItems.length}*48px)`,
          } as React.CSSProperties
        }
      >
        {item.subItems.map((subItem, index) => {
          return (
            <div
              className="flex items-center h-[48px] text-desktop-reading"
              key={index}
            >
              <span
                className={`${
                  selectedSubIndex === index ? "font-medium" : "font-light"
                }`}
                onClick={() => clickSubitem(subItem, index)}
              >
                {capitalizeFirstLetter(subItem.text)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [navStatus, setNavStatus] = useReducer(reduce, {
    currentPage: "/",
    mainItem: 0,
  });
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [stickyRef, isSticky] = useSticky();
  useEffect(() => {
    if (!sideMenuOpen) setNavStatus({ type: "currentPage", page: pathname });
  }, [pathname, setNavStatus, sideMenuOpen]);
  const clickMainItem = (
    item: MainItem,
    index: number,
    selectDefaultSubitem: boolean = true
  ) => {
    setNavStatus({ type: "selectMainItem", item, index, selectDefaultSubitem });
    if (item.link) {
      if (!sideMenuOpen || item.subItems.length == 0) {
        setSideMenuOpen(false);
        router.push(item.link);
      }
    }
  };
  const clickSubItem = (item: SubItem, index: number) => {
    setNavStatus({ type: "selectSubItem", item, index });
    setSideMenuOpen(false);
    router.push(item.link);
  };
  const deselectMainItem = () => {
    setNavStatus({ type: "deselectMainItem" });
  };
  return (
    <>
      <nav
        ref={stickyRef}
        className="sticky top-0 tablet:static w-full flex flex-col z-100"
      >
        <div className="hidden tablet:flex justify-center border-b-2 border-primary-black h-[5.6rem] desktop:h-[8.8rem] tablet:bg-primary-light-blue pt-[.8rem] desktop:pt-[1.6rem] relative">
          <div className="w-[85%] grid grid-cols-4 desktop:w-4/5 desktop:grid-cols-5 max-w-[1200px] z-10">
            {defaultMenuHierarchy.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-t-[9px] flex justify-center items-center desktop:col-start-[var(--col)] cursor-pointer`}
                  style={
                    {
                      "--col": index == 0 ? 1 : index + 2,
                    } as React.CSSProperties
                  }
                  onClick={() => clickMainItem(item, index)}
                >
                  <span
                    className={`font-unbounded text-tablet-actionable desktop:text-desktop-actionable hover:font-semibold transition-[font-weight] ${
                      navStatus.mainItem == index ? "font-semibold" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
          <NavUserChip />
          <div
            className="absolute transition-all w-[85%] desktop:w-4/5 max-w-[1200px] grid grid-cols-[var(--left)_1fr_var(--right)] desktop:grid-cols-[var(--desktop-left)_1fr_var(--desktop-right)] h-[inherit] pt-[inherit] border-box top-0 "
            style={
              {
                "--left": `${navStatus.mainItem}fr`,
                "--desktop-left": `${
                  navStatus.mainItem == 0
                    ? navStatus.mainItem
                    : navStatus.mainItem !== undefined && navStatus.mainItem + 1
                }fr`,
                "--desktop-right": `${
                  navStatus.mainItem == 0
                    ? 5 - navStatus.mainItem - 1
                    : navStatus.mainItem !== undefined &&
                      4 - navStatus.mainItem - 1
                }fr`,
                "--right": `${
                  navStatus.mainItem !== undefined && 4 - navStatus.mainItem - 1
                }fr`,
              } as React.CSSProperties
            }
          >
            <div
              className={`bg-primary-white col-start-2 rounded-t-[9px] border-primary-black border-x-2 border-t-2 ${
                navStatus.mainItem !== undefined ? "" : "hidden"
              }`}
            ></div>
          </div>
        </div>
        <div className="hidden tablet:flex justify-center w-full">
          <div
            className={`flex w-[85%] h-[5.6rem] pt-[1.6rem] pb-[2.4rem] desktop:w-4/5 desktop:h-[12.8rem] max-w-[1200px] desktop:py-[4.8rem] transition-all divide-x-2 ${
              navStatus.mainItem === undefined ||
              defaultMenuHierarchy[navStatus.mainItem].subItems.length == 0
                ? "!h-0 !p-0"
                : ""
            }`}
          >
            {navStatus.mainItem !== undefined &&
              defaultMenuHierarchy[navStatus.mainItem].subItems.map(
                (subItem, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        clickSubItem(subItem, index);
                      }}
                      className="flex grow justify-center items-center"
                    >
                      <span
                        className={`cursor-pointer font-montserrat text-tablet-actionable desktop:text-desktop-reading hover:font-semibold desktop:hover:text-desktop-actionable transition-all duration-500 ${
                          navStatus.subItem == index ? "font-semibold" : ""
                        }`}
                      >
                        {subItem.text}
                      </span>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div
          className={`flex tablet:hidden px-[10%] py-[2.4rem] bg-primary-white z-100 ${
            isSticky ? "shadow-md" : ""
          }`}
        >
          <Image
            width={48}
            height={32}
            src={"/images/menuIcon.svg"}
            alt="menu"
            className="cursor-pointer"
            onClick={() => {
              setSideMenuOpen(true);
            }}
          />
        </div>
      </nav>
      <div
        className={`absolute top-0 left-0 overflow-y-scroll tablet:hidden min-h-screen w-screen bg-primary-light-blue z-10 flex flex-col transition-transform ${
          !sideMenuOpen && "-translate-x-full"
        }`}
      >
        <div className="pt-[2.4rem] px-[10%]">
          <Image
            src={"/images/x.svg"}
            alt="close menu"
            width={32}
            height={32}
            onClick={() => setSideMenuOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="px-[10%] py-[5.6rem]">
          <h1 className="font-unbounded text-[29.85vmin] leading-[30vmin] text-center">
            oma
          </h1>
          <h2 className="font-montserrat text-[17.3vmin] leading-[17.3vmin] tracking-tighter text-center -translate-y-6">
            San Isidro
          </h2>
        </div>
        <div className="flex flex-col border-y-2 border-primary-black divide-y-2 divide-primary-black">
          {defaultMenuHierarchy.map((item, index) => {
            return (
              <MobileNavItem
                key={index}
                item={item}
                isSelected={
                  index === navStatus.mainItem && item.subItems.length > 0
                }
                selectedSubIndex={
                  index === navStatus.mainItem ? navStatus.subItem : undefined
                }
                clickItem={() => {
                  if (
                    index === navStatus.mainItem &&
                    item.subItems.length > 0
                  ) {
                    deselectMainItem();
                  } else {
                    clickMainItem(item, index, false);
                  }
                }}
                clickSubitem={clickSubItem}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
