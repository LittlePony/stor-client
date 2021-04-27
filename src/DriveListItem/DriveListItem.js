import styles from "./DriveListItem.module.css";
import PartitionList from "../PartitionList";

const DriveListItem = ({drive, onMount, onUnmount, onFormat}) => {
    const handleMountClick = () => onMount(drive.name);
    const handleUnmountClick = () => onUnmount(drive.name);
    const handleFormatClick = () => onFormat(drive.name);

    const renderButtons = () => {
        if (drive.children) {
            return null
        }

        return ([
            <button
                key="mount"
                onClick={handleMountClick}>
                mount
            </button>,
            <button
                key="unmount"
                onClick={handleUnmountClick}>
                unmount
            </button>,
            <button
                key="format"
                onClick={handleFormatClick}>
                format
            </button>,
        ])
    };

    return (
        <div className={styles.box}>
            <div className={styles.driveProps}>
                <div className={styles.nameCol}>{drive.name}</div>
                <div className={styles.sizeCol}>{drive.size}</div>
                <div className={styles.mountpointCol}>{drive.mountpoint}</div>
                <div className={styles.buttons}>
                {
                    renderButtons()
                }
                </div>
            </div>
            {
                drive.children &&
                    <PartitionList
                        onMount={onMount}
                        onUnmount={onUnmount}
                        onFormat={onFormat}
                        partitions={drive.children}/>
            }
        </div>
    )
};

DriveListItem.defaultProps = {
    drive: {},
}

export default DriveListItem;
