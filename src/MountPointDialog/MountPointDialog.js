import React, { useState } from "react";
import styles from "./MountPointDialog.module.css";

const MountPointDialog = ({isOpen, onClose, onConfirm, device}) => {
    const [mountpoint, setMountpoint] = useState("");
    const handleInputChange = e => setMountpoint(e.target.value);
    const handleConfirm = () => onConfirm(device, mountpoint);
    if (!isOpen) {
        return null
    }
    return (
        <div className={styles.box}>
            Укажите точку монтирования
            <input
                value={mountpoint}
                className={styles.input}
                onChange={handleInputChange}/>
            <div className={styles.buttons}>
                <button
                    onClick={onClose}>
                    Отмена
                </button>
                <button
                    disabled={!mountpoint}
                    onClick={handleConfirm}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default MountPointDialog;
