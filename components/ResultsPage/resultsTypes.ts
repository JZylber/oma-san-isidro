import { INSTANCIA } from "@prisma/client";
import { FilterObject, Participant, Problems, School } from "../../hooks/types";

export interface InstanceData {
  nombre: string;
  disponible: boolean;
}

export interface yearTests {
  ano: number;
  pruebas: Array<InstanceData>;
}

export type ResultProps = {
  competition: string;
  availableResults: Array<yearTests>;
};

export type FilterData = {
  name: string;
  type: string;
  options?: Array<string> | Array<number>;
};

export interface TestQueryResults {
  prueba: {
    cantidad_problemas: number;
  };
  presente: boolean;
  aprobado: boolean;
  aclaracion?: string;
  resultados: Array<string>;
  participacion: {
    nivel: number;
    colegio: {
      nombre: string;
      sede: string;
    };
    participante: {
      nombre: string;
      apellido: string;
    };
  };
}

export interface Result extends FilterObject {
  cantidad_problemas: number;
  presente: boolean;
  aprobado: boolean;
  aclaracion: string;
  resultados: Problems;
  nivel: number;
  colegio: School;
  participante: Participant;
}

export interface OptionFilterProps {
  values: Array<string>;
  category_name: string;
  update_filter: (newValue: Array<string>) => void;
  includeSearchBar?: boolean;
}

export interface TypedFilterProps {
  values: Array<string>;
  category_name: string;
  update_filter: (newValue: string) => void;
}

export interface TestInfo {
  competencia: string;
  instancia: INSTANCIA;
  año: number;
}
