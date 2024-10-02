import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import SelectIcon from "../../public/images/menuSelectIcon.svg";
import { CardType } from "./types";
import DownloadPopup from "./ExportResults/DownloadModal";
import Arrow from "../../public/images/newsArrow.svg";

interface TableProps<S extends object> {
  values: Array<S>;
  allValues: Array<S>;
  headers: Array<string>;
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
          className={center_columns.includes(index) ? styles.center_align : ""}
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
    <div className={styles.pagination}>
      <p>
        Mostrando {firstResult + 1}-{lastResult} de {values.length}
      </p>
      <div
        className={[styles.prev, page === 0 && styles.greyed].join(" ")}
        onClick={prevPage}
      >
        <SelectIcon />
      </div>
      <div
        className={[styles.next, page === max_pages - 1 && styles.greyed].join(
          " "
        )}
        onClick={nextPage}
      >
        <SelectIcon />
      </div>
    </div>
  );
  const mobile_pagination = (
    <div className={styles.mobile_pagination}>
      <p>
        Mostrando {firstResult + 1}-{lastResult} de {values.length}
      </p>
      <div className={styles.page_select}>
        <div
          className={[styles.prev, page === 0 && styles.greyed].join(" ")}
          onClick={prevPage}
        >
          <SelectIcon />
        </div>
        <div className={styles.pages}>
          {page >= 2 && (
            <div className={styles.item} onClick={() => setPage(0)}>
              {1}
            </div>
          )}
          {page >= 3 && <div className={styles.item}>...</div>}
          {page >= 1 && (
            <div className={styles.item} onClick={() => setPage(page - 1)}>
              {page}
            </div>
          )}
          <div className={[styles.item, styles.selected].join(" ")}>
            {page + 1}
          </div>
          {max_pages - page >= 2 && (
            <div className={styles.item} onClick={() => setPage(page + 1)}>
              {page + 2}
            </div>
          )}
          {max_pages - page >= 4 && <div className={styles.item}>...</div>}
          {max_pages - page >= 3 && (
            <div className={styles.item} onClick={() => setPage(max_pages - 1)}>
              {max_pages}
            </div>
          )}
        </div>
        <div
          className={[
            styles.next,
            page === max_pages - 1 && styles.greyed,
          ].join(" ")}
          onClick={nextPage}
        >
          <SelectIcon />
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
          <div className="grid grid-cols-subgrid place-content-stretch bg-primary-light-blue font-unbounded col-span-full">
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
      <table className={`${styles.values_table} ${tableClassName}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td
                key={index}
                className={
                  center_columns.includes(index) ? styles.center_align : ""
                }
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
        <div
          className={
            styles["table_header" + (download ? "_with_download" : "")]
          }
        >
          {download && (
            <div
              className={styles.downloadButton}
              onClick={() => setOpenDownloadPopup(true)}
            >
              <span>Descargar</span>
              <div className={styles.arrow}>
                <Arrow />
              </div>
            </div>
          )}
          {max_pages > 1 && pagination}
        </div>
      )}
      <div className={styles.values}>{make_table(values_in_page, headers)}</div>
      <div className={styles.mobile_values}>
        {Card &&
          values_in_page.map((result, idx) => (
            <Card key={idx} value={result} />
          ))}
      </div>
      {elements_per_page && max_pages > 1 && (
        <div className={styles.table_footer}>{pagination}</div>
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
