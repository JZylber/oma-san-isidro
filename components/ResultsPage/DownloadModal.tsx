import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Popups/Modal";
import styles from "./DownloadModal.module.scss";
import X from "../../public/images/x.svg";
import CSV from "../../public/images/csv.svg";
import XLS from "../../public/images/xls.svg";
import PDF from "../../public/images/pdf.svg";

interface DownloadModalProps{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

const DownloadPopup = ({open,setOpen}: DownloadModalProps) => {
    const [format,setFormat] = useState("csv");
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
                        <div className={styles.format_option}>
                            <div className={[styles.format_container,format==="csv" && styles.selected].join(" ")} onClick={() => setFormat("csv")}>
                                <CSV/>
                            </div>
                            <p>CSV</p>
                        </div>
                        <div className={styles.format_option}>
                            <div className={[styles.format_container,format==="xls" && styles.selected].join(" ")} onClick={() => setFormat("xls")}>
                                <XLS/>
                            </div>
                            <p>XLS</p>
                        </div>
                        <div className={styles.format_option}>
                            <div className={[styles.format_container,format==="pdf" && styles.selected].join(" ")} onClick={() => setFormat("pdf")}>
                                <PDF/>
                            </div>
                            <p>PDF</p>
                        </div>
                    </div>
                <h2 className={styles.option_title}>Resultados</h2>
            </div>
        </Modal>
    )
}

export default DownloadPopup