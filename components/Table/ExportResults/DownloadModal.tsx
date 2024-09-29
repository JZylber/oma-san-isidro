import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import Modal from "../../Popups/Modal";
import styles from "./DownloadModal.module.scss";
import X from "../../../public/images/x.svg";
import CSV from "../../../public/images/csv.svg";
import XLSX from "../../../public/images/xls.svg";
import PDF from "../../../public/images/pdf.svg";
import Download from "../../../public/images/newsArrow.svg";
import { Button } from "../../buttons/Button";
import BasicLoader from "../../Loader/BasicLoader";
import { processResults } from "./CreateFiles";

interface DownloadModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  testInfo: string;
  data: string[][];
  filteredData: string[][];
  headers: string[];
}

export interface printFunctions {
  printResults: () => void;
  printRef: MutableRefObject<HTMLDivElement | null>;
}

const DownloadPopup = ({
  open,
  setOpen,
  testInfo,
  data,
  filteredData,
  headers,
}: DownloadModalProps) => {
  const [format, setFormat] = useState("csv");
  const [allData, setAllData] = useState(false);
  const dataToExport = allData ? data : filteredData;
  const [generatingExport, setGeneratingExport] = useState(false);
  const getExportedFile = async () => {
    try {
      await processResults(format, testInfo, headers, dataToExport);
    } catch (error) {
      console.error(error);
    }
    setGeneratingExport(false);
  };
  return (
    <Modal
      openModal={open}
      closeModal={() => setOpen(false)}
      className="m-auto bg-transparent"
    >
      <div
        className={[
          styles.container,
          generatingExport ? styles.fixed_container : "",
        ].join(" ")}
      >
        <div className={generatingExport ? styles.hide : ""}>
          <div className={styles.container_header}>
            <div className={styles.close_icon} onClick={() => setOpen(false)}>
              <X />
            </div>
          </div>
          <h1 className={styles.title}>Descarga</h1>
          <h2 className={styles.option_title}>Formato</h2>
          <div className={styles.format_options}>
            <div className={styles.option}>
              <div
                className={[
                  styles.format_container,
                  format === "csv" && styles.selected,
                ].join(" ")}
                onClick={() => setFormat("csv")}
              >
                <CSV />
              </div>
              <p className={styles.format_text}>CSV</p>
            </div>
            <div className={styles.option}>
              <div
                className={[
                  styles.format_container,
                  format === "xlsx" && styles.selected,
                ].join(" ")}
                onClick={() => setFormat("xlsx")}
              >
                <XLSX />
              </div>
              <p className={styles.format_text}>XLSX</p>
            </div>
            <div className={[styles.option, styles.unavailable].join(" ")}>
              <div
                className={[
                  styles.format_container,
                  format === "pdf" && styles.selected,
                  styles.grayed,
                ].join(" ")}
                onClick={() => setFormat("pdf")}
              >
                <PDF />
              </div>
              <p className={styles.format_text}>PDF</p>
            </div>
          </div>
          <h2 className={styles.option_title}>Datos</h2>
          <div className={styles.result_options}>
            <div className={[styles.option, styles.minWidth].join(" ")}>
              <div
                className={[
                  styles.result_button,
                  !allData && styles.selected,
                ].join(" ")}
                onClick={() => setAllData(false)}
              >
                Obtenidos
              </div>
              <p className={styles.result_text}>
                Los datos obtenidos por los filtros aplicados.
              </p>
            </div>
            <div className={[styles.option, styles.minWidth].join(" ")}>
              <div
                className={[
                  styles.result_button,
                  allData && styles.selected,
                ].join(" ")}
                onClick={() => setAllData(true)}
              >
                Todos
              </div>
              <p className={styles.result_text}>
                Todos los datos de{" "}
                <span className={styles.result_text_bold}>{testInfo}</span>.
              </p>
            </div>
          </div>
          <div className={styles.button_container}>
            <Button
              content="Confirmar Descarga"
              onClick={() => {
                getExportedFile();
                setGeneratingExport(true);
              }}
            >
              <div className={styles.button_arrow}>
                <Download />
              </div>
            </Button>
          </div>
        </div>
        {generatingExport && (
          <div className={styles.generating}>
            <h1 className={styles.title}>Generando archivo...</h1>
            <div className={styles.loader}>
              <BasicLoader />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DownloadPopup;
