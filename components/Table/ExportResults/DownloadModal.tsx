import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import Image from "next/image";
import Modal from "../../Popups/Modal";
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

const containerClasses = "flex flex-col items-center bg-primary-white border-2 border-primary-black rounded-[9px] relative overflow-y-scroll max-h-[80vh] max-tablet:p-[2.4rem] tablet:max-desktop:p-[3.2rem_4rem] desktop:p-[4rem_6.4rem]";
const containerHeaderClasses = "flex w-full justify-end";
const fixedContainerClasses = "overflow-hidden";
const hideClasses = "hidden";
const closeIconClasses = "max-tablet:w-[19px] max-tablet:h-[17px] tablet:max-desktop:w-[27px] tablet:max-desktop:h-[24px] desktop:w-[36px] desktop:h-[32px]";
const titleClasses = "font-unbounded font-medium max-tablet:text-[3.4rem] max-tablet:mt-[2.4rem] tablet:max-desktop:text-[3.7rem] desktop:text-[6rem] desktop:mt-[1.6rem]";
const optionTitleClasses = "font-unbounded font-light max-tablet:text-[2rem] max-tablet:mt-[3.4rem] max-tablet:mb-[2rem] tablet:max-desktop:text-[2.2rem] tablet:max-desktop:mt-[4.8rem] tablet:max-desktop:mb-[2rem] desktop:text-[4rem] desktop:mt-[4.8rem] desktop:mb-[4rem]";
const formatOptionsClasses = "flex max-tablet:gap-x-[.8rem] tablet:max-desktop:gap-x-[3.6rem] desktop:gap-x-[8rem]";
const formatTextClasses = "font-montserrat font-normal max-tablet:text-[1.4rem] tablet:max-desktop:text-[1.5rem] desktop:text-[2rem]";
const optionClasses = "flex flex-col items-center max-tablet:gap-y-[1rem] tablet:max-desktop:gap-y-[1.6rem] desktop:gap-y-[2.4rem]";
const grayedClasses = "max-desktop:opacity-50 max-desktop:pointer-events-none";
const selectedClasses = "bg-primary-light-blue";
const formatContainerClasses = "box-border border-2 border-primary-black rounded-[9px] flex justify-center items-center cursor-pointer max-tablet:w-[88px] max-tablet:h-[94px] max-tablet:p-[2rem] tablet:max-desktop:w-[116px] tablet:max-desktop:h-[112px] tablet:max-desktop:p-[2rem] desktop:w-[150px] desktop:h-[144px] desktop:p-[2rem_3rem]";
const minWidthClasses = "w-min";
const resultOptionsClasses = "flex w-full justify-between";
const resultButtonClasses = "border-2 border-primary-black rounded-[9px] flex justify-center items-center box-border font-unbounded font-normal cursor-pointer max-tablet:p-[1.6rem] max-tablet:text-[1.6rem] max-tablet:w-[135px] tablet:max-desktop:p-[2rem] tablet:max-desktop:text-[1.6rem] tablet:max-desktop:w-[202px] desktop:p-[1.4rem] desktop:w-[250px] desktop:text-desktop-actionable";
const resultTextClasses = "font-montserrat font-normal text-center max-desktop:text-[1.2rem] desktop:text-[1.6rem]";
const resultTextBoldClasses = "font-montserrat font-semibold";
const buttonContainerClasses = "mt-[4rem] w-full";
const buttonArrowClasses = "rotate-90 w-[28px] max-tablet:hidden tablet:max-desktop:mr-[2.8rem]";
const generatingClasses = "h-screen w-full flex flex-col justify-center items-center z-[2] bg-primary-white text-center";
const loaderClasses = "mt-[4rem]";
const unavailableClasses = "opacity-30 pointer-events-none";

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
          containerClasses,
          generatingExport ? fixedContainerClasses : "",
        ].join(" ")}
      >
        <div className={generatingExport ? hideClasses : ""}>
          <div className={containerHeaderClasses}>
            <div className={closeIconClasses} onClick={() => setOpen(false)}>
              <Image src="/images/x.svg" width={34} height={32} alt="" />
            </div>
          </div>
          <h1 className={titleClasses}>Descarga</h1>
          <h2 className={optionTitleClasses}>Formato</h2>
          <div className={formatOptionsClasses}>
            <div className={optionClasses}>
              <div
                className={[
                  formatContainerClasses,
                  format === "csv" ? selectedClasses : "",
                ].join(" ")}
                onClick={() => setFormat("csv")}
              >
                <Image src="/images/csv.svg" width={93} height={93} alt="" />
              </div>
              <p className={formatTextClasses}>CSV</p>
            </div>
            <div className={optionClasses}>
              <div
                className={[
                  formatContainerClasses,
                  format === "xlsx" ? selectedClasses : "",
                ].join(" ")}
                onClick={() => setFormat("xlsx")}
              >
                <Image src="/images/xls.svg" width={93} height={93} alt="" />
              </div>
              <p className={formatTextClasses}>XLSX</p>
            </div>
            <div className={[optionClasses, unavailableClasses].join(" ")}>
              <div
                className={[
                  formatContainerClasses,
                  format === "pdf" ? selectedClasses : "",
                  grayedClasses,
                ].join(" ")}
                onClick={() => setFormat("pdf")}
              >
                <Image src="/images/pdf.svg" width={100} height={100} alt="" />
              </div>
              <p className={formatTextClasses}>PDF</p>
            </div>
          </div>
          <h2 className={optionTitleClasses}>Datos</h2>
          <div className={resultOptionsClasses}>
            <div className={[optionClasses, minWidthClasses].join(" ")}>
              <div
                className={[
                  resultButtonClasses,
                  !allData ? selectedClasses : "",
                ].join(" ")}
                onClick={() => setAllData(false)}
              >
                Obtenidos
              </div>
              <p className={resultTextClasses}>
                Los datos obtenidos por los filtros aplicados.
              </p>
            </div>
            <div className={[optionClasses, minWidthClasses].join(" ")}>
              <div
                className={[
                  resultButtonClasses,
                  allData ? selectedClasses : "",
                ].join(" ")}
                onClick={() => setAllData(true)}
              >
                Todos
              </div>
              <p className={resultTextClasses}>
                Todos los datos de{" "}
                <span className={resultTextBoldClasses}>{testInfo}</span>.
              </p>
            </div>
          </div>
          <div className={buttonContainerClasses}>
            <Button
              content="Confirmar Descarga"
              onClick={() => {
                getExportedFile();
                setGeneratingExport(true);
              }}
            >
              <div className={buttonArrowClasses}>
                <Image src="/images/newsArrow.svg" width={34} height={32} alt="" />
              </div>
            </Button>
          </div>
        </div>
        {generatingExport && (
          <div className={generatingClasses}>
            <h1 className={titleClasses}>Generando archivo...</h1>
            <div className={loaderClasses}>
              <BasicLoader />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DownloadPopup;
