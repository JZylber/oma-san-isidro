import styles from "./resultFilterForm.module.scss";
import SelectResultCategory from "./SelectResultCategory";
import FilterIcon from "../../public/images/filter.svg";
import X from "../../public/images/x.svg";
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
    <div className={styles.container}>
      <div
        className={styles.mobile_filters}
        onClick={() => setOpenFilters(true)}
      >
        <FilterIcon />
        <span>Más filtros</span>
      </div>
      {!isMobile && (
        <form className={styles.filters}>
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
        <Modal openModal={openFilters} closeModal={() => setOpenFilters(false)}>
          <form className={styles.filter_modal}>
            <div className={styles.close}>
              <X
                className={styles.icon}
                onClick={() => setOpenFilters(false)}
              />
            </div>
            <p className={styles.title}>Más filtros</p>
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
