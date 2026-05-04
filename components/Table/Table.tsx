import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardType } from "./types";
import DownloadPopup from "./ExportResults/DownloadModal";

interface TableProps<S extends object> {
  values: Array<S>;
  allValues: Array<S>;
  headers: Array<string>;
  style?: React.CSSProperties;
  Card?: CardType<S>;
  grid?: boolean;
  elements_per_page?: number;
  download?: boolean;
  downloadHeaders?: Array<string>;
  testInfo?: string;
  tableClassName?: string;
  make_element?: (result: S, index: number) => JSX.Element;
  process_data?: (dataPoint: S) => Array<string>;
  center_columns?: Array<number>;
}

const valuesClasses = "max-tablet:hidden border-2 border-black box-border rounded-[9px] overflow-hidden mt-[1.6rem]";
const valuesTableClasses = "w-full border-collapse [&_tr:not(:last-child)]:border-b-2 [&_tr:not(:last-child)]:border-b-black [&_thead]:bg-primary-light-blue [&_thead]:border-b-2 [&_thead]:border-b-black [&_thead]:font-unbounded [&_thead]:font-medium [&_thead]:text-[1.6rem] tablet:[&_thead_tr_td:first-child]:p-[1.6rem_.8rem_1.6rem_2rem] desktop:[&_thead_tr_td:first-child]:p-[1.6rem_2rem_1.6rem_4.4rem] tablet:[&_thead_tr_td:last-child]:p-[1.6rem_2rem_1.6rem_.8rem] desktop:[&_thead_tr_td:last-child]:p-[1.6rem_4.4rem_1.6rem_2rem] tablet:[&_thead_tr_td:not(:last-child):not(:first-child)]:p-[1.6rem_.8rem] desktop:[&_thead_tr_td:not(:last-child):not(:first-child)]:p-[1.6rem_2rem] [&_tbody]:font-montserrat [&_tbody]:font-medium [&_tbody]:text-[1.6rem] tablet:[&_tbody_tr_td:first-child]:p-[1.6rem_.8rem_1.6rem_2rem] desktop:[&_tbody_tr_td:first-child]:p-[1.6rem_2rem_1.6rem_4.4rem] tablet:[&_tbody_tr_td:last-child]:p-[1.6rem_2rem_1.6rem_.8rem] desktop:[&_tbody_tr_td:last-child]:p-[1.6rem_4.4rem_1.6rem_2rem] tablet:[&_tbody_tr_td:not(:last-child):not(:first-child)]:p-[1.6rem_.8rem] desktop:[&_tbody_tr_td:not(:last-child):not(:first-child)]:p-[1.6rem_2rem] [&_tbody_tr:hover]:bg-primary-light-blue";
const centerAlignClasses = "text-center";
const tableHeaderClasses = "max-tablet:hidden tablet:flex tablet:justify-end tablet:items-end";
const tableHeaderWithDownloadClasses = "mt-[6rem] flex justify-between items-end";
const tableFooterClasses = "mt-[1.6rem] flex justify-end";
const paginationClasses = "max-tablet:hidden tablet:flex tablet:font-montserrat tablet:font-normal tablet:text-[1.6rem]";
const paginationPrevClasses = "rotate-90 px-[.8rem]";
const paginationNextClasses = "-rotate-90 px-[.8rem]";
const greyedClasses = "opacity-50";
const mobilePaginationClasses = "max-tablet:flex max-tablet:flex-col max-tablet:items-center max-tablet:gap-y-[.8rem] tablet:hidden";
const mobilePaginationTextClasses = "font-montserrat font-normal text-[1.2rem]";
const pageSelectClasses = "w-full flex justify-between items-center";
const mobilePrevClasses = "rotate-90 h-[20px] w-[20px] flex justify-center items-center";
const mobileNextClasses = "-rotate-90 flex justify-center items-center h-[20px] w-[20px]";
const pagesClasses = "flex overflow-hidden border-2 border-black rounded-[9px]";
const pageItemClasses = "w-[3.6rem] h-[4rem] flex justify-center items-center font-unbounded font-medium text-[1.5rem] [&:not(:last-child)]:border-r-2 [&:not(:last-child)]:border-r-black";
const pageSelectedClasses = "bg-primary-light-blue";
const downloadButtonClasses = "flex items-center justify-center p-[1.2rem] min-w-[180px] bg-primary-light-blue border-2 border-b-4 border-black rounded-[9px] font-unbounded font-medium text-[1.6rem] max-tablet:w-full tablet:w-[19%] cursor-pointer";
const downloadArrowClasses = "rotate-90 ml-[1.8rem] flex justify-center items-center w-[18px]";
const mobileValuesClasses = "max-tablet:flex max-tablet:flex-col max-tablet:gap-y-[2.4rem] max-tablet:mt-[5rem] tablet:hidden";

const defaultDataProcessor = <S extends object>(dataPoint: S) => {
  return Object.values(dataPoint);
};

