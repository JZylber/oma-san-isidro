import Checkbox from "components/common/form/CheckBox";
import Select from "components/common/form/Select";
import { parseCriteria } from "server/routers/results/qualification/criteria";
import {
  CRITERION_TYPES,
  CriterionDescriptor,
} from "server/routers/results/qualification/types";

const labelClasses = "font-montserrat text-2xl font-semibold";
const fieldLabelClasses = "font-montserrat text-2xl";
const inputClasses =
  "bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl w-32";

/**
 * Editor del criterio de habilitación: un descriptor por nivel, indexado por
 * nivel - 1, que es exactamente el arreglo que lee parseQualificationCriteria.
 *
 * El check de arriba mantiene la diferencia entre "sin criterio" (null, que es
 * lo normal salvo en Provincial) y un criterio explícito. Sin él, abrir y
 * guardar cualquier prueba llenaría la columna con el criterio por defecto.
 */
const CriteriaEditor = ({
  value,
  onChange,
}: {
  value: CriterionDescriptor[] | null;
  onChange: (criteria: CriterionDescriptor[] | null) => void;
}) => {
  // parseCriteria completa los niveles faltantes y traduce el formato viejo
  // (un número pelado equivale a PUNTOS).
  const criteria = parseCriteria(value);
  const updateLevel = (index: number, criterion: CriterionDescriptor) => {
    onChange(criteria.map((old, i) => (i === index ? criterion : old)));
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between py-2">
        <label className={labelClasses}>Criterio de habilitación</label>
        <Checkbox
          checked={value !== null}
          onChange={(e) => onChange(e.target.checked ? criteria : null)}
          width={24}
          height={24}
        />
      </div>
      {value !== null &&
        criteria.map((criterion, index) => (
          <div className="flex items-end gap-x-4" key={index}>
            <Select
              label={`Nivel ${index + 1}`}
              options={[...CRITERION_TYPES]}
              value={criterion.tipo}
              onChange={(tipo) => updateLevel(index, { ...criterion, tipo })}
            />
            <div className="flex flex-col gap-y-2">
              <label className={fieldLabelClasses}>Puntos</label>
              <input
                type="number"
                min={0}
                value={criterion.puntos}
                onChange={(e) =>
                  updateLevel(index, {
                    ...criterion,
                    puntos: Number(e.target.value),
                  })
                }
                className={inputClasses}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CriteriaEditor;
