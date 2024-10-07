import Checkbox from "components/common/form/CheckBox";
import WizardForm from "./wizardForm";
import { WizardStateProps } from "./wizardModal";
import { useReducer } from "react";

const defaultValues = (value?: string): [boolean, boolean, string | null] => {
  switch (value?.toString().toLocaleLowerCase()) {
    case "aprobado":
      return [true, true, null];
    case "no aprobado":
      return [false, true, null];
    case "ausente":
      return [false, false, null];
    case "si":
      return [true, true, null];
    case "sí":
      return [true, true, null];
    case "no":
      return [false, true, null];
    default:
      return [false, false, null];
  }
};

const resultInterpretationFields = (
  result: Result,
  index: number,
  setResult: (key: keyof Result, value: boolean | string | null) => void
) => {
  const { value, approved, present, clarification } = result;
  return (
    <tr key={index} className="text-2xl">
      <td className="py-2">{value !== undefined ? value : "(vacío)"}</td>
      <td className="py-2">
        <div className="flex justify-center">
          <Checkbox
            key={index}
            defaultChecked={approved}
            onChange={(e) => {
              setResult("approved", e.target.checked);
            }}
            width={24}
            height={24}
          />
        </div>
      </td>
      <td className="py-2 text-center">
        <div className="flex justify-center">
          <Checkbox
            key={index}
            defaultChecked={present}
            onChange={(e) => {
              setResult("present", e.target.checked);
            }}
            width={24}
            height={24}
          />
        </div>
      </td>
      <td className="py-2 text-center">
        <input
          type="text"
          defaultValue={clarification ? clarification : ""}
          className="bg-primary-white font-montserrat border-2 border-primary-black rounded-xl text-2xl"
          onChange={(e) => {
            setResult(
              "clarification",
              e.target.value === "" ? null : e.target.value
            );
          }}
        />
      </td>
    </tr>
  );
};

interface Result {
  value: any;
  approved: boolean;
  present: boolean;
  clarification: string | null;
}

interface UpdateResultAction {
  type: "UPDATE_RESULT";
  payload: {
    value: string | undefined;
    field: {
      fieldName: keyof Result;
      fieldValue: boolean | string | null;
    };
  };
}

const resultReducer = (state: Result[], action: UpdateResultAction) => {
  switch (action.type) {
    case "UPDATE_RESULT":
      const { value, field } = action.payload;
      const { fieldName, fieldValue } = field;
      return state.map((result) => {
        if (result.value === value) {
          return {
            ...result,
            [fieldName]: fieldValue,
          };
        }
        return result;
      });
    default:
      return state;
  }
};

const ColumnInterpretation = ({
  data,
  nextStep,
  previousStep,
  numberOfStates,
  currentStepIndex,
}: WizardStateProps) => {
  const { newResults } = data!;
  const resultValues: (string | undefined)[] = Array.from(
    newResults.reduce((acc, result) => {
      acc.add(result.result);
      return acc;
    }, new Set<string | undefined>())
  );
  const [results, dispatch] = useReducer(
    resultReducer,
    resultValues.map((value) => {
      const [approved, present, clarification] = defaultValues(value);
      return {
        value,
        approved,
        present,
        clarification,
      };
    })
  );
  return (
    <WizardForm
      nextStep={(e) => {}}
      previousStep={previousStep}
      numberOfStates={numberOfStates}
      currentStepIndex={currentStepIndex}
    >
      <div className="px-8 flex flex-col gap-y-4">
        {" "}
        <h3 className="font-unbounded text-3xl">RESULTADOS</h3>
        <p className="font-montserrat text-2xl">
          ¿Cómo se interpreta la columna de resultados?
        </p>
        <div>
          <table className="font-montserrat border-collapse w-2/3">
            <thead className="border-b-2 border-primary-black text-2xl font-bold">
              <tr>
                <th className="px-4 py-2">Resultado</th>
                <th className="px-4 py-2">Aprobado</th>
                <th className="px-4 py-2">Presente</th>
                <th className="px-4 py-2">Aclaración</th>
              </tr>
            </thead>
            <tbody>
              {results.map((value, index) => {
                return resultInterpretationFields(
                  value,
                  index,
                  (key, fieldValue) => {
                    dispatch({
                      type: "UPDATE_RESULT",
                      payload: {
                        value: value.value,
                        field: {
                          fieldName: key,
                          fieldValue: fieldValue,
                        },
                      },
                    });
                  }
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </WizardForm>
  );
};

export default ColumnInterpretation;