const defaultMakeElement = <S extends object>(
  result: S,
  index: number,
  center_columns: Array<number> | undefined = []
) => {
  return (
    <tr key={index}>
      {Object.values(result).map((cell, sub_index) => (
        <td
          key={`${index}-${sub_index}`}
          className={center_columns.includes(index) ? centerAlignClasses : ""}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
};

const Table = <S extends object>({
  values,
  allValues,
  headers,
  Card,
  elements_per_page,
  download,
  downloadHeaders,
  tableClassName = "",
  style = {},
  grid = false,
  make_element = defaultMakeElement,
  process_data = defaultDataProcessor,
  testInfo = "esta instancia",
  center_columns = [],
}: TableProps<S>) => {
  //PAGINATION
  const [page, setPage] = useState(0);
  const page_size = elements_per_page ? elements_per_page : values.length;
  let max_pages = Math.ceil(values.length / page_size);
  useEffect(() => {
    if (page > max_pages - 1) {
      setPage(max_pages - 1);
    }
  }, [page, max_pages]);
  let firstResult = page * page_size;
  let lastResult = Math.min((page + 1) * page_size, values.length);
  const values_in_page = values.slice(firstResult, lastResult);
  const nextPage = () => {
    if (page < max_pages - 1) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const pagination = (
    <div className={paginationClasses}>
      <p>
        Mostrando {firstResult + 1}-{lastResult} de {values.length}
      </p>
      <div
        className={[paginationPrevClasses, page === 0 ? greyedClasses : ""].join(" ")}
        onClick={prevPage}
      >
        <Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" />
      </div>
      <div
        className={[paginationNextClasses, page === max_pages - 1 ? greyedClasses : ""].join(" ")}
        onClick={nextPage}
      >
        <Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" />
      </div>
    </div>
  );
  const mobile_pagination = (
    <div className={mobilePaginationClasses}>
      <p className={mobilePaginationTextClasses}>
        Mostrando {firstResult + 1}-{lastResult} de {values.length}
      </p>
      <div className={pageSelectClasses}>
        <div
          className={[mobilePrevClasses, page === 0 ? greyedClasses : ""].join(" ")}
          onClick={prevPage}
        >
          <Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" />
        </div>
        <div className={pagesClasses}>
          {page >= 2 && (
            <div className={pageItemClasses} onClick={() => setPage(0)}>
              {1}
            </div>
          )}
          {page >= 3 && <div className={pageItemClasses}>...</div>}
          {page >= 1 && (
            <div className={pageItemClasses} onClick={() => setPage(page - 1)}>
              {page}
            </div>
          )}
          <div className={[pageItemClasses, pageSelectedClasses].join(" ")}>
            {page + 1}
          </div>
          {max_pages - page >= 2 && (
            <div className={pageItemClasses} onClick={() => setPage(page + 1)}>
              {page + 2}
            </div>
          )}
          {max_pages - page >= 4 && <div className={pageItemClasses}>...</div>}
          {max_pages - page >= 3 && (
            <div className={pageItemClasses} onClick={() => setPage(max_pages - 1)}>
              {max_pages}
            </div>
          )}
        </div>
        <div
          className={[mobileNextClasses, page === max_pages - 1 ? greyedClasses : ""].join(" ")}
          onClick={nextPage}
        >
          <Image src="/images/menuSelectIcon.svg" width={12} height={10} alt="" />
        </div>
      </div>
    </div>
  );
  //DOWNLOAD
  const [openDownloadPopup, setOpenDownloadPopup] = useState(false);
  const make_table = (values: Array<S>, headers: Array<string>) => {
    if (grid) {
      return (
        <div
          className={`grid ${tableClassName} place-content-stretch divide-y text-2xl w-full`}
        >
          <div className="grid grid-cols-subgrid place-content-stretch bg-primary-light-blue font-unbounded col-span-full border-b-2 border-black">
            {headers.map((header, index) => (
              <div
                key={index}
                className={`flex items-center justify-center px-3 py-6`}
              >
                {header}
              </div>
            ))}
          </div>
          {values.map((result, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-subgrid place-content-stretch font-montserrat col-span-full"
              >
                {make_element(result, index)}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <table className={`${valuesTableClasses} ${tableClassName}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td
                key={index}
                className={center_columns.includes(index) ? centerAlignClasses : ""}
              >
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((result, index) => make_element(result, index))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      {elements_per_page && max_pages > 1 && mobile_pagination}
      {elements_per_page && (
        <div className={download ? tableHeaderWithDownloadClasses : tableHeaderClasses}>
          {download && (
            <div
              className={downloadButtonClasses}
              onClick={() => setOpenDownloadPopup(true)}
            >
              <span>Descargar</span>
              <div className={downloadArrowClasses}>
                <Image src="/images/newsArrow.svg" width={34} height={32} alt="" />
              </div>
            </div>
          )}
          {max_pages > 1 && pagination}
        </div>
      )}
      <div className={valuesClasses} style={style}>
        {make_table(values_in_page, headers)}
      </div>
      <div className={mobileValuesClasses} style={style}>
        {Card &&
          values_in_page.map((result, idx) => (
            <Card key={idx} value={result} />
          ))}
      </div>
      {elements_per_page && max_pages > 1 && (
        <div className={tableFooterClasses}>{pagination}</div>
      )}
      <DownloadPopup
        open={openDownloadPopup}
        setOpen={setOpenDownloadPopup}
        testInfo={testInfo}
        headers={downloadHeaders ? downloadHeaders : headers}
        data={allValues.map(process_data)}
        filteredData={values.map(process_data)}
      />
    </>
  );
};

export default Table;
