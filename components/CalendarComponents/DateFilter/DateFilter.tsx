import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DateFilterProps{
    availableCategories: string [],
    categories: string [],
    setCategories: Dispatch<SetStateAction<string []>>
}

const chipClasses = "font-unbounded font-medium flex items-center justify-center border-2 border-primary-black bg-primary-light-blue box-border rounded-[9px] uppercase max-tablet:h-[4rem] max-tablet:px-[1.2rem] max-tablet:text-mobile-actionable max-tablet:mr-[1.6rem] max-tablet:mb-[.8rem] tablet:max-desktop:h-[4rem] tablet:max-desktop:px-[1.5rem] tablet:max-desktop:text-tablet-actionable tablet:max-desktop:my-[.4rem] tablet:max-desktop:mr-[1rem] desktop:h-[3rem] desktop:px-[2rem] desktop:text-[1.2rem] desktop:my-[.4rem] desktop:mr-[1.6rem]";

const DateFilter = ({availableCategories,categories,setCategories}:DateFilterProps) => {
    const [canOpen,setCanOpen] = useState(false)
    const toggleFilter = () => {
        setCanOpen(!canOpen)
    }
    const useOutsideAlerter = (ref : RefObject<HTMLDivElement>) => {
        useEffect(() => {
          const handleClickOutside = (event : MouseEvent) => {
            const target = event.target && event.target as Node
            if (ref.current && !ref.current.contains(target)) {
              setCanOpen(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);
    const addFilter = (category: string) => {
        setCategories([...categories,category]);
        setCanOpen(false);
    }
    const clearFilters = () => {
        setCategories([]);
    }
    const isOpen = canOpen && (availableCategories.length - categories.length > 0);
    const unSelectedFilters = availableCategories.filter((category) => !categories.includes(category));
  return (
    <div className="[&_*]:cursor-pointer tablet:max-desktop:grid tablet:max-desktop:grid-cols-8 tablet:max-desktop:[column-gap:calc(2.5*var(--tablet-x-spacing))] desktop:flex">
      <div className="tablet:max-desktop:relative tablet:max-desktop:min-h-[6.4rem] tablet:max-desktop:col-start-1 tablet:max-desktop:col-end-5 desktop:relative desktop:min-h-[5.5rem] desktop:min-w-[calc(33%-2rem)]">
        <div className="border-2 border-primary-black rounded-[9px] max-tablet:font-unbounded max-tablet:font-medium max-tablet:text-mobile-actionable tablet:font-unbounded tablet:font-normal tablet:text-tablet-reading tablet:absolute tablet:w-full tablet:z-[1] tablet:bg-primary-white desktop:text-desktop-reading desktop:absolute desktop:w-full desktop:z-[1] desktop:bg-primary-white" ref={wrapperRef}>
          <div onClick={toggleFilter} className={`font-unbounded font-medium text-[1.6rem] pr-[3.2rem] pl-[2rem] flex items-center justify-between pt-[1rem] pb-[1rem] box-border tablet:max-desktop:pt-[1.5rem] tablet:max-desktop:pb-[1.5rem] tablet:max-desktop:max-h-[6rem] desktop:pt-[1.5rem] desktop:pb-[1.5rem] desktop:max-h-[7.2rem]${isOpen ? " border-b-2 border-primary-black" : ""}`}>
            <div className="flex"><Image src="/images/filter.svg" width={24} height={24} alt="" /></div>
            <span>Filtrar</span>
            <div className="flex"><Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" /></div>
          </div>
          {isOpen &&
              <ul className="list-none shrink overflow-y-scroll max-h-[22.4rem] max-desktop:[scrollbar-width:none] max-desktop:[-ms-overflow-style:none] max-desktop:[&::-webkit-scrollbar]:hidden">
                  {unSelectedFilters.map((category,idx) => (
                    <li onClick={() => addFilter(category)} className="font-unbounded font-medium text-[1.6rem] pr-[3.2rem] pl-[6.8rem] flex items-center [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-b-primary-black h-[6.4rem] box-border" key={idx}>
                      <span>{category}</span>
                    </li>
                  ))}
              </ul>}
        </div>
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center max-tablet:mt-[3.2rem] tablet:max-desktop:col-start-5 tablet:max-desktop:col-end-[-1] tablet:max-desktop:text-tablet-actionable desktop:text-desktop-actionable desktop:ml-[2rem]">
          <div onClick={clearFilters} className={`${chipClasses} bg-primary-black text-primary-white w-[4rem]`}><span>X</span></div>
          {categories.map((category,idx) => (
            <div className={chipClasses} key={idx}><span>{category}</span></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateFilter;
