import styles from "./Instance.module.scss";
import { INSTANCIA } from "@prisma/client";
import VenueInfo from "./VenueInfo";
import ProvincialInfo from "./ProvincialInfo";
import { Competition } from "../../server/app-router-db-calls";
import National from "./National";
import { Instance } from "./InstanceMenu";
import React from "react";

interface InstanceProps {
  competition: Competition;
  instance: Instance;
}

export interface ParticipantInput {
  nombre: string;
  apellido: string;
  colegio: { nombre: string; sede?: string };
  nivel: number;
  sede: string;
}

export interface VenueInput {
  colegio: { nombre: string; sede?: string };
  nombre: string;
  direccion: string;
  localidad: string;
  aclaracion?: string;
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const InstanceData = ({ competition, instance }: InstanceProps) => {
  const { instancia, fecha } = instance;
  return (
    <>
      <h2 className={styles.title}>
        {instancia[0] + instancia.slice(1).toLocaleLowerCase()}
      </h2>
      <h3 className={styles.subtitle}>{`${fecha.getUTCDate()} de ${
        months[fecha.getMonth()]
      }`}</h3>
      {instancia === "PROVINCIAL" && (
        <ProvincialInfo competition={competition} />
      )}
      {instancia === "NACIONAL" && <National competition={competition} />}
      {instancia !== "PROVINCIAL" && instancia !== "NACIONAL" && (
        <VenueInfo
          instance={instancia as INSTANCIA}
          competition={competition}
        />
      )}
    </>
  );
};

export default InstanceData;
