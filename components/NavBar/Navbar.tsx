"use client";
import { useEffect, useReducer } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavUserChip from "./TopMenu/UserChip";

type NavProps = {
  togglePageContent: () => void;
};

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

interface ClickMainItemAction {
  type: "selectMainItem";
  item: MainItem;
  index: number;
}

interface ClickSubItemAction {
  type: "selectSubItem";
  item: SubItem;
  index: number;
}

interface UpdateOnCurrentPageAction {
  type: "currentPage";
  page: string;
}

type MenuAction =
  | ClickMainItemAction
  | ClickSubItemAction
  | UpdateOnCurrentPageAction;

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
        subItem: action.item.defaultSubItem,
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
    default:
      return status;
  }
};

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [navStatus, setNavStatus] = useReducer(reduce, {
    currentPage: "/",
    mainItem: 0,
  });
  useEffect(() => {
    setNavStatus({ type: "currentPage", page: pathname });
  }, [pathname]);
  const clickMainItem = (item: MainItem, index: number) => {
    setNavStatus({ type: "selectMainItem", item, index });
    if (item.link) {
      router.push(item.link);
    }
  };
  const clickSubItem = (item: SubItem, index: number) => {
    setNavStatus({ type: "selectSubItem", item, index });
    router.push(item.link);
  };

  return (
    <nav className="w-full flex flex-col">
      <div className="hidden tablet:flex justify-center border-b-2 border-primary-black h-[5.6rem] desktop:h-[8.8rem] tablet:bg-primary-light-blue pt-[.8rem] desktop:pt-[1.6rem] relative">
        <div className="w-[85%] grid grid-cols-4 desktop:w-4/5 desktop:grid-cols-5 max-w-[1200px] z-10">
          {defaultMenuHierarchy.map((item, index) => {
            return (
              <div
                key={index}
                className={`rounded-t-[9px] flex justify-center items-center desktop:col-start-[var(--col)] cursor-pointer`}
                style={
                  { "--col": index == 0 ? 1 : index + 2 } as React.CSSProperties
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
      <div className="flex justify-center w-full">
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
    </nav>
  );
}
