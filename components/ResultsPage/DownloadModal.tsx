import { Dispatch, SetStateAction } from "react";
import Modal from "../Popups/Modal";
import styles from "./DownloadModal.module.scss";
import X from "../../public/images/x.svg";

interface DownloadModalProps{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

const DownloadPopup = ({open,setOpen}: DownloadModalProps) => {
    return(
        <Modal open={open}>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.close_icon} onClick={() => setOpen(false)}>
                        <X/>
                    </div>
                </div>
                <h1 className={styles.title}>Descarga</h1>
            </div>
        </Modal>
    )
}

export default DownloadPopup