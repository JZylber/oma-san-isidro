import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Popups/Modal";
import styles from "./DownloadModal.module.scss";
import X from "../../public/images/x.svg";
import CSV from "../../public/images/csv.svg";
import XLS from "../../public/images/xls.svg";
import PDF from "../../public/images/pdf.svg";
import { Button } from "../buttons/Button";

interface DownloadModalProps{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

const DownloadPopup = ({open,setOpen}: DownloadModalProps) => {
    const [format,setFormat] = useState("csv");
    const [allResults,setAllResults] = useState(false);
    return(
        <Modal open={open}>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.close_icon} onClick={() => setOpen(false)}>
                        <X/>
                    </div>
                </div>
                <h1 className={styles.title}>Descarga</h1>
                <h2 className={styles.option_title}>Formato</h2>
                    <div className={styles.format_options}>
                        <div className={styles.option}>
                            <div className={[styles.format_container,format==="csv" && styles.selected].join(" ")} onClick={() => setFormat("csv")}>
                                <CSV/>
                            </div>
                            <p className={styles.format_text}>CSV</p>
                        </div>
                        <div className={styles.option}>
                            <div className={[styles.format_container,format==="xls" && styles.selected].join(" ")} onClick={() => setFormat("xls")}>
                                <XLS/>
                            </div>
                            <p className={styles.format_text}>XLS</p>
                        </div>
                        <div className={styles.option}>
                            <div className={[styles.format_container,format==="pdf" && styles.selected].join(" ")} onClick={() => setFormat("pdf")}>
                                <PDF/>
                            </div>
                            <p className={styles.format_text}>PDF</p>
                        </div>
                    </div>
                <h2 className={styles.option_title}>Resultados</h2>
                    <div className={styles.result_options}>
                        <div className={[styles.option,styles.minWidth].join(" ")}>
                            <div className={[styles.result_button,!allResults && styles.selected].join(" ")} onClick={() => setAllResults(false)}>
                                Obtenidos
                            </div>
                            <p className={styles.result_text}>Los resultados obtenidos por los filtros aplicados.</p>
                        </div>
                        <div className={[styles.option,styles.minWidth].join(" ")}>
                            <div className={[styles.result_button,allResults && styles.selected].join(" ")} onClick={() => setAllResults(true)}>
                                Todos
                            </div>
                            <p className={styles.result_text}>Todos los resultados de <span className={styles.result_text_bold}>2023 zonal</span>.</p>
                        </div>
                    </div>
                <div className={styles.button_container}>
                    <Button content="Confirmar Descarga">
                        <></>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DownloadPopup