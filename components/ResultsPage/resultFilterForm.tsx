import Image from "next/image";
import SelectResultCategory from "./SelectResultCategory";
import Modal from "../Popups/Modal";
import { useEffect, useState } from "react";
import { Result } from "./resultsTypes";
import { Participant, School } from "../../hooks/types";

interface ResultFilterProps {
  filters: Partial<Result>;
  updateFilter: (newValue: Partial<Result>) => void;
  schools: School[];
  names: Participant[];
  levels: number[];
  passed: boolean[];
}

const mobileFiltersClasses = "tablet:hidden bg-primary-white border-2 border-primary-black rounded-[9px] flex items-center p-[1.2rem] text-center [&_span]:flex-1 [&_span]:font-unbounded [&_span]:font-medium [&_span]:text-[1.5rem]";
const filtersClasses = "max-tablet:hidden tablet:flex";
const filterModalClasses = "bg-primary-light-blue border-2 border-primary-black rounded-[9px] p-[1.6rem] flex flex-col items-center mx-[2rem] gap-y-[2.4rem] w-full";
const closeClasses = "flex justify-end w-full";
const iconClasses = "w-[19px] h-[17px]";
const titleClasses = "-mt-[2.4rem] font-unbounded font-medium text-[1.8rem]";

const ResultFilterForm = ({
  filters,
  updateFilter,
  schools,
  names,
  levels,
  passed,
}: ResultFilterProps) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (!isMobile && openFilters) {
      setIsMobile(true);
    }
  }, [openFilters, isMobile]);
  return (
    <div>
      <div
        className={mobileFiltersClasses}
        onClick={() => setOpenFilters(true)}
      >
        <Image src="/images/filter.svg" width={24} height={24} alt="" />
        <span>Más filtros</span>
      </div>
      {!isMobile && (
        <form className={filtersClasses}>
          <SelectResultCategory
            category="Participante"
            value={filters.participante}
            setValue={(value?: Participant) =>
              updateFilter({ participante: value })
            }
            options={names}
            input={true}
          />
          <SelectResultCategory
            category="Colegio"
            value={filters.colegio}
            setValue={(value?: School) => updateFilter({ colegio: value })}
            options={schools}
            input={true}
          />
          <SelectResultCategory
            category="Nivel"
            value={filters.nivel}
            setValue={(value?: number) => updateFilter({ nivel: value })}
            options={levels}
            clear={true}
          />
          <SelectResultCategory
            category="Aprobado"
            value={filters.aprobado}
            setValue={(value?: boolean) => updateFilter({ aprobado: value })}
            options={passed}
            clear={true}
          />
        </form>
      )}
      {isMobile && (
        <Modal
          openModal={openFilters}
          closeModal={() => setOpenFilters(false)}
          className="m-auto bg-transparent"
        >
          <form className={filterModalClasses}>
            <div className={closeClasses}>
              <Image
                src="/images/x.svg"
                width={34}
                height={32}
                alt=""
                className={iconClasses}
                onClick={() => setOpenFilters(false)}
              />
            </div>
            <p className={titleClasses}>Más filtros</p>
            <SelectResultCategory
              category="Participante"
              value={filters.participante}
              setValue={(value?: Participant) =>
                updateFilter({ participante: value })
              }
              options={names}
              input={true}
            />
            <SelectResultCategory
              category="Colegio"
              value={filters.colegio}
              setValue={(value?: School) => updateFilter({ colegio: value })}
              options={schools}
              input={true}
            />
            <SelectResultCategory
              category="Nivel"
              value={filters.nivel}
              setValue={(value?: number) => updateFilter({ nivel: value })}
              options={levels}
              allOptions={[1, 2, 3]}
              buttons={true}
            />
            <SelectResultCategory
              category="Aprobado"
              value={filters.aprobado}
              setValue={(value?: boolean) => updateFilter({ aprobado: value })}
              options={passed}
              allOptions={[true, false]}
              buttons={true}
            />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ResultFilterForm;
