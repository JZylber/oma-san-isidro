import Image from "next/image"
import styles from "./Warning.module.scss"

interface WarningProps {
    title?: string,
    children: React.ReactNode
}

const Warning = ({title = "Importante",children}: WarningProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.title_container}>
                <div className={styles.icon}>
                    <Image src="/images/warning.svg" alt="Warning icon" fill={true}/>
                </div>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.message}>
                
                <div className={styles.message_body_container}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Warning